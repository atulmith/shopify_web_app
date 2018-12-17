var express = require('express');
var router = express.Router();
const redis = require('redis');
const Shopify = require('shopify-api-node');

const { promisify } = require('util');

var commonService=require('../common_service/common_logic');
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// var client = redis.createClient();
var client;
var lremAsync;


var shopifyproductget;

function loadAsyncLibraryForRedis() {
    if (client) {
        lremAsync = promisify(client.lrem).bind(client);
    }
}

 
/**
 * To make a async call to remove from list before re adding to that list.
 * @param {*} a the list key
 * @param {*} b the starting index number of list
 * @param {*} c the last index number of list to search
 */
async function myFuncForRem(a, b, c) {
    const res = await lremAsync(a, b, c);
    return res;
}

/**
 * Logic to fire when user in the Product Returns List clicks on the 
 * CheckIn button to save in database that the product has been 
 * returned by the customer.
 */
router.post('/checkInReturnsList',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        const productid = request.body.productid;
        const custid = request.body.custid;
        
        
        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });
        console.log('Enter checkoutDispatchList');
        const key_dispatch_list=`${shop}:Dispatch`;
        const key_return_list=`${shop}:Return`;
        const key_hold_list=`${shop}:Product:${productid}`;


        const value_return_list=`customer:${custid}:${productid}`;
        // var value_dispatch_list=`customer:${custid}:${productid}`;        

        const typeoftransaction="CheckinReturnList";


        client.zrem(key_return_list,value_return_list);

        var args_hold_list=[key_hold_list,'-inf','+inf','LIMIT',0,1];
        client.zrangebyscore(args_hold_list,(err_hold_list,reply_hold_list)=>{
            var row=reply_hold_list[0];
            if(row==null || row.length==0){
                var ret = { status:'null', shopName: shop,prodid:productid,custid:custid,typeoftransaction:typeoftransaction };
                response.status(200).json(ret); 

            }
            else{
                client.zrem(key_hold_list,row);
                var currenttime_dispatch_list=new Date().getTime();
                var value_dispatch_list=`customer:${custid}:${productid}`;

                client.zadd(key_dispatch_list,currenttime_dispatch_list,value_dispatch_list,(err_dispatch_list,reply_dispatch_list)=>{
                    var ret = { status:reply_dispatch_list, shopName: shop,prodid:productid,custid:custid,typeoftransaction:typeoftransaction };
                    response.status(200).json(ret); 
                });
            }
        });


         

  

        // client.zadd(key_return_list,currenttime_return_list,value_return_list,(err_return_list,reply_return_list)=>{
        //     var ret = { status:reply_return_list, shopName: shop,prodid:productid,custid:custid,typeoftransaction:typeoftransaction };
        //     response.status(200).json(ret);
        // });





    }
    catch(error){
        if(error.response){
            console.log("Error checkoutDispatchList  at=",error.response.body);
        }
        var retsuccess = { 'status': 'failure',errorstatus: error };
        response.status(200).json(retsuccess);
    }
});


/**
 * retrieve the return_list from DB and Shopify APi.
 */
router.post('/retrievePoductReturnsList',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        // const productlist = request.body.productlist;

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        console.log('enter retrievePoductReturnsList');
        var resultproductreturnslist = [];
        var countoftotalcustomers=0;
        //rental_list redis type
        //U CAN CALL SET . SMEMBERS TO GEt THE LIST OF ALL THE prodkeys NO NEED TO CALL client.keys.
        //changed spelling of key from `${shop}:product:*` to `${shop}:Product:*`;
        var key_return_list=`${shop}:Return`;
        var args_return_list=[key_return_list,'-inf','+inf','WITHSCORES'];

        client.zrangebyscore(args_return_list,async (err_return_list,reply_return_list)=>{
            // reply_dispatch_list.forEach(async tempvar=>{
            for(var i=0;i<reply_return_list.length;i++){
                if(i%2!=0){
                    continue;
                }
                var tempvar=reply_return_list[i];
                var score=reply_return_list[i+1];
                console.log(`retrievePoductReturnsList:index=${i} value=${tempvar} date=${score} `);

                var therowvalue=tempvar;
                var strarr=therowvalue.split(':');
                var custid=strarr[1];
                var prodid=strarr[2];
                var customerobj= await shopify.customer.get(custid);
                var productobj= await shopify.product.get(prodid);
                var custname=`${customerobj.first_name} ${customerobj.last_name}`;
                var productname=`${productobj.title}`;
                
                var duedateobj=new Date(Number.parseFloat(score));
                var duedate=commonService.prettyDate(duedateobj);
                

                var objtosave={
                    customerid:custid,
                    customername:custname,
                    productid:prodid,
                    productname:productname,
                    duedate:duedate
                    // noofdays:noofdays
                };
                resultproductreturnslist.push(objtosave);
                
            };
            
            var retsuccess = { 'resultproductreturnslist': resultproductreturnslist };
            response.status(200).json(retsuccess);

        });
    }
    catch(error){
        if(error.response){
            console.log("Error retrievePoductReturnsList  at=",error.response.body);
        }
        console.log('retrievePoductReturnsList error:', error);
        var ret = { resultproductreturnslist:[],errorstatus: error };

        return response.status(200).json(ret);
    }
});


