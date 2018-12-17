import React, {Component} from 'react'
import {
	Layout,
	Page,
	Card,
	DescriptionList,
	Button,
	Badge,
	Icon
} from '@shopify/polaris';

class returnsManagement extends Component {
	render () {
		return (
		<Page
			breadcrumbs={[{ content: "Rentify Home", url: "/landing" }]}
			title="Returns">
			<Layout>
			  <Layout.Section>
				<Card
				  title="Order details"
				  sectioned
				>
				{this.returnProductList()}
				</Card>
			  </Layout.Section>
			  <Layout.Section secondary>
				<Card
				  title="Tags"
				  sectioned
				>
				  <p>Add tags to your order.</p>
				</Card>
			  </Layout.Section>
			</Layout>
		</Page>
		);
	}

	returnProductList () {
		return (
			<DescriptionList
			  items={[
				{
				  term: 'Logistics',
				  description: <div><Badge>45</Badge><Button icon="circlePlus">Bellevue</Button></div>,

				},
				{
				  term: 'Sole proprietorship',
				  description: 'A business structure where a single individual both owns and runs the company.',
				},
				{
				  term: 'Discount code',
				  description: 'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
				},
			  ]}
			/>
		);
	}
}

export default returnsManagement;