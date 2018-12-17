import React, { Component } from 'react';
import {DescriptionList,Layout,Card,Badge,Page} from '@shopify/polaris';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};

       
    }

    componentDidMount(){
     }

    render() {
        return (
            <div>
                 <Page
		            
                    title="Rentify/ Dashboard">
                <Layout fullWidth={true}>
                    <Layout.Section>
                    <Card
                        title="Rental Products"
                        primaryFooterAction={{
                            content: 'Manage',
                            onAction: ()=>{this.props.push('/manageproducts')},
                            
                        }}
                    >
                        <Card.Section>
                            <p><Badge status="attention">468</Badge> products are being rented out from your store</p>
                        </Card.Section>
                    </Card>
                </Layout.Section>	
                
                <Layout.Section>
                    <Card
                        title="Dispatch"
                        primaryFooterAction={{
                            content: 'Process',
                            onAction: ()=>{this.props.push('/dispatchproduct')},
                            
                        }}
                    >
                        <Card.Section>
                            <p><Badge status="info">56</Badge> Orders are ready for dispatch</p>
                        </Card.Section>
                    </Card>
                </Layout.Section>	
                
                <Layout.Section>
                    <Card
                        title="Holds"
                        primaryFooterAction={{
                            content: 'View',
                            onAction: ()=>{this.props.push('/manageholdlist')},
                            
                            
                        }}
                    >
                        <Card.Section>
                            <p><Badge status="info">127</Badge> Products on hold</p>
                        </Card.Section>
                    </Card>
                </Layout.Section>	
                <Layout.Section>
                    <Card
                        title="Returns"
                        primaryFooterAction={{
                            content: 'Checkin Returns',
                            onAction: ()=>{this.props.push('/returnsproduct')},
                            
                        }}
                    >
                        <Card.Section>
                            <p><Badge status="info">63</Badge> Products awaiting returns</p>
                        </Card.Section>
                    </Card>
                </Layout.Section>	
                <Layout.Section>
                    <Card
                        title="Settings"
                        primaryFooterAction={{
                            content: 'Edit',
                            // onAction: this.toggleProducts.bind(this, this.productState),
                            
                        }}
                    >
                        <Card.Section>
                            <p> Store settings</p>
                        </Card.Section>
                    </Card>
                </Layout.Section>	
                
             </Layout>   
             </Page>
            </div>
        );
    }

    
}



export default DashboardComponent;