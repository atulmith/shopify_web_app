import React, { Component } from 'react';
import {
    FormLayout, TextField, Button,
    Icon, Select, TextStyle, Pagination,
    Page, Layout, Card, Thumbnail, ResourceList,Spinner
} from '@shopify/polaris';

import { ResourcePicker, Modal } from '@shopify/polaris/embedded';
import EditRentalProductPopup from './editrentalproductpopup';
import { List, Map } from 'immutable';



class ManageProductsComponent extends Component {


    constructor(props) {
        super(props);

        this.paramseditdetails = {
            active: false,
            rate: '$100',
            deposit: '$123',
            minrentalweeks: 1,
            maxrentalweeks: 5,
            isautorenewcharge: false,
        }

        this.state = { listofproducts: [], openpopup: false, editdetails: this.paramseditdetails, open: false };

        // const localrequestFields = {
        //     verb: 'GET',
        //     path: '/products.json'
        //   };
        //   this.props.updateVerb('GET');
        //   this.props.updatePath('/products.json');
        //   this.props.sendRequest(localrequestFields);
        //   this.loadProducts=this.loadProducts.bind(this);
        const localrequestFields = {
            verb: 'POST',
            path: '/redify_productmanage/getShopName',
            params: ''
        };
        this.props.updateVerb('POST');
        this.props.updatePath('/redify_productmanage/getShopName');
        this.props.productShowShopname(localrequestFields);




    }

    componentDidMount() {
        // var temp=this.props.productmanage.listofproducts;//resultproductlist

        // console.log("COMING FROM did mount ",temp);
        // if(temp){  
        //     this.setState({listofproducts:temp});

        // }
        this.props.callWSRetrieveProductList([]);

    }

    
    

    render() {
        //breadcrumbs={[{ content: "Rentify Home", url: 'https://' + window.location.hostname, }]}
        return (
            <Page

                fullWidth={true}
                breadcrumbs={[{ content: "Rentify Home", onAction: () => this.showHome() }]}
                title="Manage Rentify Products"
                primaryAction={
                    { content: 'Choose Products', onAction: () => this.showPopupOfProductsonClick() }
                }
                secondaryActions={[
                    { content: 'Add Products', url: '/admin/products/new' }
                ]}
            >
                <Layout fullWidth={false}>


                    <Layout.Section>
                        <Card>
                            {/* <Card.Section>
                                Shop Details {this.props.callapi.responseBody}
                            </Card.Section> */}
                            <Card.Section>
                                {this.showPopupOfProducts()}
                            </Card.Section>
                            <Card.Section>{this.searchField2()}</Card.Section>
                            <Card.Section>{this.productListResourceList()}</Card.Section>


                            <Card.Section>
                                 
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>

            </Page>
        );
    }

