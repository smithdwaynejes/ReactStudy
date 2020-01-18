import React from 'react';
import './Cockpit.css'

const cockpit = (props) => {
    let classes = [];
    if (props.persons.length <= 2) {
        classes.push('red');
    }
    if (props.persons.length <= 1) {
        classes.push('green');
    }
    return (
        <div>
            <h1 className={classes.join(' ')}>{props.title}</h1>
            <button 
                alt={props.showTogglePersons} 
                onClick={props.clicked}>Switch Name
            </button>
        </div>
    );
}

export default cockpit;