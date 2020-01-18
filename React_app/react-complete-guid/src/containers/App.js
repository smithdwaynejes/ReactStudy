import React, { Component } from 'react';
import './App.css';
// import Radium from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


// const StyledButton = styled.button `
//   background-color: ${props => props.alt ? 'red':'green'};
//   color:white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
//   &:hover{
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color:black;
//   }
// `;
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

  nameChangeHandler = (event, personId) => {


    const personIndex = this.state.persons.findIndex(item => {
      return item.id === personId;
    });

    const person = { ...this.state.persons[personIndex] };
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
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler} />
        </div>
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color:'black'
      // }

    }



    return (
      <div className="App">
        <Cockpit
          title={this.props.appTitle}
          showTogglePersons={this.state.showTogglePersons}
          clicked={this.personViewHandler}
          persons={this.state.persons} />
        {persons}

      </div>



    );

    //return React.createElement('div',{className:'App'}, React.createElement('h1',null,'I am first react project!!'));
  }
}

export default App;
