import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

class App extends Component {
	componentDidMount() {
		this.props.onAutoSignUp();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={asyncAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return <Layout>{routes}</Layout>;
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAutoSignUp: () => dispatch(actions.authCheckState())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
