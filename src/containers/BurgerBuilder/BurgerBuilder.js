import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliray/Auxiliary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIEN_PRICES = {
	meat: 1.3,
	salad: 0.5,
	cheese: 0.4,
	beef: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get('/ingredients.json')
			.then((response) =>
				this.setState({
					ingredients: response.data
				})
			)
			.catch((error) =>
				this.setState({
					error: error
				})
			);
	}

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
		// alert('You Continue');
		this.setState({
			loading: true
		});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Wael',
				address: {
					street: 'test street',
					zipcode: '4444',
					country: 'US'
				},
				email: 'test@test.com',
				deliveryMethod: 'fastest'
			}
		};
		axios
			.post('orders.json', order)
			.then((response) =>
				this.setState({
					loading: false,
					purchasing: false
				})
			)
			.catch((error) =>
				this.setState({
					loading: false,
					purchasing: false
				})
			);
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

		let orderSummary = null;

		let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Auxiliary>
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
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					totalPrice={this.state.totalPrice}
					cancelClicked={this.purchaseCancelHandler}
					continueClicked={this.purchaseContinueHandler}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} cancelModal={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
