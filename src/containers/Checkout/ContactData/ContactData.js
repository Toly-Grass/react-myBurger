import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderSubmitHandler = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
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
			.then((response) => {
				this.setState({
					loading: false
				});
				this.props.history.push('/');
			})
			.catch((error) =>
				this.setState({
					loading: false
				})
			);
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
				<input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
				<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
				<Button btnType="Success" clicked={this.orderSubmitHandler}>
					Order
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
