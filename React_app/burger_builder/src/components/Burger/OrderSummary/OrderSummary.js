import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map( (igKeys) => {
        return (
          <li key={igKeys}>
            <span style={{textTransform:'capitalize'}}>{igKeys}</span>:{props.ingredients[igKeys]}
          </li>
        );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Your delicious Burger with the following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>Continue to Checkout></p>
        <Button btnType = "Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    );
};

export default orderSummary;