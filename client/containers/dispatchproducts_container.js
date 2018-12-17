import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DispatchProductsComponent from '../components/dispatchproducts';
import {sendRequest,updatePath,updateVerb,productManageSave,callWSRetrievePoductDispatchList,callWSCheckoutDispatchlist} from '../action/index';
import {Map,List} from 'immutable';
import { push } from 'react-router-redux'; 
class DispatchProductsContainer extends Component {
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
    var maptemp=Map(state.get('productdispatchmanage'));
    var temp=List(maptemp.get('productdispatchlist'));

    return { 
        callapi :state.get('callapi'),
        productmanage: state.get('productmanage'),
        listofproductsdispatchtoshow:temp
     };//requestFields
}


const mapDispatchToProps = dispatch => bindActionCreators(
    { sendRequest:sendRequest,
      updatePath:updatePath,
      updateVerb:updateVerb ,
      push:push,
      productManageSave:productManageSave,
      callWSRetrievePoductDispatchList:callWSRetrievePoductDispatchList,
      callWSCheckoutDispatchlist:callWSCheckoutDispatchlist,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DispatchProductsComponent);
