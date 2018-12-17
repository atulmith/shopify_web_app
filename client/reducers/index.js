// import { combineReducers } from "redux";


import EmployeeformReducer from './employeeformReducer';
import {  routerReducer } from 'react-router-redux'
import {combineReducers} from 'redux-immutable';
import {persistReducer,persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import RentifyCallReducer from './rentifycallreducer';
import ProductmanageReducer from './productmanagereducer';
import ProductHoldmanageReducer from './productholdmanagereducer';
import ProductDispatchmanageReducer from './productdispatchmanagereducer';
import ProductReturnsmanageReducer from './productreturnsmanagereducer';

//config of redux-persist 
const persistConfig = {
    key: 'root',
    storage,
  };
// export default combineReducers(
//     {empform:EmployeeformReducer,
//      routing: routerReducer

//     }
// );
const combineReducersReal= combineReducers(
    {empform:EmployeeformReducer,
     callapi:RentifyCallReducer,   
     routing: routerReducer,
     productmanage:ProductmanageReducer,
     productholdmanage:ProductHoldmanageReducer,
     productdispatchmanage:ProductDispatchmanageReducer,
     productreturnsmanage:ProductReturnsmanageReducer
    }
);
  export default  persistReducer(persistConfig,  
                combineReducersReal);

