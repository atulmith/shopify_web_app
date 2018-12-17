
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {Map,List} from 'immutable';

const listofproducts = [];

  const initState = {
     listofproducts
  };

  function ProductmanageReducer(state = initState, action) {
    switch (action.type) {

      case 'PRODUCT_MANAGE_SAVE':
        
             
            state=Map(state);
            var listofproducts=List(state.get('listofproducts'));
            var newtemplist=List(action.payload.productlist.resultproductlist);
            console.log("reducer newtemplist",newtemplist);
            var newlist=newtemplist.filter(a=>{
              return listofproducts.find(b=>b.id===a.id)==null?true:false;
            });
            console.log("reducer newlist",newlist);
            listofproducts=listofproducts.concat(newlist);
            // listofproducts=listofproducts.push(action.payload); 
            state=state.set('listofproducts',listofproducts);
            return state;
        
        case 'SHOW_SHOP_NAME':
            state=Map(state);
            state=state.set("shopname",action.payload.shopname);


            return state;
        case 'PRODUCT_MANAGE_SHOW':
            state=Map(state);
            var newtemplist=List(action.payload.productlist.resultproductlist);
            state=state.set('listofproducts',newtemplist);
            return state;

      // case 'REQUEST_COMPLETE':
      //   return {
      //     ...state,
      //     requestError: null,
      //     requestInProgress: false,
      //     responseBody: action.payload.responseBody
      //   };
      default:
        return state;
    }
  }


  export default ProductmanageReducer;

