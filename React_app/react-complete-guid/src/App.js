import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {

  state = {
    persons: [
      { name: "Max", age: "24" },
      { name: "Nova", age: "26" },
      { name: "Step", age: "26" },
    ]
  }

  switchNameHandler = (myName) => {
    // console.log('Was Clicked');
    // Don't Do this: this.state.persons[0].name = "Maximilian";

    this.setState({
      persons: [
        { name: myName, age: "24" },
        { name: "Nova", age: "26" },
        { name: "Step", age: "28" },
      ]
    });
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: "Max", age: "24" },
        { name: event.target.value, age: "26" },
        { name: "Step", age: "26" },
      ]
    });
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font:'inherit',
      border: '1px solid blue',
      padding:'8px',
      cursor:'pointer'
    }

    return (
      <div className="App">
        <h1>My First React App</h1>
        <button style = {style} onClick={this.switchNameHandler.bind(this,'Maximilian')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} 
        />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          click={this.switchNameHandler.bind(this,'Max!')}
          change={this.nameChangeHandler}
        >My Hobbies: Racing </Person>
        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age} 
        />
      </div>

    );

    //return React.createElement('div',{className:'App'}, React.createElement('h1',null,'I am first react project!!'));
  }
}

export default App;
