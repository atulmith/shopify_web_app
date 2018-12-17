import { createStore,applyMiddleware } from "redux";
import rootReducer from '../reducers/index';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable';
import {routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import history from './myhistory';

import {persistReducer,persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import {persistStore} from 'redux-persist-immutable';

// //config of redux-persist 
const persistConfig = {
    key: 'root',
    storage,
  };
persistConfig.debug=true;

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const initialState = Immutable.Map();
// const browserhistory=createHistory();
const routermiddleware=routerMiddleware(history);

const store=createStore(rootReducer,
//  const store=createStore(persistedReducer,    
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware,routermiddleware,promiseMiddleware()));
    
 export const persistor = persistStore(store);

 export default store;

//  export default () =>  {
//     return {store ,persistor}
//  };
 
