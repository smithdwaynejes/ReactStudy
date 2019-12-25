import React from 'react';

const charComponent = (props) => {
    const style = {
        display: 'inline-block',
        textAlign: 'center',
        border: '1px solid black',
        margin: '16px',
        padding: '16px'
    };

    return (
        <div className = "charComponent" style={style} onClick={props.click}>
             {props.character} 

        </div>

    )
}

export default charComponent