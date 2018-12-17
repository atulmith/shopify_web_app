'use strict';
require('isomorphic-fetch');
require('dotenv').config();

const fs = require('fs');
// const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const logger = require('morgan');

const ShopifyAPIClient = require('shopify-api-node');
const ShopifyExpress = require('@shopify/shopify-express');
const { MemoryStrategy, RedisStrategy } = require('@shopify/shopify-express/strategies');

var redifyProductmanage = require('./routes/productmanage_route');
var storeFrontRoute=require('./routes/storefront_route');


var commonService=require('./common_service/common_logic');



const {
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_HOST,
  SHOPIFY_APP_SECRET,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
} = process.env;

const shopifyConfig = {
  host: SHOPIFY_APP_HOST,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: ['write_orders, write_products,write_customers,write_script_tags,unauthenticated_read_product_listings,unauthenticated_write_customers'],
  shopStore: new MemoryStrategy(),
  afterAuth(request, response) {
    const { session: { accessToken, shop } } = request;

    registerWebhook(shop, accessToken, {
      topic: 'orders/create',
      address: `${SHOPIFY_APP_HOST}/order-create`,
      format: 'json'
    });

    return response.redirect('/');
  },
};

const registerWebhook = function (shopDomain, accessToken, webhook) {
  const shopify = new ShopifyAPIClient({ shopName: shopDomain, accessToken: accessToken });
  shopify.webhook.create(webhook).then(
    response => console.log(`webhook '${webhook.topic}' created`),
    err => console.log(`Error creating webhook '${webhook.topic}'. ${JSON.stringify(err.response.body)}`)
  );
}

const app = express();
const isDevelopment = NODE_ENV !== 'production';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));


var redisProdClient = null;

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if (isDevelopment == false) {
  const redis = require('redis');
  console.log('from index.js',SHOPIFY_APP_HOST);
  // Connect to a redis server provisioned over at
  // Redis Labs. See the README for more info.
  redisProdClient = redis.createClient(
    REDIS_PORT || '6379',
    REDIS_HOST || '127.0.0.1',
    {
      'auth_pass': REDIS_PASS,
      'return_buffers': false//true
    }
  ).on('error', (err) => console.log('ERR:REDIS:', err));
  //console.log(redisProdClient);
  commonService.setClient(redisProdClient);
}


