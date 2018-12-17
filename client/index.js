import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import RentifyApp from './routes';
import '@shopify/polaris/styles.css';
import registerServiceWorker from './registerServiceWorker';
// import './rentify.css';
import { Provider } from 'react-redux';
import store,{persistor} from './store/index';

import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist-immutable';
// ReactDOM.render(<App />, document.getElementById('root'));
// const {store,persistor}=configureStore();
import {Spinner} from '@shopify/polaris';
import {AppProvider as PolarisProvider} from '@shopify/polaris';


// const persistor2 = persistStore(store);

ReactDOM.render((
		<PolarisProvider>
			<Provider store={store}>
				{/* <PersistGate 
						loading={<Spinner size="large" color="teal" />}
						persistor={persistor}> */}
					<RentifyApp></RentifyApp>
				{/* </PersistGate> */}
			</Provider>
		</PolarisProvider>
	), document.getElementById('root'));

registerServiceWorker();
