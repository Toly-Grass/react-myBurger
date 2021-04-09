import React from 'react';
import Auxiliary from '../../../hoc/Auxiliray/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((igKey) => (
		<li key={igKey}>
			<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
		</li>
	));
	return (
		<Auxiliary>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: {props.totalPrice.toFixed(2)}$</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.cancelClicked}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.continueClicked}>
				Continue
			</Button>
		</Auxiliary>
	);
};

export default orderSummary;
