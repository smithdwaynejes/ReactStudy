import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm a {props.name}. I am {props.age} years old</p>
            <p>{props.children}</p>
            <input type='text' value={props.name} onChange = {props.change}></input>
        </div>
    )
};

export default person;