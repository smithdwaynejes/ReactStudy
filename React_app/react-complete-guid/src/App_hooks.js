import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const app = (props) => {
  console.log('from app hooks');

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "Max", age: "24" },
      { name: "Nova", age: "26" },
      { name: "Step", age: "26" },
    ]
  });

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: "Maximilian_hooks", age: "24" },
        { name: "Nova", age: "26" },
        { name: "Step", age: "28" },
      ]
    })
  }

  return (
    <div className="App">
      <h1>My First React App</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My Hobbies: Racing </Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>

  );

}
 
export default app;
