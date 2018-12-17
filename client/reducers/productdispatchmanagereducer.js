
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {Map,List} from 'immutable';

const listofproductsondispatch = [];

  const initState = {
     listofproductsondispatch
  };

  function ProductDispatchmanageReducer(state = initState, action) {
    switch (action.type) {

         case 'PRODUCT_DISPATCH_MANAGE_SHOW':
            state=Map(state);
            var newtemplist=List(action.payload.productdispatchlist.resultproductdispatchlist);
            state=state.set('productdispatchlist',newtemplist);
            return state;

     
      default:
        return state;
    }
  }


  export default ProductDispatchmanageReducer;