/**
 * Route fired when user clicks the dispatch checkout button.
 */
router.post('/checkoutDispatchList',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        const productid = request.body.productid;
        const custid = request.body.custid;
        
        
        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });
        console.log('Enter checkoutDispatchList');
        const key_dispatch_list=`${shop}:Dispatch`;
        const key_return_list=`${shop}:Return`;
        const value_return_list=`customer:${custid}:${productid}`;
        var value_dispatch_list=`customer:${custid}:${productid}`;        
        const typeoftransaction="CheckoutDispatchList";

        client.zrem(key_dispatch_list,value_dispatch_list);

        var currenttime_return_list=new Date().getTime();
        
        //retrieve the weekly rental from Shopify Admin API
        const metafieldofproduct=await commonService.createMetafieldsForProducts(shopify,productid,shop);
        var weeks=Number.parseInt(metafieldofproduct['rentify_minrental'].value);
        var noofmilliseconds=weeks*7*24*60*60*1000;
        

        currenttime_return_list+=noofmilliseconds;
        console.log('dispatch checkout time='+currenttime_return_list+' weeks='+weeks+'');


        client.zadd(key_return_list,currenttime_return_list,value_return_list,(err_return_list,reply_return_list)=>{
            var ret = { status:reply_return_list, shopName: shop,prodid:productid,custid:custid,typeoftransaction:typeoftransaction };
            response.status(200).json(ret);
        });





    }
    catch(error){
        if(error.response){
            console.log("Error checkoutDispatchList  at=",error.response.body);
        }
        var retsuccess = { 'status': 'failure',errorstatus: error };
        response.status(200).json(retsuccess);
    }
});

/**
 * Route to update the metafields of the product which the user has 
 * edited ..
 */
router.post('/updateProductMetafields',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        const productlistofmetafields = request.body.productlistofmetafields;

        console.log("updateProductMetafields=",Object.keys(productlistofmetafields).length);

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        Object.keys(productlistofmetafields).forEach(async (key,index)=>{
            const metafieldobj=productlistofmetafields[key];
            const metafieldid=metafieldobj.id;
            if(metafieldid){
                const res=await shopify.metafield.update(metafieldid, metafieldobj);
            }
            else{
                const newmetafield=await commonService.createSingleMetafieldForProduct(shopify,metafieldobj);
            }
            console.log('updated metafield of product id=',res.owner_id);

        });
        
        //save to inventory_list DB
        var savetoinventory_listdb=productlistofmetafields['rentify_inventory'];
        commonService.saveInvertoryToDB(shop,savetoinventory_listdb.owner_id,savetoinventory_listdb.value);

        //deprecated code was for productlistofmetafields was an array.
        // productlistofmetafields.forEach(async metafieldobj=>{
        //     const metafieldid=metafieldobj.id;
        //     if(metafieldid){
        //         const res=await shopify.metafield.update(metafieldid, metafieldobj);
        //     }
        //     else{
        //         const newmetafield=await commonService.createSingleMetafieldForProduct(shopify,metafieldobj);
        //     }
        //     console.log('updated metafield of product id=',res.owner_id);

        // });

        var retsuccess = { 'status': 'success' };
        response.status(200).json(retsuccess);
        
    }
    catch(error){
        if(error.response){
            console.log("Error updateProductMetafields  at=",error.response.body);
        }
        var retsuccess = { 'status': 'failure',errorstatus: error };
        response.status(200).json(retsuccess);
    }
});