app.use(
  session({
    store: new RedisStore({ client: redisProdClient }),
    secret: SHOPIFY_APP_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

// Run webpack hot reloading in dev
if (isDevelopment) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../config/webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  //copied from below  else by mithun
  const staticPath = path.resolve(__dirname, '../assets');
  app.use('/assets', express.static(staticPath));
} else {
  const staticPath = path.resolve(__dirname, '../assets');
  app.use('/assets', express.static(staticPath));
}

// Install
app.get('/install', (req, res) => res.render('install'));

// Create shopify middlewares and router
const shopify = ShopifyExpress(shopifyConfig);

// Mount Shopify Routes
const { routes, middleware } = shopify;
const { withShop, withWebhook } = middleware;


// app.use('/', routes);
app.use('/shopify', routes);

// Client
// app.get('/', withShop, function (request, response) {
  app.get('/', withShop({authBaseUrl: '/shopify'}), function (request, response) {  
  const { session: { shop, accessToken } } = request;
  response.render('app', {
    title: 'Shopify Node App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
  });
  //START code to inject the js to the storefront
  console.log("Storefront start at ", shop, accessToken);
  

  const shopifyclient = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
  const srctoadd = `${SHOPIFY_APP_HOST}/assets/mainstorefrontredify.js`;
  // var storefrontAccessstoken=null;

  //made a method1 for this 
  // shopifyclient.storefrontAccessToken.create({
  //     title:"Rentify Test"
    
  // }).then(storefront=>{
  //   console.log("StoreFrontACCESSTOKEN=",storefront);
  //   storefrontAccessstoken=storefront.access_token;

  // }).catch(errstr=>{
  //   console.log("Error storefrontAccessstoken creation at=",errstr.response.body);
  //   storefrontAccessstoken='0';
  // }
  // );

   

  // const srctoadd = `${SHOPIFY_APP_HOST}/assets/mainstorefrontredify.js?storefronttoken=${storefrontAccessstoken}`;

  //code to list all the scripttags having that src already in it.
  // shopifyclient.scriptTag.list({
  //   src: `${srctoadd}`
  // }).then(scripts => {

   
  //   //code to delete unwanted scriptags added while testing.
  //   // if (scripts.length > 0) {
  //   //   scripts.map(a => {
  //   //     shopifyclient.scriptTag.delete(a.id).
  //   //       catch(errdel => console.log("scripttage delete error", errdel.response.body))
  //   //   });
  //   // }

  //   //to create a scripttag only if there is no existing src already existing.
  //   if (scripts.length == 0) {

  //     shopifyclient.scriptTag.create({
  //       event: 'onload',
  //       src: `${srctoadd}`
  //     }).then(scripts =>
  //       console.log("saved scriptTag at=", scripts)
  //     ).catch(errcreate =>
  //       console.log("error scriptTag creation at=", errcreate.response.body)
  //     );
  //   }
  // }).catch(err => {
  //   console.log("error scriptTag list at=", err.response.body)
  // });
  
  loadScripttag(shopifyclient,srctoadd,shop);
  
  //commented below code since we have included the code to create accesstoken inside the scripttag creation logic.
  // loadCreateStoreFrontAccessToken(shopifyclient).then(storefront=>{
  //   console.log("calling from FIRST THEN loadCreateStoreFrontAccessToken ",storefront);
  //   const storefrontAccessstoken=storefront.access_token;
  //   const smallsrc=`${SHOPIFY_APP_HOST}/assets/mainstorefrontredify.js`;
  //   const srctoadd = `${smallsrc}?storefronttoken=${storefrontAccessstoken}`;
  //   loadScripttag(shopifyclient,srctoadd,smallsrc);
  //   // return srctoadd;
  // });
  

  //END code to inject the js to the storefront

});
function loadScripttag(shopifyclient,srctoadd,shop){
  console.log("loadScripttag params",srctoadd);
  return shopifyclient.scriptTag.list({
    src: `${srctoadd}`
  }).then(scripts => {
    console.log("enter then of loadScripttag");
    //code to delete unwanted scriptags added while testing.
    // if (scripts.length > 0) {
    //   scripts.map(a => {
    //     if(a.src.indexOf(smallsrc) > -1){
    //     shopifyclient.scriptTag.delete(a.id).
    //       catch(errdel => console.log("scripttage delete error", errdel.response.body))
    //     }
    //   });
    // }

    //to create a scripttag only if there is no existing src already existing.
    if (scripts.length == 0) {
      
      shopifyclient.scriptTag.create({
        event: 'onload',
        src: `${srctoadd}`
      }).then(scripts =>
        console.log("saved scriptTag at=", scripts)
      ).catch(errcreate =>
        console.log("error scriptTag creation at=", errcreate.response.body)
      );
      loadCreateStoreFrontAccessToken(shopifyclient,shop);
      ///CREATE ACCESTTOKEN CALL
      // loadCreateStoreFrontAccessToken(shopifyclient).then(storefront=>{
      //   console.log("calling from FIRST THEN loadCreateStoreFrontAccessToken ",storefront);
      //   // const storefrontAccessstoken=storefront.access_token;
        
      // });


    }
    
  }).catch(err => {
    console.log("error scriptTag list at=", err.response.body)
  });
}
function loadCreateStoreFrontAccessToken(shopifyclient,shop){
     console.log("enter loadCreateStoreFrontAccessToken");
     return shopifyclient.storefrontAccessToken.create({
        title:"Rentify Test"
      
    }).then(storefront=>{
      console.log("StoreFrontACCESSTOKEN=",storefront);
      const storefrontAccessstoken=storefront.access_token;
      //SAVE THE GENERATED ACCESSTOKEN TO REDIS DB.
      //THE KEY FOR SAVING THE ACCCESSTOKEN
      var key2 = `storefrontaccesstoken:${shop}`;
      //THE VALUE FOR SAVING THE ACCESSTOKEN
      var value2 = `${storefrontAccessstoken}`;
      
      //THE REDIS CALL TO SET THE ACCESSTOKEN VALUE TO THE ABOVE KEY
      commonService.saveStoreFrontAccessToken(key2,value2);
      // if(redisProdClient){
      //   console.log("inside redisProdClient");
      //   // redisProdClient.set(key2, value2);

      //   // redisProdClient.set(key2, value2, (err, reply) => {
      //   //     console.log("Error saved Shop accesstoken in redis :",err);
      //   //     console.log("Yeah saved Shop accesstoken in redis :", reply);
      //   // });
      // }
      // else{
      //   console.log("Sorry redisProdClient is null");
      // }
      
      // return storefrontAccessstoken;
      return storefront;
    }).catch(errstr=>{
      if(errstr.response){
        console.log("Error storefrontAccessstoken creation at=",errstr.response.body);
      }
      console.log("Error 2 storefrontAccessstoken creation at=",errstr);
      storefrontAccessstoken='0';
    }
    );
}

app.get('/test', function (request, response) {
  // const { session: { shop, accessToken } } = request;
  response.render('test', {
    title: 'Shopify Test App',
    apiKey: '123',
    shop: 'example.com',
  });
});

app.post('/order-create', withWebhook((error, request) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('We got a webhook!');
  console.log('Details: ', request.webhook);
  console.log('Body:', request.body);
}));
redifyProductmanage.setClient(redisProdClient);
storeFrontRoute.setClient(redisProdClient);

app.use('/redify_productmanage', bodyParser.json(), redifyProductmanage.router);
app.use('/redify_storefront', bodyParser.json(),storeFrontRoute.router);

// Error Handlers
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  response.status(error.status || 500);
  response.render('error');
});



module.exports = app;
