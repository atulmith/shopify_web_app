import React, { Component } from 'react'
import {
	Page,
	Layout,
	Card
} from "@shopify/polaris"

class chooseProduct extends Component {
	render () {
		return (
			<Page
				breadcrumbs={[{ content: "Rental Products", url: "/manageRentalProducts"}]}
				title="Choose Rental Products"
				fullWidth={false}
			>
				<Layout>
				  <Layout.Section>
					{this.primaryColumn()}
				  </Layout.Section>
				  <Layout.Section secondary>
					{this.secondaryColumn()}
				  </Layout.Section>
				</Layout>
			</Page>
		);
	}

	primaryColumn () {
		return (
			<Card
			  title="Order details"
			  sectioned
			>
			  <a href="https://polaris.shopify.com/components/embedded/embedded-resource-picker#navigation">
				<p> Using Embedded Resource Picker reactjs component, this becomes much easier</p>
			  </a>
			  <p>The product picker should list products that are not already in the rental product list and allow store owener to select multiple products to be added to rentals</p> 
			</Card>
		);
	}

	secondaryColumn () {
		return (
			<Card
			  title="Tags"
			  sectioned
			>
			  <p>Add tags to your order.</p>
			</Card>
		);
	}

}

export default chooseProduct;