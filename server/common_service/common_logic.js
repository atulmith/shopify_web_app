const redis = require('redis');
// var redisProdClient = redis.createClient();
var redisProdClient=null;


function saveStoreFrontAccessToken(key2,value2){
    console.log("saveStoreFrontAccessToken"+redisProdClient);
     redisProdClient.set(key2, value2, (err, reply) => {
            console.log("Error saved Shop accesstoken in redis :",err);
            console.log("Yeah saved Shop accesstoken in redis :", reply);
        });
}

async function createMetafieldsForProducts(shopifyapp,productid,shopname){
    console.log("started createMetafieldsForProducts for product id=",productid);
    var metafieldarr=[
        {
            key:'rentify_rate',
            value:'0',
            value_type:'string',
            namespace:'global',
            owner_resource: 'product',
            owner_id: productid    
        },
        {
            key:'rentify_minrental',
            value:'0',
            value_type:'string',
            namespace:'global',
            owner_resource: 'product',
            owner_id: productid    
        },
        {
            key:'rentify_maxrental',
            value:'0',
            value_type:'string',
            namespace:'global',
            owner_resource: 'product',
            owner_id: productid    
        },
        {
            key:'rentify_autorenewcharge',
            value:'no',
            value_type:'string',
            namespace:'global',
            owner_resource: 'product',
            owner_id: productid    
        }
        ,
        {
            key:'rentify_inventory',
            value:'0',
            value_type:'string',
            namespace:'global',
            owner_resource: 'product',
            owner_id: productid    
        }
    ];

    var metafieldreturns=new Object();

    
    var metafields=await shopifyapp.metafield.list({
        metafield:{
            owner_resource: 'product',
            owner_id: productid
        }
    });
    // });.then(metafields=>{
        
    var isNewProduct=true;
    //changed the logic of metafields structure 
    // if(metafields.length>0){
    //         metafields.find(a=>{
    //             if(a.key===metafieldarr[0].key){
    //                 isNewProduct=false;
    //                 return true;
    //             }
    //         });
    // }
        if(isNewProduct){
            for(var i=0;i<metafieldarr.length;i++){
                var metanew=metafieldarr[i];
            
            // metafieldarr.forEach(async metanew=>{
                try{
                    var compmetaobj=metafields.find(a=>a.key===metanew.key);
                    
                    if(compmetaobj){
                        metafieldreturns[compmetaobj.key]=compmetaobj;
                        // metafieldreturns.push(compmetaobj);
                        continue;
                    }

                    const metafield= await shopifyapp.metafield.create({
                        key:metanew.key,
                        value:metanew.value,
                        value_type:metanew.value_type,
                        namespace:metanew.namespace,
                        owner_resource: metanew.owner_resource,
                        owner_id: metanew.owner_id
                    });
                    metafieldreturns[metafield.key]=metafield;
                    // metafieldreturns.push(metafield);
                    // // .then(metafield=>console.log(metanew.key+'added metafield  for product',metafield),
                    //         err=>console.error('ERROR at added metafield for product',err));
                    console.log(metanew.key+'added metafield  for product',metafield);
            }
            catch(err){
                if(err.response){
                    console.log('Error at added metafield for product',err.response.body);
                }
                else{
                    console.error('ERROR at added metafield for product',err);
                }
            }
                
            // });
            }
            
            const inventoryvalue=metafieldreturns['rentify_inventory'].value;
            saveInvertoryToDB(shopname,productid,inventoryvalue);
            
            return metafieldreturns;
            // return metafieldarr;
        }else{
            //it can't be an array which we return it should be a object.
            // return metafields;
        }
        // }
    // })

}

async function createSingleMetafieldForProduct(shopifyapp,parammetafield){

    console.log("enter createSingleMetafieldForProduct");

    const metafield= await shopifyapp.metafield.create({
        key:parammetafield.key,
        value:parammetafield.value,
        value_type:parammetafield.value_type,
        namespace:parammetafield.namespace,
        owner_resource: parammetafield.owner_resource,
        owner_id: parammetafield.owner_id
    });
    return metafield;

}

/**
 * Function to return the no of holds on a product for that shop as a promise.
 * @param {*} shopname 
 * @param {*} productid 
 */
function getNoofHoldsOnProduct(shopname,productid){

    return new Promise(function(resolve,reject){
    
        //changed spelling of key from `${shopname}:product:${productid}` to `${shopname}:Product:${productid}`
        const hold_list_key=`${shopname}:Product:${productid}`;
        redisProdClient.zcount(hold_list_key,'-inf','+inf',(err,reply2)=>{
    
            resolve(reply2);
    
        });
    
    });

}

/**
 * Update Inventory in "inventory_list" REDIS DB  for each product instead of saving in the SHOPIFY ADMIN API.
 * @param {*} shopname 
 * @param {*} productid 
 * @param {*} inventoryvalue 
 */
function saveInvertoryToDB(shopname,productid,inventoryvalue){

    if(!shopname || !productid || !inventoryvalue){
        console.log("Could not saveInvertoryToDB()",shopname,productid,inventoryvalue);

        return ;
    }
    //replaced ProductInventory with product_inventory
    var key_inventory_list=`${shopname}:product_inventory:${productid}`;
    redisProdClient.set(key_inventory_list,inventoryvalue);
}

/**
 * Returns the Inventory of that product for that shop as a promise.
 * @param {*} shopname 
 * @param {*} productid 
 */
function getInventoryFromDB(shopname,productid){

    return new Promise(function(resolve,reject){
        //replaced ProductInventory with product_inventory
        var key_inventory_list=`${shopname}:product_inventory:${productid}`;

        redisProdClient.get(key_inventory_list,(err,reply)=>{
            resolve(reply);
        });
    });
}

/**
 * Returns the date in the predefined format of 3 june 2018.
 * @param {*} date 
 */
function prettyDate(date) {
    console.log('prettyDate=',date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    return date.getUTCDate() + ' ' +months[date.getUTCMonth()] + ' ' +  date.getUTCFullYear();
  }

module.exports = {
    saveStoreFrontAccessToken,
    createMetafieldsForProducts,
    createSingleMetafieldForProduct,
    getNoofHoldsOnProduct,
    saveInvertoryToDB,
    getInventoryFromDB,
    prettyDate,
    setClient: function (inClient) {
        console.log("setClient of commonlogic");
        redisProdClient = inClient;
        
    },
};