router.post('/retrievePoductDispatchList',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        // const productlist = request.body.productlist;

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        var resultproductdispatchlist = [];
        var countoftotalcustomers=0;
        //rental_list redis type
        //U CAN CALL SET . SMEMBERS TO GEt THE LIST OF ALL THE prodkeys NO NEED TO CALL client.keys.
        //changed spelling of key from `${shop}:product:*` to `${shop}:Product:*`;
        var key_dispatch_list=`${shop}:Dispatch`;
        client.zrangebyscore(key_dispatch_list,'-inf','+inf',async (err_dispatch_list,reply_dispatch_list)=>{
            // reply_dispatch_list.forEach(async tempvar=>{
            for(var i=0;i<reply_dispatch_list.length;i++){
                var tempvar=reply_dispatch_list[i];
                var therowvalue=tempvar;
                var strarr=therowvalue.split(':');
                var custid=strarr[1];
                var prodid=strarr[2];
                var customerobj= await shopify.customer.get(custid);
                var productobj= await shopify.product.get(prodid);
                var custname=`${customerobj.first_name} ${customerobj.last_name}`;
                var productname=`${productobj.title}`;
                
                //retrieve the no of days.
                const metafieldofproduct=await commonService.createMetafieldsForProducts(shopify,prodid,shop);
                var weeks=Number.parseFloat(metafieldofproduct['rentify_minrental'].value);
                var noofdays=weeks*7;

                var objtosave={
                    customerid:custid,
                    customername:custname,
                    productid:prodid,
                    productname:productname,
                    noofdays:noofdays
                };
                resultproductdispatchlist.push(objtosave);
                
            };
            
            var retsuccess = { 'resultproductdispatchlist': resultproductdispatchlist };
            response.status(200).json(retsuccess);

        });

        //COMMENTED AS IT IS NOT REQUIRED since we get dispatch_list from DB
        // client.keys(prodkey,(err,reply)=>{
        //     var noofproducts=reply.length;

        //     reply.forEach(tempkey=>{

        //         client.zrange(tempkey,0,-1,(err2,reply2)=>{
        //             const splitforcustomer='customer:';
        //             if(reply2!=null){
                        
        //                 countoftotalcustomers+=reply2.length;
        //                 console.log("retrievePoductDispatchList countoftotalcustomers="+countoftotalcustomers);
        //                 //changed spelling of key from `${shop}:product:*` to `${shop}:Product:*`;
        //                 var splitkeyforproduct=`${shop}:Product:`;
        //                 var tempproductid=tempkey.split(splitkeyforproduct)[1];
        //                 console.log("retrievePoductDispatchList tempproductid="+tempproductid);
        //                 reply2.forEach(tempcustomer=>{

        //                     var custid=tempcustomer.split(splitforcustomer)[1];
        //                     console.log("retrievePoductDispatchList custid="+custid);
        //                     shopify.customer.get(custid).then(savedcust=>{
        //                         // var customername=`${savedcust.first_name} ${savedcust.last_name}`;
        //                         shopify.product.get(tempproductid).then(prodobj=>{
        //                             var productid=prodobj.id;
        //                             var productname=prodobj.title;
        //                             var customername=`${savedcust.first_name} ${savedcust.last_name}`;

        //                             var objtosave={
        //                                 productid:productid,
        //                                 productname:productname,
        //                                 customerid:custid,
        //                                 customername:customername
        //                             };
        //                             resultproductdispatchlist.push(objtosave);

        //                             // setTimeout(function(){
        //                                 if(resultproductdispatchlist.length>=countoftotalcustomers){
        //                                     console.log("retrievePoductDispatchList length=",resultproductdispatchlist.length,countoftotalcustomers);
        //                                     console.log("retrievePoductDispatchList content=",resultproductdispatchlist);
        //                                     var retsuccess = { 'resultproductdispatchlist': resultproductdispatchlist };
        //                                     response.status(200).json(retsuccess);
        //                                 }
        //                             // },100);
                                    

        //                         }).catch(errtwo=>{
        //                             if(errtwo.response){
        //                                 console.log("Error ShOpifyproduct  at=",errtwo.response.body);
        //                             }
        //                         });
        //                     }).catch(errone=>{
        //                         if(errone.response){
        //                             console.log("Error ShOpifycustomer  at=",errone.response.body);
        //                         }
        //                     });

        //                 });
        //             }
        //         });
 
        //     });
            
            

        // });
 
    }
    catch(error){
        console.log('retrievePoductDispatchList error:', error);
        var ret = { resultproductdispatchlist:[],errorstatus: error };

        return response.status(200).json(ret);
    } 
});

