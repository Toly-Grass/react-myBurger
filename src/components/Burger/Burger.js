import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
	const ingredients = Object.keys(props.ingredients).map((igKey) => {
		return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	});

	const numberOfIngredient = Object.values(props.ingredients).reduce((acc, igCount) => acc + igCount, 0);

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{numberOfIngredient === 0? 'Please start adding ingredients!' : ingredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
