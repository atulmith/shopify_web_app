import callApi from '../commons/apiCaller';

/**
 * The RENTIFY API WS to checkin the product that is returned.
 * @param {*} param 
 */
export function callWSCheckinReturnslist(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/checkInReturnsList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSCheckinReturnslist=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          // dispatch(productDispatchManageShow(json));
          dispatch(callWSRetrievePoductReturnsList([]));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}

/**
 * TO call the RENTIFY API WS for getting the list of product returns.
 * @param {*} param 
 */
export function callWSRetrievePoductReturnsList(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/retrievePoductReturnsList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSRetrievePoductReturnsList=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          dispatch(productReturnManageShow(json));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}

export function callWSCheckoutDispatchlist(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/checkoutDispatchList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSCheckoutDispatchlist=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          // dispatch(productDispatchManageShow(json));
          dispatch(callWSRetrievePoductDispatchList([]));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}

/**
 * To call WS to update the metafields for that product.
 * @param {*} param 
 */
export function callWSUpdateProductMetafields(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/updateProductMetafields',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSUpdateProductMetafields=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          // dispatch(productDispatchManageShow(json));
          dispatch(callWSRetrieveProductList([]));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}
/**
 * To retrieve list of dispatch of all products in DB
 * @param {*} param 
 */
export function callWSRetrievePoductDispatchList(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/retrievePoductDispatchList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSRetrievePoductDispatchList=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          dispatch(productDispatchManageShow(json));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}

export function callWSRetrievePoductHoldList(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/retrievePoductHoldList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSRetrievePoductHoldList=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          dispatch(productHoldManageShow(json));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}


export function callWSDeleteFromProductList(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/deleteFromPoductList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSDeleteFromProductList=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          dispatch(productManageShow(json));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}


export function callWSRetrieveProductList(param) {

  const localrequestFields = {
    verb: 'POST',
    path: '/redify_productmanage/retrievePoductList',
    params: param
  };
const { verb, path, params } = localrequestFields;
  // const verb='POST';
  // const path='/redify_productmanage/savePoductList';

  console.log("callWSRetrieveProductList=",localrequestFields);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(param)
  }

  // if (verb !== 'GET') {
    // fetchOptions['body'] = JSON.stringify(params,null,2);
  // }

  return dispatch => {
    dispatch(requestStartAction());

    return fetch(`${path}`, fetchOptions)
      .then(response => response.json())
      .then(json =>{ 
          // dispatch(requestCompleteAction(json));
          dispatch(productManageShow(json));
        } )
      .catch(error => {
        dispatch(requestErrorAction(error));
      });
  };
}

/**
 * Call to Save the Product List to the DB on server.
 * @param {*} requestFields 
 */
export function callWSSaveProductList(param) {

    const localrequestFields = {
      verb: 'POST',
      path: '/redify_productmanage/savePoductList',
      params: param
    };
  const { verb, path, params } = localrequestFields;
    // const verb='POST';
    // const path='/redify_productmanage/savePoductList';

    console.log("callWSSaveProductList=",localrequestFields);

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(param)
    }
  
    // if (verb !== 'GET') {
      // fetchOptions['body'] = JSON.stringify(params,null,2);
    // }
  
    return dispatch => {
      dispatch(requestStartAction());
  
      return fetch(`${path}`, fetchOptions)
        .then(response => response.json())
        .then(json =>{ 
            // dispatch(requestCompleteAction(json));
            dispatch(productManageSave(json));
          } )
        .catch(error => {
          dispatch(requestErrorAction(error));
        });
    };
}
export function productShowShopname(requestFields) {
  
  const { verb, path, params } = requestFields;
  
    const fetchOptions = {
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }
  
    if (verb !== 'GET') {
      fetchOptions['body'] = params
    }
  
    return dispatch => {
      dispatch(requestStartAction());
  
      return fetch(`${path}`, fetchOptions)
        .then(response => response.json())
        .then(json => dispatch(requestCompleteAction(json)))
        .catch(error => {
          dispatch(requestErrorAction(error));
        });
    };
}

/**
 * Returns the list of products that appers in the "Return listing"
 * @param {*} resultproductreturnslist 
 */
export function productReturnManageShow(productreturnslist) {
  // const productlist = JSON.stringify(paramsproductlist, null, 2);
  
  return {
    type: 'PRODUCT_RETURN_MANAGE_SHOW',
    payload: {
      productreturnslist
    },
  };
}


export function productDispatchManageShow(productdispatchlist) {
  // const productlist = JSON.stringify(paramsproductlist, null, 2);
  
  return {
    type: 'PRODUCT_DISPATCH_MANAGE_SHOW',
    payload: {
      productdispatchlist
    },
  };
}

export function productHoldManageShow(productholdlist) {
  // const productlist = JSON.stringify(paramsproductlist, null, 2);
  
  return {
    type: 'PRODUCT_HOLD_MANAGE_SHOW',
    payload: {
      productholdlist
    },
  };
}

export function productManageShow(productlist) {
  // const productlist = JSON.stringify(paramsproductlist, null, 2);
  
  return {
    type: 'PRODUCT_MANAGE_SHOW',
    payload: {
      productlist
    },
  };
}

export function productManageSave(productlist) {
  // const productlist = JSON.stringify(paramsproductlist, null, 2);
  
  return {
    type: 'PRODUCT_MANAGE_SAVE',
    payload: {
      productlist
    },
  };
}

export function updateVerb(verb) {
    return {
      type: 'UPDATE_VERB',
      payload: {
        verb,
      },
    };
  }
  
  export function updatePath(path) {
    return {
      type: 'UPDATE_PATH',
      payload: {
        path,
      },
    };
  }
  
  export function updateParams(params) {
    return {
      type: 'UPDATE_PARAMS',
      payload: {
        params,
      },
    };
  }
  
  export function sendRequest(requestFields) {
    const { verb, path, params } = requestFields;
  
    const fetchOptions = {
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }
  
    if (verb !== 'GET') {
      fetchOptions['body'] = params
    }
  
    return dispatch => {
      dispatch(requestStartAction());
  
      return fetch(`/shopify/api${path}`, fetchOptions)
        .then(response => response.json())
        .then(json => dispatch(requestCompleteAction(json)))
        .catch(error => {
          dispatch(requestErrorAction(error));
        });
    };
  }
  
  function requestStartAction() {
    return {
      type: 'REQUEST_START',
      payload: {},
    };
  }
  
  function requestCompleteAction(json) {
    const responseBody = JSON.stringify(json, null, 2);
  
    return {
      type: 'REQUEST_COMPLETE',
      payload: {
        responseBody
      },
    };
  }
  
  function requestErrorAction(requestError) {
    return {
      type: 'REQUEST_ERROR',
      payload: {
        requestError,
      },
    };
  }