import React, { Component } from 'react'
import {
	Page,
	Layout,
	Card
} from "@shopify/polaris"

class addProduct extends Component {
	render () {
		return (
			<Page
				breadcrumbs={[{ content: "Add Products", url: "/manageRentalProducts"}]}
				title="Add Rental Product"
				fullWidth={true}
			>
				<Layout>
				  <Layout.Section>
					{this.addProductPrimaryColumn()}
				  </Layout.Section>
				  <Layout.Section secondary>
					{this.addProductSecondaryColumn()}
				  </Layout.Section>
				</Layout>
			</Page>
		);
	}

	addProductPrimaryColumn () {
		return (
			<Card
			  title="Page Placeholder"
			  sectioned
			>
			  <p>This page should be redirected to Shopify's Product List Page</p>
			</Card>
		);
	}

	addProductSecondaryColumn () {
		return (
			<Card
			  title="None"
			  sectioned
			>
			  <p>Not Applicable</p>
			</Card>
		);
	}

}

export default addProduct;