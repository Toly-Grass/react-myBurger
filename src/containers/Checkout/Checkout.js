import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	cancelledCheckoutHandler = () => {
		this.props.history.goBack();
	};

	continuedCheckoutHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// console.log(this.props);
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchaseRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						cancelledCheckout={this.cancelledCheckoutHandler}
						continuedCheckout={this.continuedCheckoutHandler}
					/>
					<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};


export default connect(mapStateToProps)(Checkout);
