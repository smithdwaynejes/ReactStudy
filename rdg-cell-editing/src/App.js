import React, { Component } from 'react';
import "./components/SlickGrid/GridExamples/styles.scss";

import Layout from './hoc/Layout/Layout';
import Grid from './containers/Grid';
import  './App.css';

class App extends Component {

  componentDidMount() {

    // SlickGrid1();
  }
  render () {

    
    return (
      <div>
        <Layout>
          
        <Grid /> 
         </Layout>
      </div>
    );
  }
}

export default App;
