
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {Map,List} from 'immutable';

const listofproductsondispatch = [];

  const initState = {
     listofproductsondispatch
  };

  function ProductReturnsmanageReducer(state = initState, action) {
    switch (action.type) {

         case 'PRODUCT_RETURN_MANAGE_SHOW':
            state=Map(state);
            var newtemplist=List(action.payload.productreturnslist.resultproductreturnslist);
            state=state.set('productreturnslist',newtemplist);
            return state;

     
      default:
        return state;
    }
  }


  export default ProductReturnsmanageReducer;