router.post('/retrievePoductHoldList', function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        // const productlist = request.body.productlist;

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        var resultproductholdlist = [];
        var count=0;

        //rental_list redis type
        //U CAN CALL SET . SMEMBERS TO GEt THE LIST OF ALL THE prodkeys NO NEED TO CALL client.keys.
        var shop_list_key=`${shop}:products`;
        client.get(shop_list_key,(err_shop_list,reply_shop_list)=>{
            var rental_list_key=reply_shop_list;
            client.smembers(rental_list_key,async (err_rental_list,reply_rental_list)=>{
                var noofproducts=reply_rental_list.length;

                // reply_rental_list.forEach(tempkey=>{
                for(var i=0;i<reply_rental_list.length;i++)    {
                    var tempkey=reply_rental_list[i];
                    var splitkey=`${shop}:Product:`;
                    var tempproductid=tempkey.split(splitkey)[1]; 

                    // client.zcount(tempkey,'-inf','+inf',(err,reply2)=>{
                        var reply2= await commonService.getNoofHoldsOnProduct(shop,tempproductid);
                        console.log('retrievePoductHoldList zcount reply=',reply2);
                        if(reply2!=null & reply2>0){
                            // var tempkey2=tempkey;
                            count++;
                            //changed spelling of key from var splitkey=`${shop}:product:` to var splitkey=`${shop}:Product:`;
                            // var splitkey=`${shop}:Product:`;
                            // var tempproductid=tempkey2.split(splitkey)[1];
                            console.log('retrievePoductHoldList after split prodid=',tempproductid,tempkey);
                            // shopify.product.get(tempproductid).then(async a=>{
                                var a= await shopify.product.get(tempproductid);
                                // var tempproductid=a.id;
                                var tempproductname=a.title;

                                var noofholds=reply2;
                                var objtosave={
                                    productid:tempproductid,
                                    productname:tempproductname,
                                    noofholds:noofholds
                                };
                                //retrieve the metafields for this product and 
                                //inject it into the productobj json object.
                                const metafieldofproduct=await commonService.createMetafieldsForProducts(shopify,tempproductid,shop);
                                objtosave['rentify_metafields']=metafieldofproduct;

                                resultproductholdlist.push(objtosave);
                                // if(resultproductholdlist.length==noofproducts){
                                    // console.log("retrievePoductHoldList length=",resultproductholdlist.length,noofproducts);
                                    // console.log("retrievePoductHoldList content=",resultproductholdlist);
                                    // var retsuccess = { 'resultproductholdlist': resultproductholdlist };
                                    // response.status(200).json(retsuccess);
                                // }
                            // });
                            
                        }
                    // });
                }
                console.log("retrievePoductHoldList content=",resultproductholdlist);
                var retsuccess = { 'resultproductholdlist': resultproductholdlist };
                response.status(200).json(retsuccess);
            });
        });

        //converted list to set so comment below lines
        //changed spelling of key from `${shop}:product:*` to `${shop}:Product:*`;
        // var prodkey=`${shop}:Product:*`;
        // client.keys(prodkey,(err,reply)=>{
            // var noofproducts=reply.length;

            // reply.forEach(tempkey=>{
            //     client.zcount(tempkey,'-inf','+inf',(err,reply2)=>{
            //         console.log('retrievePoductHoldList zcount reply=',reply2);
            //         if(reply2!=null & reply2>0){
            //             var tempkey2=tempkey;
            //             count++;
            //changed spelling of key from var splitkey=`${shop}:product:` to var splitkey=`${shop}:Product:`;
            //             var splitkey=`${shop}:Product:`;
            //             var tempproductid=tempkey2.split(splitkey)[1];
            //             console.log('retrievePoductHoldList after split prodid=',tempproductid,tempkey2);
            //             shopify.product.get(tempproductid).then(async a=>{
            //                 // var tempproductid=a.id;
            //                 var tempproductname=a.title;

            //                 var noofholds=reply2;
            //                 var objtosave={
            //                     productid:tempproductid,
            //                     productname:tempproductname,
            //                     noofholds:noofholds
            //                 };
            //                 //retrieve the metafields for this product and 
            //                 //inject it into the productobj json object.
            //                 const metafieldofproduct=await commonService.createMetafieldsForProducts(shopify,tempproductid);
            //                 objtosave['rentify_metafields']=metafieldofproduct;

            //                 resultproductholdlist.push(objtosave);
            //                 if(resultproductholdlist.length==noofproducts){
            //                     console.log("retrievePoductHoldList length=",resultproductholdlist.length,noofproducts);
            //                     console.log("retrievePoductHoldList content=",resultproductholdlist);
            //                     var retsuccess = { 'resultproductholdlist': resultproductholdlist };
            //                     response.status(200).json(retsuccess);
            //                 }
            //             });
                        
            //         }
            //     });
            // });
            
            

        // });

        // obsolete code below
        // // shopify.product.list().then(productlist=>{
        // //     productlist.forEach(a=>{
        // //         var productid=a.id;
                
        // //         var key2=`${shop}:product:${productid}`;
        // //         client.zcount(key2,'-inf','+inf',(err,reply)=>{
        // //             if(reply!=null & reply>0){
        // //                 count++;
        // //                 var tempproductid=a.id;
        // //                 var tempproductname=a.title;

        // //                 var noofholds=reply;
        // //                 var objtosave={
        // //                     productid:tempproductid,
        // //                     productname:tempproductname,
        // //                     noofholds:noofholds
        // //                 };
        // //                 resultproductholdlist.push(objtosave);
        // //             }
        // //         });

        // //     })
        // // });
        

    }
    catch(error){
        console.log('retrievePoductHoldList error:', error);
        var ret = { resultproductlist:[],errorstatus: error };

        return response.status(200).json(ret);
    } 
});


