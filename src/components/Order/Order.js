import React from 'react';
import classes from './Order.css';

const order = (props) => {
	
	const ingredientsOutput = [];
	for (let igName in props.ingredients) {
		ingredientsOutput.push(
			<span className={classes.Ingredient} key={igName}>
				{igName} ({props.ingredients[igName]})
			</span>
		);
	}

	return (
		<div className={classes.Order}>
			<div>
				<b>Ingredients: </b>
				{ingredientsOutput}
			</div>
			<p>
				Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
