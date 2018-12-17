import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Map,List} from 'immutable';
import TabbedPanelCustomControl from '../customcontrols/tabbedpanel';

 
class TabbedpanelContainer extends Component {
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
    return { dummy:state };
}



const mapDispatchToProps = dispatch => bindActionCreators({ push:push }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(TabbedPanelCustomControl);

