import React, {Component} from 'react'
import {
	Layout,
	Page
} from '@shopify/polaris';
import RentalProductsCard from './landingPageProducts'
import DispatchCard from './landingPageDispatch'
import HoldsCard from './landingPageHolds'
import ReturnsCard from './landingPageReturns'



class landingPage extends Component {

	render () {
		return (
			<Page
				fullwidth
				title="Rentify Dashboard"
			>
				<Layout>
					<RentalProductsCard/>
					<DispatchCard/>
					<HoldsCard/>
					<ReturnsCard/>
				</Layout>
			</Page>
		)
	}
}

export default landingPage;