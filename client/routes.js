import React from 'react'
import {
	// BrowserRouter as Router,
	Route
} from 'react-router-dom'
import samplePage from './App'
import landingPage from './landingPage'
import manageRentalProducts from './manageRentalProducts'
import addProduct from './addProduct'
import returnsManagement from './returns'
import chooseProduct from './chooseProduct'
import holdsManagement from './holdsManagement'

import DashboardComponent from './components/dashboard';
import TabbedPanelCustomControl from './customcontrols/tabbedpanel';
import ManageProductsComponent from './components/manageproducts';
import Manageproductholdslist from './components/manageproductholdslist';

import createHistory from 'history/createBrowserHistory';
import {  routerReducer,ConnectedRouter as Router  }  from 'react-router-redux';
import history from './store/myhistory';

import TabbedpanelContainer from './containers/tabbedpanel_container';
import ManageProductsContainer from './containers/manageproducts_container';
import ManageproductholdslistContainer from './containers/manageproductholdslist_container';


// import {EmbeddedApp} from '@shopify/polaris/embedded';

import DashboardContainer from './containers/dashboard_container';
import EditRentalProductPopup from './components/editrentalproductpopup';
import DispatchProductsContainer from './containers/dispatchproducts_container';
import ReturnsProductsContainer from './containers/returnsproducts_container';


import {
	Heading,
	Subheading,
	TextContainer,
	DisplayText,
	Icon,
	Tabs,
	AppProvider
} from '@shopify/polaris';


const RentifyApp = () => {
	
	const { apiKey, shopOrigin } = window;

	// alert("apikey"+apiKey+"shopOrgin"+shopOrigin);
	return (
		
		
	// <EmbeddedApp shopOrigin={shopOrigin} apiKey={apiKey}>
	<AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
		<Router history={history}>
			<div>
				{/* {layoutHeader()} */}
					{/* {layoutNav()} */}
					
				<article>
					{/* <TabbedpanelContainer /> */}
					<Route  path="/" component={TabbedpanelContainer}/>
					<Route exact path="/" component={DashboardContainer}/>
					<Route exact path="/dashboard" component={DashboardContainer}/>
					<Route exact path="/manageproducts" component={ManageProductsContainer}/>
					<Route exact path="/manageholdlist" component={ManageproductholdslistContainer}/>
					<Route exact path="/producteditpopup" component={EditRentalProductPopup}/>
					<Route exact path="/dispatchproduct" component={DispatchProductsContainer}/>
					<Route exact path="/returnsproduct" component={ReturnsProductsContainer}/>
					
					
					
					<Route exact path="/sample" component={samplePage}/>
					<Route exact path="/landing" component={landingPage}/>
					<Route exact path="/topics" component={Topics}/>
					<Route exact path="/managerentalproducts" component={manageRentalProducts}/>
					<Route exact path="/addproduct" component={addProduct}/>
					<Route exact path="/returns" component={returnsManagement}/>
					<Route exact path="/chooseproduct" component={chooseProduct}/>
					<Route exact path="/holdsmanagement" component={holdsManagement}/>
					
				</article>
				{/* {layoutFooter()} */}
				
			</div>
		</Router>
	 </AppProvider>
	);
}

const layoutFooter= ()=>{
	
	return <footer>Footer</footer>;
}
 
const Topics = () => {
	return <div>
		<h2>Topics</h2>
	</div>;
}

const layoutHeader = () => {
	return 	<div>
				<header>
					<DisplayText>Shopify RentifyApp</DisplayText>
				</header>
				
			</div>;
}

const layoutNav = () => {
	return 	<nav>
				<ul><TextContainer spacing="loose">
				<li><Heading>Home</Heading></li>
					<li><Subheading>Orders</Subheading></li>
					<li><Heading>Products</Heading></li>
					<li><Heading>Customers</Heading></li>
					<li><Heading>Analytics</Heading></li>
					<li><Heading>Discounts</Heading></li>
					<li><Heading>Apps</Heading></li>
				</TextContainer></ul>
			</nav>;
}
 
 


export default RentifyApp;