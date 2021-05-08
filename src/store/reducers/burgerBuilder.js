import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4
};

const INGREDIEN_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	beef: 0.7
};

const addIngredient = (state, action) => {
	const updatedAddIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
	const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient);

	const updatedAddProperties = {
		ingredients: updatedAddIngredients,
		totalPrice: state.totalPrice + INGREDIEN_PRICES[action.ingredientName]
	};
	return updateObject(state, updatedAddProperties);
};

const removeIngredient = (state, action) => {
	const updatedRemoveIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
	const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient);

	const updatedRemoveProperties = {
		ingredients: updatedRemoveIngredients,
		totalPrice: state.totalPrice - INGREDIEN_PRICES[action.ingredientName]
	};
	return updateObject(state, updatedRemoveProperties);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			beef: action.ingredients.beef,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false
	});
};

const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);

		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
