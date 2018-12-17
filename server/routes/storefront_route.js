var express = require('express');
var router = express.Router();
const redis = require('redis');
const Shopify = require('shopify-api-node');
var commonService=require('../common_service/common_logic');



// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// var client = redis.createClient();
var client;
var lremAsync;

//a route to check if the product is in Redis DB  for that particular shop.
router.post('/isProductInRentify', function (request, response) {
    try {
        const shop=request.body.shop,prodid=request.body.prodid;

        // const { session: { shop, accessToken,store } } = request;
        console.log("Entered isProductInRentify");
        console.log('isProductInRentify shop name =',shop,prodid);
 
        var key2 = `${shop}:product_list_key`;
  
        var value2=`${shop}:Product:${prodid}`;
        //get members from rental_list 
        client.sismember(key2,value2,(err,reply)=>{
            var ret=null;
            if(reply==1){
                ret = { productexist:true };
            }
            else if(reply==0){
                ret = { productexist:false };
            }
            console.log('isProductInRentify result=',ret);
            response.status(200).json(ret);
        });   
        //converted list to set so comment below lines
        // client.lrange(key2,0,-1,(err,reply)=>{
        //     const isproductexist= reply.find(a=>a===value2);
        //     var ret=null;
        //     if(isproductexist){
        //         ret = { productexist:true };
        //     }
        //     else{
        //         ret = { productexist:false };
        //     }
        //     console.log('isProductInRentify result=',ret);
        //     response.status(200).json(ret);
        // });

  
    } catch (error) {
        var ret = { errorstatus:error };
        response.status(200).json(ret);
    }

});

//a route to check if the product is already in queue for that particular customer.
router.post('/isProductInQueue', async function (request, response) {
    try {
        // const { shop,prodid,custid } = request;
        // const { shop,prodid,custid }  = request.body;
        const shop=request.body.shop,prodid=request.body.prodid,custid=request.body.custid;

        // const { session: { shop, accessToken,store } } = request;
        console.log("Entered isProductInQueue");
        console.log('isProductInQueue shop name =',shop,prodid,custid);
        //changed spelling of key from `${shop}:product:${prodid}` to `${shop}:Product:${prodid}`
        var key2 = `${shop}:Product:${prodid}`;

        var noofholds= await commonService.getNoofHoldsOnProduct(shop,prodid);
        

        var value2=`customer:${custid}`;
        client.zrank(key2,value2,(err,reply)=>{
            var ret=null;
            console.log("isProductInQueue zrank result",reply);
            if(err){
                console.log('ERRROR in isProductInQueue zrank ',err);
                // ret = { status:false,errorstatus:err };
                throw "ERRROR in isProductInQueue zrank";
            }
            if(reply!=null && reply>=0){
                ret = { status:true ,noofholds:noofholds, typeoftransaction:'hold_list' };
                console.log('isProductInQueue result=',ret);
                response.status(200).json(ret);
            }else{
                var key_dispatch_list=`${shop}:Dispatch`;
                var value_dispatch_list=`customer:${custid}:${prodid}`;
                client.zrank(key_dispatch_list,value_dispatch_list,(err_dispatch_list,reply_dispatch_list)=>{
                    var ret_dispatch_list=null;
                    if(reply_dispatch_list!=null && reply_dispatch_list>=0){
                        ret_dispatch_list = { status:true ,noofholds:noofholds, typeoftransaction:'dispatch_list' };
                    }
                    else{
                        ret_dispatch_list = { status:false ,noofholds:noofholds};
                    }
                    console.log('isProductInQueue of dispatch result=',ret_dispatch_list);
                    response.status(200).json(ret_dispatch_list);
                })

                

            }

            
        });

 

    } catch (error) {
        var ret = { errorstatus:error };
        response.status(200).json(ret);
    }

});

//a route to save in queue the prodid ,custid to db
router.post('/addProductToQueue',async function (request, response) {
    try {
        // const { shop,prodid,custid } = request;
        // const { shop,prodid,custid }  = request.body;
        const shop=request.body.shop,prodid=request.body.prodid,custid=request.body.custid;

        // const { session: { shop, accessToken,store } } = request;
        console.log("Entered addProductToQueue");
        console.log('shop name =',shop,prodid,custid);

        if(custid==undefined || prodid==undefined){
            throw "Sorry from Rentify the customer id is null";
        }
        if(prodid==undefined){
            throw "Sorry from Rentify the product id is null";
        }

        var prodinv= await commonService.getInventoryFromDB(shop,prodid);
        var noofholds= await commonService.getNoofHoldsOnProduct(shop,prodid);

        if(noofholds<prodinv){
            const typeoftransaction="dispatch_list";
            var key_dispatch_list=`${shop}:Dispatch`;
            var currenttime_dispatch_list=new Date().getTime();
            var value_dispatch_list=`customer:${custid}:${prodid}`;
            client.zadd(key_dispatch_list,currenttime_dispatch_list,value_dispatch_list,(err,reply)=>{
                var ret = { status:reply, shopName: shop,prodid:prodid,custid:custid,typeoftransaction:typeoftransaction };
                response.status(200).json(ret);
            });

        }
        else{
            const typeoftransaction="hold_list";
            //changed ${shop}:product:${prodid} to ${shop}:Product:${prodid} the "Product"  in keyb is caps.
            var key2 = `${shop}:Product:${prodid}`;
            var currenttime=new Date().getTime();

            var value2=`customer:${custid}`;
            client.zadd(key2,currenttime,value2,(err,reply)=>{
                var ret = { status:reply, shopName: shop,prodid:prodid,custid:custid,typeoftransaction:typeoftransaction };
                response.status(200).json(ret);
            });
        }
    } catch (error) {
        var ret = { errorstatus:error };
        response.status(200).json(ret);
    }

});

  
//retrieve the accesstoken for storefront from db
router.post('/getStoreFrontAccessTokenForShopName', function (request, response) {
    try {
        // const { shop } = request;
        
        const shop = request.body.shop;
        // const { session: { shop, accessToken,store } } = request;

        console.log("Entered getStoreFrontAccessTokenForShopName",request.body);
        console.log('shop name =',shop);

        var key2 = `storefrontaccesstoken:${shop}`;
        
        client.get(key2,(err,reply)=>{
            var accesstoken=reply;
            console.log("StoreFront ",accesstoken);
            var ret = { shopName: shop,storefrontaccesstoken:accesstoken };
            response.status(200).json(ret);
        });

    } catch (error) {
        var ret = { errorstatus:error };
        response.status(200).json(ret);
    }

});



module.exports = {
    setClient: function (inClient) {
        client = inClient;
        
    },
    router
};