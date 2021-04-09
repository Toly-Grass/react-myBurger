import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliray/Auxiliary';

const INGREDIEN_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	beef: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			meat: 0,
			salad: 0,
			cheese: 0,
			beef: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	updatePurchaseState = (ingredients) => {
		const sum = Object.values(ingredients).reduce((acc, igValue) => acc + igValue, 0);
		this.setState({
			purchasable: sum > 0
		});
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		alert('You Continue');
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const updatedPrice = this.state.totalPrice + INGREDIEN_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const updatedPrice = this.state.totalPrice - INGREDIEN_PRICES[type];
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: updatedPrice
		});
		this.updatePurchaseState(updatedIngredients);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} cancelModal={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						totalPrice={this.state.totalPrice}
						cancelClicked={this.purchaseCancelHandler}
						continueClicked={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					totalPrice={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
