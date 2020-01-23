import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from '../../store/actions';

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 5"
          clicked={() => this.props.onCounterChangeHandler(actionTypes.ADD)}
        />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onCounterChangeHandler(actionTypes.SUB)}
        />
        <hr />
        <button onClick={this.props.onStoreResult}>Store Results</button>
        <ul>
          {this.props.storedResutls.map(item => {
            return (
              <li
                key={item.id}
                onClick={() => this.props.onDeleteResult(item.id)}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter,
    storedResutls: state.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onCounterChangeHandler: what =>
      dispatch({ type: actionTypes.CHANGE, do: what, value: 5 }),
    onStoreResult: () => dispatch({ type: actionTypes.STO_RESULTS }),
    onDeleteResult: itemID => dispatch({ type: actionTypes.DEL_RESULTS, id: itemID })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
