import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ManageProductsComponent from '../components/manageproducts';
import {sendRequest,updatePath,updateVerb,
        productManageSave,productShowShopname,
        callWSSaveProductList,callWSRetrieveProductList,
        callWSDeleteFromProductList,callWSUpdateProductMetafields} from '../action/index';
import {Map,List} from 'immutable';
import { push } from 'react-router-redux'; 
class ManageProductsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h1>
            </div>
        );
    }
}

  
const mapStateToProps = state => {
    
    state=Map(state);
    console.log("mapStateToProps=",state);
    
    var maptemp=Map(state.get('productmanage'));
    var temp=List(maptemp.get('listofproducts'));
    

    return { 
        callapi :state.get('callapi'),
        productmanage: state.get('productmanage'),
        listofproductstoshow:temp
     };//requestFields
}


const mapDispatchToProps = dispatch => bindActionCreators(
    { sendRequest:sendRequest,
      updatePath:updatePath,
      updateVerb:updateVerb ,
      push:push,
      productManageSave:productManageSave,
      productShowShopname:productShowShopname,
      callWSSaveProductList:callWSSaveProductList,
      callWSRetrieveProductList:callWSRetrieveProductList,
      callWSDeleteFromProductList:callWSDeleteFromProductList,
      callWSUpdateProductMetafields:callWSUpdateProductMetafields
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsComponent);
