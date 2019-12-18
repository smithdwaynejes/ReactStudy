import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {

  state = {
    Users: [
      { username: 'max', age: 35 },
      { username: 'john', age: 24 },
    ]

  }

  userNameChangeHandler = (event) => {
    this.setState ({
      Users: [
        { username: event.target.value, age: 35 },
        { username: 'john', age: 24 },
      ]
    });
  }
  render() {
    return (
      <div className="App">
        <UserInput keychange = {this.userNameChangeHandler}/>
        <UserOutput name={this.state.Users[0].username} age={this.state.Users[0].age}/>
        

      </div>
    );
  }
}

export default App;
