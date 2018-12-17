import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReturnsProductsComponent from '../components/returnsproducts';
import {callWSRetrievePoductReturnsList,callWSCheckinReturnslist} from '../action/index';
import {Map,List} from 'immutable';
import { push } from 'react-router-redux'; 
class ReturnsProductsContainer extends Component {
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
    console.log("ReturnsProductsContainer mapStateToProps=",state);
    var maptemp=Map(state.get('productreturnsmanage'));
    var temp=List(maptemp.get('productreturnslist'));

    return { 
        callapi :state.get('callapi'),
        listofproductsreturnstoshow:temp
     };//requestFields
}


const mapDispatchToProps = dispatch => bindActionCreators(
    { 
      callWSRetrievePoductReturnsList:callWSRetrievePoductReturnsList,
      push:push,
      callWSCheckinReturnslist:callWSCheckinReturnslist,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReturnsProductsComponent);
