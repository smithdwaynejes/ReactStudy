import React from 'react';

const UserInput = (props) => {
    return (
        <div className = "UserInput">
            <input type='text' onChange={props.keychange}></input>
        </div>
       
    );
}

export default UserInput;