router.post('/deleteFromPoductList', function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        const productid = request.body.productid;
        
        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        var resultproductlist = [];

        var key2 = `${shop}:products`;
        var result = client.get(key2, (err, reply) => {
            var keytolist=reply;

            //code to remove the product id from Redis DB.
            var saverow = `${shop}:Product:${productid}`;
            //delete from rental_list
            client.srem(keytolist,saverow);
            //converted list to set so comment below lines
            // myFuncForRem(keytolist, 0, saverow);

            //retrieve all the members of rental_list
            client.smembers(keytolist,(err,reply)=>{
            //converted list to set so comment below lines
            // client.lrange(keytolist,0,-1,(err,reply)=>{
                
                reply.forEach((prodrow,index) => {
                    console.log('deleteFromPoductList prodrow=> ', prodrow);
                    var temparr = prodrow.split(":");
                    const productid = temparr[2];
                    console.log('deleteFromPoductList productid=', productid);

                    shopify.product.get(productid)
                        .then(productobj => {
                            resultproductlist.push(productobj);
                            console.log('deleteFromPoductList inside shopify get', productobj.id);
                            var currentlen=resultproductlist.length;
                            if(currentlen===reply.length){
                                console.log("deleteFromPoductList inside shopify send index=",currentlen,reply.length);
                                var retsuccess = { 'resultproductlist': resultproductlist };
                                response.status(200).json(retsuccess);
                            }
                        });
                    
                        
                });
            });
        });
    }
    catch(error){
        console.log('saveProductList error:', error);
        var ret = { resultproductlist:[],errorstatus: error };

        return response.status(200).json(ret);
    } 
});

router.post('/retrievePoductList',async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        // const productlist = request.body.productlist;

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });

        var resultproductlist = [];

        var key2 = `${shop}:products`;
        var result = client.get(key2, (err, reply1) => {
            var keytolist=reply1;

            //retrieve the members of rental_list
            client.smembers(keytolist,(err,reply)=>{
            // client.lrange(keytolist,0,-1,(err,reply)=>{
                
                reply.forEach( (prodrow,index) => {
                    console.log('retrieveProductlist prodrow=> ', prodrow);
                    var temparr = prodrow.split(":");
                    const productid = temparr[2];
                    console.log('productid=', productid);


                    shopify.product.get(productid)
                        .then(async productobj => {
                            //retrieve the metafields for this product and 
                            //inject it into the productobj json object.
                            const metafieldofproduct=await commonService.createMetafieldsForProducts(shopify,productid,shop);
                            productobj['rentify_metafields']=metafieldofproduct;

                            resultproductlist.push(productobj);
                            console.log('retrieveProductlist inside shopify get', productobj.id);
                            var currentlen=resultproductlist.length;
                            if(currentlen===reply.length){
                                console.log("retrieveProductlist inside shopify send index=",currentlen,reply.length);
                                var retsuccess = { 'resultproductlist': resultproductlist };
                                response.status(200).json(retsuccess);
                            }
                        });
                    
                        
                });
            });
        });
    }
    catch(error){
        console.log('retrieveProductlist error:', error);
        var ret = { resultproductlist:[],errorstatus: error };

        return response.status(200).json(ret);
    } 
});
 
