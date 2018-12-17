
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {Map,List} from 'immutable';

const listofproductsonhold = [];

  const initState = {
     listofproductsonhold
  };

  function ProductHoldmanageReducer(state = initState, action) {
    switch (action.type) {

         case 'PRODUCT_HOLD_MANAGE_SHOW':
            state=Map(state);
            var newtemplist=List(action.payload.productholdlist.resultproductholdlist);
            state=state.set('productholdlist',newtemplist);
            return state;

     
      default:
        return state;
    }
  }


  export default ProductHoldmanageReducer;

