import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions/index';


import Aux from '../Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  inputChangeHandler = event => {
    this.props.onInputChanged(event.target.value);
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {

     const inputStyle = {
       marginLeft: "210px"
     };



    return (
      <Aux>
        {/* <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} /> */}

        <SideDrawer open={true} closed={this.sideDrawerClosedHandler} />
        <div style={inputStyle}>
          <input
            value={this.props.totalRows}
            onChange={this.inputChangeHandler}
          />
          <p>Default Items are 3</p>
          <main className={classes.Content}>{this.props.children}</main>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalRows: state.data_limit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChanged: totalRows => {
      dispatch(actionTypes.dataLimit(totalRows));
    },
    onCreateRows: () => {
      dispatch(actionTypes.createData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);