router.post('/savePoductList', async function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        const productlist = request.body.productlist;

        const shopify = new Shopify({
            shopName: shop,
            accessToken: accessToken
        });


        

        var listofproducts = [];

        var resultproductlist = [];

        var listofrentifymetafields={};


        // console.log('productlist body=',request.body);
        console.log('productlist=', productlist);
        // console.log('productlist stack=',request.stack);
        // console.log('productlist params=',request.params);
        var key2 = `${shop}:products`;
        var result = client.get(key2, async (err, reply) => {
            // var reply = myFuncForGet(key2);
            console.log("inside get", key2, reply);
            if (reply) {
                console.log("inside reply", reply);
                var key = reply;
                var list = productlist;

                // list=JSON.parse(productlist);
                console.log("inside list", list.length);
                for(var indx=0;indx<list.length;indx++){
                    var a=list[indx];
                // }
                // list.forEach(async a => {
                    var productid = a.id;
                    
                    //logic to save the default metafields to the shopify data.
                    const temp= await commonService.createMetafieldsForProducts(shopify,productid,shop);
                    listofrentifymetafields[productid]=temp;

                    console.log("listofrentifymetafields is valid length="+listofrentifymetafields.length);

                    var saverow = `${shop}:Product:${productid}`;
                    
                    console.log("inside loop saverow=" + saverow);
                    console.log("inside lrem");
                    //add to rental_list without deleting anything. 
                    client.sadd(key,saverow);
                    //converted list to set so comment below lines
                    // myFuncForRem(key, 0, saverow);
                    // client.rpush([key, saverow]);
                    console.log("inside rpush", saverow);

                    // client.lrem(key,0,saverow,(err2,reply2)=>{
                    //     console.log("inside lrem",reply2);
                    //     client.rpush([key,saverow]);
                    //     console.log("inside rpush",saverow);
                    // });

                // });
                }
                console.log("lrange key is this", key);
                //retrieve all the rows rental_list
                client.smembers(key,(err,reply)=>{
                //converted list to set so comment below lines    
                // client.lrange(key, 0, -1, (err, reply) => {
                    // var reply = myFuncForLrange(key, 0, -1);
                    console.log("lrange reply=", reply.length);
                    reply.forEach((prodrow,index) => {
                        console.log('prodrow=> ', prodrow);
                        var temparr = prodrow.split(":");
                        const productid = temparr[2];
                        console.log('productid=', productid);

                        shopify.product.get(productid)
                            .then(productobj => {

                                //below if condition we check if the product is a new product if so
                                //we inject the rentify metafields into the productobj json object.
                                //so that we can sho it in the rentify client 
                                if(listofrentifymetafields[productid]!=null){
                                    productobj['rentify_metafields']=listofrentifymetafields[productid];
                                }
                                resultproductlist.push(productobj);
                                console.log('inside shopify get', productobj.id);
                                var currentlen=resultproductlist.length;
                                if(currentlen===reply.length){
                                    console.log("inside shopify send index=",currentlen,reply.length);
                                    var retsuccess = { 'resultproductlist': resultproductlist };
                                    response.status(200).json(retsuccess);
                                }
                            });
                        
                            
                    });
                    
                });


            }
        });



        // var retsuccess = { 'status': resultproductlist };

        // return response.status(200).json(retsuccess);

    } catch (error) {
        console.log('saveProductList error:', error);
        var ret = { resultproductlist:[],errorstatus: error };
        return response.status(200).json(ret);
    }

});

router.post('/getShopName', function (request, response) {
    try {
        const { session: { shop, accessToken } } = request;
        // const { session: { shop, accessToken,store } } = request;

        var key2 = `${shop}:products`;
        var value2 = `${shop}:product_list_key`;

        client.set(key2, value2, (err, reply) => {
            console.log("Yeah saved Shop Product in redis :", reply);
        });


        console.log("getShopname=", shop, accessToken);
        var ret = { shopName: shop };
        // var store1=new RedisStore();

        response.status(200).json(ret);

    } catch (error) {
        var ret = { shopName: 'Sorry Nothing' };
        response.status(200).json(ret);
    }

});



module.exports = {
    setClient: function (inClient) {
        client = inClient;
        loadAsyncLibraryForRedis();
    },
    router
};