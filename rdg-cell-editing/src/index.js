import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";


import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import gridReducer from './store/reducers/ReactGrid';
import slickReducer from './store/reducers/SlickGrid';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers ( {
  gridData: gridReducer,
  slickData: slickReducer
})

const store = createStore(
  slickReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  
);
ReactDOM.render(app, document.getElementById("root"));
