import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: {
			meat: 0,
			cheese: 0,
			salad: 0,
			beef: 0
		},
		totalPrice: 0
	};

	cancelledCheckoutHandler = () => {
		this.props.history.goBack();
	};

	continuedCheckoutHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({
			ingredients: ingredients,
			totalPrice: price
		});
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					cancelledCheckout={this.cancelledCheckoutHandler}
					continuedCheckout={this.continuedCheckoutHandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
