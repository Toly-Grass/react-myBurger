import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliray/Auxiliary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
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

		return sum > 0;
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
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? (
			<p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						totalPrice={this.props.tPrice}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Auxiliary>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					totalPrice={this.props.tPrice}
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

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		tPrice: state.totalPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (igName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: igName }),
		onIngredientRemoved: (igName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
