import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ManageproductholdslistComponent from '../components/manageproductholdslist';
import {sendRequest,updatePath,updateVerb,callWSRetrievePoductHoldList} from '../action/index';
import {Map,List} from 'immutable';
import { push } from 'react-router-redux'; 
class ManageproductholdslistContainer extends Component {
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
    // var temp=List(state.get('productholdlist').get('resultproductholdlist'));
    
    var maptemp=Map(state.get('productholdmanage'));
    var temp=List(maptemp.get('productholdlist'));
    
    console.log('manageproductholdlistcontainer productholdlist',temp);
    return { 
            callapi :state.get('callapi'),
            listofproductsholdtoshow:temp
         };//requestFields
}


const mapDispatchToProps = dispatch => bindActionCreators(
    { sendRequest:sendRequest,
      updatePath:updatePath,
      updateVerb:updateVerb ,
      push:push,
      callWSRetrievePoductHoldList:callWSRetrievePoductHoldList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageproductholdslistComponent);
