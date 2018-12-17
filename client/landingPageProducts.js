import React, {Component} from 'react'
import {
	Layout,
	Card,
	Badge
} from '@shopify/polaris';

class RentalProductsCard extends Component {
	/* Variables in this component */
	constructor(props) {
		super(props);
		this.state = {
			productState: false,
		};
	}
	
	/* Card that shows state of Product Management */
	render () {
		return this.state.productState 
		? this.rentalProductsNotEmpty()
		:this.rentalProductsEmpty();
	}
	
	toggleProducts(){
		this.setState(({productState}) => ({productState: !productState}));
	}
	rentalProductsEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Rental Products"
					primaryFooterAction={{
						content: 'Add Rental Products',
						onAction: this.toggleProducts.bind(this, this.productState),
						
					}}
				>
					<Card.Section>
						<p><Badge>No</Badge> products are being rented out from your store</p>
					</Card.Section>
				</Card>
			 </Layout.Section>			
		);
	}
	rentalProductsNotEmpty () {
		return (
			 <Layout.Section>
				<Card
					title="Rental Products"
					secondaryFooterAction={{
						content: 'Manage Rental Products',
						//onAction: this.toggleProducts.bind(this, this.productState),
						url: '/managerentalproducts'
					}}
				>
					<Card.Section>
						<p><Badge>468</Badge> products being rented out from your store</p>
					</Card.Section>
				</Card>
			 </Layout.Section>
		);
	}	
}

export default RentalProductsCard;