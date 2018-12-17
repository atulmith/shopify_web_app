import React, { Component } from 'react'
import  { FormLayout, TextField, Button, Icon,
    Badge,
     Select, TextStyle, Pagination, Page, Layout, Card,ResourceList } from '@shopify/polaris';
import {ResourcePicker} from '@shopify/polaris/embedded';

class ManageproductholdslistComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.props.callWSRetrievePoductHoldList();
    }

  render() {
    return  (
        
        <Page
		fullWidth={true}
        breadcrumbs={[{ content: "Rentify Home", onAction: ()=>this.showHome() }]}
        title="Manage Rentify Holds">
                <Layout fullWidth={true}>
                
                
                    <Layout.Section>
                        <Card>
                            <Card.Section></Card.Section>    
                            
                            <Card.Section>{this.productListResourceList()}</Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        
    );
  }

  showHome(){
    this.props.push('/dashboard');
  }
    productListBak () {
        var items = [
            {id: 1, name: 'Tale of Two cities', inventory: '45', rate: '4.99', deposit: '55'},
            {id: 2, name: 'Harry Potter', inventory: '25', rate: '3.99', deposit: '50'},
            {id: 3, name: 'The Da Vinci Code', inventory: '15', rate: '5.99', deposit: '75'},
            {id: 4, name: 'Dairy of the wimpy kid', inventory: '28', rate: '6.49', deposit: '65'},
            
        ];

        items=this.props.listofproductsholdtoshow;


        const tableStyle = {
        width: '100%',
        'borderCollapse': 'collapse',
            
        };
        const tableItemStyle = {
            'borderBottom': '1px solid',
            'textAlign': 'left',
            padding: '8px',
        };
        const paginationStyle={
            'textAlign':'right'
        };
        const productList = items.map((item) =>
        <tr key={item.productid}>
            
            <td style={tableItemStyle}><TextStyle>{item.productname}</TextStyle></td>
            <td style={tableItemStyle}>
                {/* <Badge >{item.deposit}</Badge> */}
                <Badge >{item.noofholds} copies</Badge>
            </td>
            <td style={tableItemStyle}><Button>Manage Holds</Button></td>
            
        </tr>
        );


        return (

        <table style={tableStyle}>
            <tbody>
            <tr>
                
                <th style={tableItemStyle}><TextStyle>Name</TextStyle></th>
                <th style={tableItemStyle}><TextStyle>Inventory</TextStyle></th>
                <th style={tableItemStyle}><TextStyle>Action</TextStyle></th>
                
            </tr>
            
                {productList}
                <tr>
                    <td></td>
                    <td></td>
                    <td  style={paginationStyle}>
                    <Pagination
                        hasPrevious
                        onPrevious={() => {}}
                        hasNext
                        onNext={() => {}}
                        plain={false}
                        />
                    </td>

                </tr>
            </tbody>
        </table>

        );
    }

    productListResourceList() {
        
        const resourceName = {
            singular: 'producthold',
            plural: 'productsheld',
        };

        const header = { productid: 0, productname: '', noofholds: '', rate: '', deposit: '' };
        var items = [ ];

        // var temp = List(this.props.listofproductstoshow);
        var temp = this.props.listofproductsholdtoshow;
        console.log("COMING FROM SERVER productHOLDListResourceList ", temp);
  
        items = temp;
        items.map((item, index) => {
            // const prodimg = this.thumbnailImage(item);
            
            item.rate = '$5.99';
            item.deposit = '$19';
        });

  
        items = [header, ...items];

        return (
            <Card>
                <ResourceList
                    resourceName={resourceName}
                    items={items}
                    renderItem={this.renderItem.bind(this)}


                />
            </Card>
        );
    }

    /**
     * To render a ResourceList 
     * @param {To Show one row } item 
     * @param {the count of the row} index 
     */
    renderItem(item) {

        const { productid, productname,noofholds, rate, deposit } = item;
        const prodimg = null;//this.thumbnailImage(item);
        // const param2 = this.paramseditdetails;
        const rentify_metafields_items=item['rentify_metafields'];
        if (productid === 0) {
            return (

                <ResourceList.Item id={productid} media={prodimg} accessibilityLabel={`View details for ${productname}`}>

                    <table style={{ width: '100%' }} >
                        <tr>

                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Product Name</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Holds</TextStyle>
                            </td>
                            {/* <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Rate</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Deposit</TextStyle>
                            </td>
                            <td>

                            </td> */}
                        </tr>
                    </table>
                </ResourceList.Item>
            );
        }
        else {
            return (

                <ResourceList.Item id={productid} media={prodimg} accessibilityLabel={`View details for ${productname}`}>

                    <table style={{ width: '100%' }} >
                        <tr>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.productname}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                {/* <TextStyle variation="subdued">{item.noofholds}</TextStyle> */}
                                <Badge >{item.noofholds} copies</Badge>
                            </td>
                            {/* <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{rentify_metafields_items.rentify_rate.value}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.deposit}</TextStyle>
                            </td>
                            <td>
                                <Button icon="notes">Manage Holds </Button>
                            </td> */}
                        </tr>
                    </table>
                </ResourceList.Item>
            );
        }
    }
}

export default ManageproductholdslistComponent;
