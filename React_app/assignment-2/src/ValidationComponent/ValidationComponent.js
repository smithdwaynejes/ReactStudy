import React from 'react';

const validationComponent = (props) => {
    let validationMessage = "Text is too Small";
    if (props.text.length < 5)
        validationMessage = "Text is too small";
    else
        validationMessage = "Text is long enough"
    return (
        <div className="ValidationComponent">
            <p> {validationMessage}</p>
        </div>
    )
};

export default validationComponent