    showHome() {
        this.props.push('/dashboard');
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

    searchField2() {
        return (
            <FormLayout>
                <FormLayout.Group >
                    <TextField labelHidden label='Search Product..' placeholder='Search Product..' suffix={<Icon source="search" disabled />} />
                    {/* <Button onClick={()=>this.loadProducts()}>Search</Button> */}
                    {/* <Button onClick={()=>this.showPopupOfProductsonClick()}>Choose Products</Button> */}

                </FormLayout.Group>
            </FormLayout>
        );
    }

    thumbnailImage(obj) {
        if (obj) {
            if (obj.image) {
                return <Thumbnail source={obj.image.src} alt={obj.body_html} />;
            }
            else {
                return <div></div>;
            }
        }
    }

    showPopupOfProductsonClick() {
        //   alert("clciked add prodcuts");
        this.setState({ openpopup: true });
    }
    showPopupOfProducts() {

        return (
            <ResourcePicker
                products
                allowMultiple
                open={this.state.openpopup}
                onSelection={(resources) => {
                    console.log('Selected products: ', resources.products);
                    if (resources && resources.products) {
                        // this.setState({listofproducts:resources.products});
                        // this.props.productManageSave(resources.products);

                        const productlist = { productlist: resources.products };




                        this.props.callWSSaveProductList(productlist);
                    }
                    this.setState({ openpopup: false });
                }}
                onCancel={() => this.setState({ openpopup: false })}
            />
        );
    }

    loadProducts() {
        //   alert('hi load products called444');
        const serverresponse = this.props.callapi.responseBody;
        console.log("Result from server=", serverresponse);
        const objofproducts = JSON.parse(serverresponse);
        const listofproducts = objofproducts.products;
        if (serverresponse) {
            this.setState({ listofproducts: listofproducts });
        }

    }

    showEditPopup(id) {
        let temp1 = this.state.editdetails;
        temp1.active = true;
        this.setState({ editdetails: temp1 });
    }

    /**
     * Called by edittentalproductpopup.js to update the metafields of the product user is 
     * editing.
     * @param {*} objfrompopup 
     */
    updateProductDetails(objfrompopup) {
        console.log("POPUPREPLY", objfrompopup);
        // var arr=objfrompopup['rentify_metafields'];
        var sendobj=objfrompopup['rentify_metafields'];
        const productlistofmetafields = { productlistofmetafields: sendobj };
        this.props.callWSUpdateProductMetafields(productlistofmetafields);
        //   const prod=this.state.listofproducts.find(a=>a.id===productobj.id);
        //   prod=productobj;
    }

    productListBak() {



        var items = [
            { id: 1, title: 'Tale of Two cities', inventory: '45', rate: '4.99', deposit: '55' },
            { id: 2, title: 'Harry Potter', inventory: '25', rate: '3.99', deposit: '50' },
            { id: 3, title: 'The Da Vinci Code', inventory: '15', rate: '5.99', deposit: '75' },
            { id: 4, title: 'Dairy of the wimpy kid', inventory: '28', rate: '6.49', deposit: '65' },

        ];

        if (this.state.listofproducts.length > 0) {
            items = this.state.listofproducts;
        }

        const tableStyle = {
            width: '100%',

            'borderCollapse': 'collapse',

        };
        const tableItemStyle = {
            'borderBottom': '1px solid',
            'textAlign': 'left',
            padding: '8px',
        };
        const paginationStyle = {
            'textAlign': 'right'
        };
        const productList = items.map((item) =>
            <tr key={item.id}>

                <td style={tableItemStyle}>
                    <TextStyle>{item.title}</TextStyle>
                    {this.thumbnailImage(item)}
                    {/* <Button onClick={this.showEditPopup(item.id)}>EDIT</Button> */}
                    <EditRentalProductPopup callback={this.updateProductDetails} paramseditdetails={this.paramseditdetails}></EditRentalProductPopup>
                </td>
                <td style={tableItemStyle}>45</td>
                <td style={tableItemStyle}>$4.50</td>
                <td style={tableItemStyle}>$19</td>
            </tr>
        );


        return (

            <table style={tableStyle}>
                <tbody>
                    <tr>

                        <th style={tableItemStyle}><TextStyle>Product</TextStyle></th>
                        <th style={tableItemStyle}><TextStyle>Inventory</TextStyle></th>
                        <th style={tableItemStyle}><TextStyle>Weekly Rates</TextStyle></th>
                        <th style={tableItemStyle}><TextStyle>Deposit</TextStyle></th>

                    </tr>

                    {productList}
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={paginationStyle}>
                            <Pagination
                                hasPrevious
                                onPrevious={() => { }}
                                hasNext
                                onNext={() => { }}
                                plain={false}
                            />
                        </td>

                    </tr>
                </tbody>
            </table>

        );
    }

    /**
     * To render a ResourceList 
     * @param {To Show one row } item 
     * @param {the count of the row} index 
     */
    renderItem(item) {

        const { id, title, inventory, rate } = item;
        const prodimg = this.thumbnailImage(item);
        const param2 = this.paramseditdetails;
        const rentify_metafields_items=item['rentify_metafields'];

        if (id === 0) {
            return (

                <ResourceList.Item id={id} media={prodimg} accessibilityLabel={`View details for ${title}`}>

                    <table style={{ width: '100%' }} >
                        <tbody>
                        <tr>

                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Product</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Inventory</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Rate</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Deposit</TextStyle>
                            </td>
                            <td>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </ResourceList.Item>
            );
        }
        else {
            return (

                <ResourceList.Item id={id} media={prodimg} accessibilityLabel={`View details for ${title}`}>

                    <table style={{ width: '100%' }} >
                       <tbody>
                        <tr>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.title}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{rentify_metafields_items.rentify_inventory.value}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{rentify_metafields_items.rentify_rate.value}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.deposit}</TextStyle>
                            </td>
                            <td>
                                <EditRentalProductPopup typeofpopup={'manageproduct'} callback={(obj) => this.updateProductDetails(obj)} paramseditdetails={param2} item={item} callbackDelete={(id) => this.deleteProductDetails(id)}></EditRentalProductPopup>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </ResourceList.Item>
            );
        }
    }

    deleteProductDetails(id) {
      const producttodelete={productid:id};

      this.props.callWSDeleteFromProductList(producttodelete);
    }

    productListResourceList() {
        var listofproducts = [];
        const resourceName = {
            singular: 'product',
            plural: 'products',
        };

        const header = { id: 0, title: '', inventory: '', rate: '', deposit: '' };
        var items = [

            { id: 1, title: 'Tale of Two cities', inventory: '45', rate: '4.99', deposit: '55' },
            { id: 2, title: 'Harry Potter', inventory: '25', rate: '3.99', deposit: '50' },
            { id: 3, title: 'The Da Vinci Code', inventory: '15', rate: '5.99', deposit: '75' },
            { id: 4, title: 'Dairy of the wimpy kid', inventory: '28', rate: '6.49', deposit: '65' },

        ];

        // var maptemp=Map(this.props.productmanage);

        // // var temp=this.props.productmanage.listofproducts;//resultproductlist
        // // var temp=List(this.props.productmanage.listofproducts);
        // var temp=List(maptemp.get('listofproducts'));
        var temp = List(this.props.listofproductstoshow);
        console.log("COMING FROM SERVER productListResourceList ", temp);
  
 
        items = temp;

        listofproducts = items.map((item, index) => {
            const prodimg = this.thumbnailImage(item);
            const prodtitle = item.title;
            const id = item.id;
            
            item.inventory = '45';
            item.rate = '$5.99';
            item.deposit = '$19';


            var obj = {
                id: id,
                media: prodimg,
                attributeOne: <div style={{ width: '150px' }}>{prodtitle}</div>,
                attributeTwo:
                    <div >
                        <TextStyle variation="subdued">{item.inventory}</TextStyle>

                        {/* <table style={{width:'700px'}} >
                                    <tr>
                                        <td style={{textAlign:'center'}}>
                                <TextStyle variation="subdued">{item.inventory}</TextStyle>
                                        </td>
                                        <td style={{textAlign:'center'}}>
                                <TextStyle variation="subdued">{item.rate}</TextStyle>
                                         </td>
                                         <td style={{textAlign:'center'}}>   
                                <TextStyle variation="subdued">{item.deposit}</TextStyle>
                                           </td>
                                    </tr> 
                                </table> */}
                    </div>,

                actions: [{ content: <EditRentalProductPopup typeofpopup={'manageproduct'} callback={this.updateProductDetails} paramseditdetails={this.paramseditdetails}></EditRentalProductPopup> }],
                persistActions: false
            }

            return obj;
        });

        var obj1 = {
            id: '0',
            attributeOne: <div style={{ width: '150px' }}>Product</div>,
            attributeTwo: <div >
                <table style={{ width: '700px' }} >
                    <tr>
                        <td style={{ textAlign: 'center' }}>
                            <TextStyle variation="strong">Inventory</TextStyle>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <TextStyle variation="subdued">Weekly Rates</TextStyle>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                            <TextStyle variation="subdued">Deposit</TextStyle>
                        </td>
                    </tr>
                </table>
            </div>,
        };

        listofproducts = [obj1, ...listofproducts];

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

    showProductDetailsModal(){
        const showLoading=(<Spinner size="large" color="teal" />);

        // return(
        //     <Modal
        //     open={active}
        //     onClose={this.handleClose}
        //     title="Export customers"
        //     primaryAction={{
        //       content: 'Export customers',
        //       onAction: this.handleClose,
        //     }}
        //     secondaryActions={[
        //       {
        //         content: 'Cancel',
        //         onAction: this.handleClose,
        //       },
        //     ]}
        //   >
        //     <Modal.Section>
                
        //     </Modal.Section>
        //   </Modal>
        // )
    }

}

export default ManageProductsComponent;