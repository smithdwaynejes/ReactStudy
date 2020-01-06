import React, { Component } from 'react';
import './App.css';
// import Radium from 'radium';
import styled from 'styled-components';
import Person from './Person/Person'


const StyledButton = styled.button `
  background-color: ${props => props.alt ? 'red':'green'};
  color:white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color:black;
  }
`;
class App extends Component {

  state = {
    persons: [
      { id: "1", name: "Max", age: "24" },
      { id: "2", name: "Nova", age: "26" },
      { id: "3", name: "Step", age: "28" },
    ],
    showTogglePersons: false
  }

  switchNameHandler = (myName) => {
    // console.log('Was Clicked');
    // Don't Do this: this.state.persons[0].name = "Maximilian";

    this.setState({
      persons: [
        { id: "1", name: myName, age: "24" },
        { id: "2", name: "Nova", age: "26" },
        { id: "3", name: "Step", age: "28" },
      ]
    });
  }

  nameChangeHandler = (event,personId) => {


    const personIndex = this.state.persons.findIndex(item => {
      return item.id === personId;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    // const person = Object.assign({}, this.state.persons[personIndex]);

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    });
  }

  personViewHandler = () => {
    const doesShow = this.state.showTogglePersons;
    this.setState({
      showTogglePersons: !doesShow
    })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  render() {
 

    let persons = null;

    if (this.state.showTogglePersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              change = {(event) => this.nameChangeHandler(event, person.id)}

            />
          })
          }

        </div>
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color:'black'
      // }

    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('green');
    }

    return (
      <div className="App">
        <h1 className={classes.join(' ')}>My First React App</h1>
        <StyledButton alt={this.state.showTogglePersons} onClick={this.personViewHandler}>Switch Name</StyledButton>
        {persons}

      </div>

      

    );

    //return React.createElement('div',{className:'App'}, React.createElement('h1',null,'I am first react project!!'));
  }
}

export default App;
