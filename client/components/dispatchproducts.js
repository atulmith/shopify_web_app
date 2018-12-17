import React, { Component } from 'react';
import {FormLayout,TextField,Button,
    Icon,Select,TextStyle,Pagination,
    Page,Layout,Card,Thumbnail,ResourceList} from '@shopify/polaris';

import {ResourcePicker} from '@shopify/polaris/embedded';
import EditRentalProductPopup from './editrentalproductpopup';



class DispatchProductsComponent extends Component {
    constructor(props) {
        super(props);
        
        this.paramseditdetails={
            active:false,
            location:'Hold Shelf',
            deposit:'$123',
            // minrentalweeks:1,
            // maxrentalweeks:5,
            // isautorenewcharge:false,
        }

        this.state = {listofproducts:[],openpopup:false,editdetails:this.paramseditdetails,open:false};

        // const localrequestFields = {
        //     verb: 'GET',
        //     path: '/products.json'
        //   };
        //   this.props.updateVerb('GET');
        //   this.props.updatePath('/products.json');
        //   this.props.sendRequest(localrequestFields);
        //   this.loadProducts=this.loadProducts.bind(this);
        
        
    }

    componentDidMount(){
        var temp=this.props.productmanage.listofproducts;
        if(temp){  
            this.setState({listofproducts:temp});
            
        }
        this.props.callWSRetrievePoductDispatchList();

    }

    render() {
        //breadcrumbs={[{ content: "Rentify Home", url: 'https://' + window.location.hostname, }]}
        return (
            <Page
            
		fullWidth={true}
        breadcrumbs={[{ content: "Rentify Home", onAction: ()=>this.showHome() }]}
        title="Disptach Rentify Products"
        // primaryAction={
        //     {content:'Choose Products',onAction: ()=>this.showPopupOfProductsonClick()}
        // }
        // secondaryActions={[
        //     {content : 'Add Products',url:'/admin/products/new'}
        // ]}
        >
                <Layout fullWidth={false}>
                
                
                    <Layout.Section>
                        <Card>
                            
                            <Card.Section>
                                {this.showPopupOfProducts()}  
                            </Card.Section>    
                            <Card.Section>{this.searchField2()}</Card.Section>
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

    /**
     * @deprecated
     */
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

      searchField2(){
          return (
            <FormLayout>
                <FormLayout.Group >
                        <TextField labelHidden label='Search Product' placeholder='Search Product' suffix={<Icon source="search" disabled />}/>
                        {/* <Button onClick={()=>this.loadProducts()}>Search</Button> */}
                        {/* <Button onClick={()=>this.showPopupOfProductsonClick()}>Choose Products</Button> */}
                         
                </FormLayout.Group>
            </FormLayout>
          );
      }

      /**
       * To show the thumbnail of the product in the resourcelist.
       * @param {*} obj 
       */
      thumbnailImage(obj){
          if(obj){
              if(obj.image){
                 return <Thumbnail source={obj.image.src}  alt={obj.body_html} />;
              }
              else{
                  return <div></div>;
              }
          }
      }

      /**
       * To Open Resourcepicker
       * @deprecated
       */
      showPopupOfProductsonClick(){
        //   alert("clciked add prodcuts");
          this.setState({openpopup:true});
      }
      /**
       * To add product from Shopify Catalog.
       * @deprecated
       */
      showPopupOfProducts(){

        return (
            <ResourcePicker
                products
                allowMultiple
                open={this.state.openpopup}
                onSelection={(resources) => {
                    console.log('Selected products: ', resources.products);
                    if(resources && resources.products){
                        this.setState({listofproducts:resources.products});
                        this.props.productManageSave(resources.products);
                    }
                    this.setState({openpopup: false});
                }}
                onCancel={() => this.setState({openpopup: false})}
                />
        );
      }

    //   loadProducts(){
    //     //   alert('hi load products called444');
    //     const serverresponse=this.props.callapi.responseBody;
    //     console.log("Result from server=",serverresponse);
    //     const objofproducts=JSON.parse(serverresponse);
    //     const listofproducts=objofproducts.products;
    //     if(serverresponse){
    //         this.setState({listofproducts:listofproducts});
    //     }
        
    //   }

 
 


    /**
     * To show the list of products ready for dispatch.
     * Which user can click for checkout.
     */
    productListResourceList(){
        const resourceName = {
            singular: 'productdispatch',
            plural: 'productsdispatched',
        };

        const header = { customerid: 0, productname: '', customername: '', location: '', deposit: '' };
        var items = [ ];

        // var temp = List(this.props.listofproductstoshow);
        var temp = this.props.listofproductsdispatchtoshow;
        console.log("COMING FROM SERVER productDISPATCHListResourceList ", temp);
  
        items = temp;
        items.map((item, index) => {
            // const prodimg = this.thumbnailImage(item);
            
            item.deposit = '$5.99';
            item.location = 'Hold Shelf';
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
    renderItem (item, index) {
        const { customerid, productname,customername, location, deposit } = item;
        const prodimg = null;//this.thumbnailImage(item);
        // const param2 = this.paramseditdetails;
        if (customerid === 0) {
            return (

                <ResourceList.Item id={customerid} media={prodimg} accessibilityLabel={`View details for ${productname}`}>

                    <table style={{ width: '100%' }} >
                        <tr>

                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Customer Name</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Products Name</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="strong">Hold Days</TextStyle>
                            </td>
                             <td>

                            </td>
                        </tr>
                    </table>
                </ResourceList.Item>
            );
        }
        else {
            return (

                <ResourceList.Item id={customerid} media={prodimg} accessibilityLabel={`View details for ${productname}`}>

                    <table style={{ width: '100%' }} >
                        <tr>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.customername}</TextStyle>
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.productname}</TextStyle>
                                {/* <Badge >{item.noofholds} copies</Badge> */}
                                {/* <Button>Checkout</Button> */}
                            </td>
                            <td style={{ textAlign: 'center', width: '200px' }}>
                                <TextStyle variation="subdued">{item.noofdays}</TextStyle>
                            </td>
                             <td>
                                <Button onClick={()=>this.checkoutDispatchonClick(item)}  icon='view'>Checkout</Button>
                            </td>
                        </tr>
                    </table>
                </ResourceList.Item>
            );
        }
      }

      /**
       * OnClick event handler when user clicks the Dispatch Checkout Button.
       * @param {*} obj 
       */
      checkoutDispatchonClick(obj){
        var productid=obj.productid;
        var custid=obj.customerid;

        var paramobj={productid:productid,custid:custid};
        this.props.callWSCheckoutDispatchlist(paramobj);
        

      }
}

export default DispatchProductsComponent;