import React, {Component} from 'react'
import {
	Layout,
	Card,
	Badge
} from '@shopify/polaris';

class DispatchCard extends Component {
	/* Variables in this component */
	constructor(props) {
		super(props);
		this.state = {
			dispatchState: false,
		};
	}
	
	/* Card that shows state of Product Management */
	render () {
		return this.state.dispatchState 
		? this.dispatchNotEmpty()
		:this.dispatchEmpty();
	}
	
	toggleProducts(){
		this.setState(({dispatchState}) => ({dispatchState: !dispatchState}));
	}
	dispatchEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Dispatch"
					primaryFooterAction={{
						content: 'Add Orders',
						/* onAction: this.toggleProducts.bind(this, this.productState), */
						url: '/topics',
					}}
				>
					<Card.Section>
						<p><Badge>No</Badge> orders for dispatch from your store</p>
					</Card.Section>
				</Card>
			 </Layout.Section>			
		);
	}
	dispatchNotEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Dispatch"
					secondaryFooterAction={{
						content: 'Dispatch Products',
						onAction: this.toggleProducts.bind(this, this.productState),
					}}
				>
					<Card.Section>
						<p><Badge>32</Badge> products needs dispatch from your store</p>
					</Card.Section>
				</Card>
			 </Layout.Section>
		);
	}	
}

export default DispatchCard;