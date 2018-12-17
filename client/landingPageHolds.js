import React, {Component} from 'react'
import {
	Layout,
	Card,
	Badge
} from '@shopify/polaris';

class HoldsCard extends Component {
	/* Variables in this component */
	constructor(props) {
		super(props);
		this.state = {
			holdsState: false,
		};
	}

	/* Card that shows state of Product Management */
	render () {
		return this.state.holdsState
		? this.holdsNotEmpty()
		:this.holdsEmpty();
	}

	toggleProducts(){
		this.setState(({holdsState}) => ({holdsState: !holdsState}));
	}
	holdsEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Holds"
					primaryFooterAction={{
						content: 'Add Orders',
						/* onAction: this.toggleProducts.bind(this, this.productState), */
						url: '/holdsmanagement',
					}}
				>
					<Card.Section>
						<p><Badge>No</Badge> orders for dispatch from your store</p>
					</Card.Section>
				</Card>
			 </Layout.Section>
		);
	}
	holdsNotEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Holds"
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

export default HoldsCard;