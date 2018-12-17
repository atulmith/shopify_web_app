import React, { Component } from "react";
import {
  Page,
  Layout,
  Card,
  Tabs,
  FormLayout,
  TextField,
  Select,
  ResourceList,
  TextStyle,
  Checkbox,
  Pagination,
  Icon
} from "@shopify/polaris";

class holdsManagement extends Component {
  render() {
    return (

      <Page
		fullWidth={true}
        breadcrumbs={[{ content: "Rentify Home", url: "/landing" }]}
        title="Products Holds"
        primaryAction={{
          content: "Hold Products",
		  url: '/chooseproduct',
        }}
		secondaryActions={[
		{
          content: "Something Products",
		  url: '/addproduct',
		}
		]}
      >
	   <Layout fullWidth={true}>
	    <Layout.Section>
        <Card>
          {this.tabMenu()}
          <Card.Section>{this.searchField()}</Card.Section>
		  	<Pagination
			  hasPrevious
			  onPrevious={() => {}}
			  hasNext
			  onNext={() => {}}
		  />
		  <Card.Section>{this.productListBak()}</Card.Section>
        </Card>
	   </Layout.Section>
	   </Layout>
	  </Page>

    );
  }

  searchField() {
    return (
      <FormLayout>
        <TextField
          placeholder="Search"
          prefix={<Icon source="search" disabled />}
          connectedLeft={
            <Select
              label="Unit of time"
              labelHidden
              options={["Filter Products"]}
            />
          }
        />
      </FormLayout>
    );
  }

  tabMenu() {
    return (
      <Tabs
        selected={0}
        tabs={[
          {
            id: "all-products",
            content: "All",
            accessibilityLabel: "All products",
            panelID: "all-products-content"
          },
          {
            id: "new-arrivals",
            content: "New",
            panelID: "new-arrivals-content"
          },
          {
            id: "repeat-customers",
            content: "Most",
            panelID: "repeat-customers-content"
          },
          {
            id: "prospects",
            content: "Something else",
            panelID: "prospects-content"
          }
        ]}
      />
    );
  }


  productList () {
    return (
			<ResourceList
			  items={[
				{
				  url: '#',
				  attributeOne: 'How to Get Value from Wireframes',
				  attributeTwo: 'by Jonathan Mangrove',
				  attributeThree: <TextStyle variation="subdued">Today, 7:14pm</TextStyle>,
				},
				{
				  url: '#',
				  attributeOne: 'Test blog post',
				  attributeTwo: 'by Jonathan Mangrove',
				  attributeThree: <TextStyle variation="subdued">Jan 14, 2016, 8:24am</TextStyle>,
				  badges: [{content: 'Hidden'}],
				},
			  ]}
			  renderItem={() => {}}
			/>
    );
  }
  productListBak () {
	  const items = [
		  {id: 1, name: 'Call of Duty', inventory: '45', rate: '4.99', deposit: '55'},
		  {id: 2, name: 'War Craft', inventory: '25', rate: '3.99', deposit: '50'},
		  {id: 3, name: 'Halo 2', inventory: '15', rate: '5.99', deposit: '75'},
		  {id: 4, name: 'Assasins Creed', inventory: '28', rate: '6.49', deposit: '65'},
		  {id: 5, name: 'Minecraft', inventory: '34', rate: '2.99', deposit: '45'},
		  {id: 6, name: 'Fifa 2018', inventory: '22', rate: '3.49', deposit: '53'},
		  {id: 7, name: 'Mario Cart', inventory: '45', rate: '4.29', deposit: '45'},
	  ];
	  const tableStyle = {
		width: '100%',
		'border-collapse': 'collapse',

	  };
	  const tableItemStyle = {
		  'border-bottom': '1px solid',
		  'text-align': 'left',
		  padding: '8px',
	  };
	  const productList = items.map((item) =>
		<tr key={item.id}>
			<td style={tableItemStyle}><Checkbox/></td>
			<td style={tableItemStyle}><TextStyle>{item.name}</TextStyle></td>
			<td style={tableItemStyle}><TextStyle>{item.inventory}</TextStyle></td>
			<td style={tableItemStyle}><TextStyle>$ {item.rate}</TextStyle></td>
			<td style={tableItemStyle}><TextStyle>$ {item.deposit}</TextStyle></td>
		</tr>
	  );


	  return (

		<table style={tableStyle}>
			<tr>
				<th style={tableItemStyle}><Checkbox /></th>
				<th style={tableItemStyle}><TextStyle>Name</TextStyle></th>
				<th style={tableItemStyle}><TextStyle>Inventory</TextStyle></th>
				<th style={tableItemStyle}><TextStyle>Weekly Rates</TextStyle></th>
				<th style={tableItemStyle}><TextStyle>Deposit</TextStyle></th>
			</tr>
			<tbody>
			{productList}
			</tbody>
		</table>

	  );
  }
}

export default holdsManagement;
