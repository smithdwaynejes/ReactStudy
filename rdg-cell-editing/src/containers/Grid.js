import React, { Component } from "react";
import SimpleGrid from "./Grids/ReactDataGrid/SimpleGrid";
import CellFormatting from './Grids/ReactDataGrid/CellFormatting';
import * as actionTypes from "../store/actions/index";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

 import SlickGrid1 from '../containers/Grids/SlickGrid/Example1';


class Grid extends Component {

     

    componentWillUpdate () {
        this.props.onCreateRows()
    }


  render() {

   
    return (
      <div>
        <Switch>
          {/* <Route path="/checkout" component={Checkout} />
            <Route path='/orders' component={Orders} /> */}

          <Route path="/slick-grid-ex1" render={() => <SlickGrid1 />} />
          <Route path="/cell-formatting" render={() => <CellFormatting />} />
          <Route path="/" exact render={() => <SimpleGrid />} />
        </Switch>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
