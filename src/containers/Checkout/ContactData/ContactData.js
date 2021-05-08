import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				isValid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'fastest',
				validation: {
					required: false
				},
				isValid: true
			}
		},
		formIsValid: false
	};

	orderSubmitHandler = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const contactInfo = {};
		for (let inputElementId in this.state.orderForm) {
			contactInfo[inputElementId] = this.state.orderForm[inputElementId].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.tPrice,
			contactInfo: contactInfo
		};
		this.props.onOrderBurger(order);
	};

	checkValidity(value, rules) {
		let isValid = false;
		if (rules.required) {
			isValid = value.trim() !== '';
		}
		if (rules.minLength && rules.maxLength) {
			isValid = value.length >= rules.minLength && value.length <= rules.maxLength;
		}

		return isValid;
	}

	changedHandler = (event, inputId) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedformElement = {
			...this.state.orderForm[inputId]
		};
		updatedformElement.value = event.target.value;
		updatedformElement.isValid = this.checkValidity(updatedformElement.value, updatedformElement.validation);
		updatedformElement.touched = true;
		updatedOrderForm[inputId] = updatedformElement;
		let formIsValid = true;
		for (let inputId in this.state.orderForm) {
			formIsValid = this.state.orderForm[inputId].isValid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderSubmitHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.isValid}
						shouldValidate={formElement.config.validation.required}
						touched={formElement.config.touched}
						changed={(event) => this.changedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" isDisable={!this.state.formIsValid}>
					Order
				</Button>
			</form>
		);
		if (this.props.loading) {
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

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		tPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
