import React from 'react';

import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>{key}</span>: 
          {props.ingredients[key]}
        </li>
      );
    });
  
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger witht he follow ingredients:</p>
      <ul>
        {summary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
    </Aux>
  )
};

export default orderSummary;