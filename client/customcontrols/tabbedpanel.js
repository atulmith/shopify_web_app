import React, { Component } from 'react';
import { Tabs,Layout,Card } from '@shopify/polaris';

// import landingPage from '../landingPage';
import manageRentalProducts from '../manageRentalProducts'
// import addProduct from '../addProduct'
// import returnsManagement from '../returns'
// import chooseProduct from '../chooseProduct'
// import holdsManagement from '../holdsManagement'

import DashboardComponent from '../components/dashboard';

class TabbedPanelCustomControl extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedTab: 0 };
        this.tabbedPanel = this.tabbedPanel.bind(this);
        this.handleTabChange=this.handleTabChange.bind(this);
        // this.handleTabChange(0);
    
     this.tabs = [
        {
            id: 'dashboard',
            content: 'Dashboard',
            // accessibilityLabel: 'Dashboard',
            // panelID: 'panel-dashboard',
        },
        {
            id: 'manageproducts',
            content: 'Manage Products',
            // panelID: 'panel-manageproducts',
        },
        {
            id: 'holds',
            content: 'Holds',
            // panelID: 'panel-holds',
        },
        {
            id: 'returns',
            content: 'Returns',
            // panelID: 'panel-returns',
        },
        {
            id: 'userqueue',
            content: 'User Queue',
            // panelID: 'panel-userqueue',
        },
        {
            id: 'settings',
            content: 'Settings',
            // panelID: 'panel-settings',
        }
    ];
    }
    // tabPanels = [
    //     (
    //         <Tabs.Panel id="panel-dashboard">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     ),
    //     (
    //         <Tabs.Panel id="panel-manageproducts">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     ),
    //     (
    //         <Tabs.Panel id="panel-manageproducts2">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     ),
    //     (
    //         <Tabs.Panel id="panel-manageproducts3">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     ),
    //     (
    //         <Tabs.Panel id="panel-manageproducts4">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     ),
    //     (
    //         <Tabs.Panel id="panel-manageproducts5">
    //             {DashboardComponent}
    //         </Tabs.Panel>
    //     )
    // ];

    componentDidMount(){
        this.handleTabChange(0);
    }

    tabbedPanel() {
        const { selectedTab } = this.state;
        // alert("tabbedPanel" + JSON.stringify(selectedTab));
        return (<div >
             
            <Tabs
                selected={selectedTab}
                tabs={this.tabs}
                onSelect={this.handleTabChange}
                
            />
            {/* {this.tabPanels[0]} */}
        </div>
        )
    };

    handleTabChange(selectedTab) {
        this.setState({ selectedTab });
        switch (selectedTab) {
            case 0:
            this.props.push('/');
                break;
            case 1:
                this.props.push('/manageproducts');
                break;
            case 2:
                this.props.push('/manageholdlist');
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                
                {/* {this.tabbedPanel()} */}
                {/* {this.props.children} */}
            </div>
        );
    }
}

export default TabbedPanelCustomControl;