import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		meat: 0,
		salad: 0,
		beef: 0,
		cheese: 0
	},
	totalPrice: 4
};

const INGREDIEN_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	beef: 0.7
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
                totalPrice: state.totalPrice + INGREDIEN_PRICES[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
                totalPrice: state.totalPrice - INGREDIEN_PRICES[action.ingredientName]
			};
		default:
			return state;
	}
};

export default reducer;