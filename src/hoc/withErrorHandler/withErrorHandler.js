import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliray/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};

		errorConfirmedHandler = () => {
			this.setState({
				error: null
			});
		};

		constructor(props) {
			super(props);
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				(res) => res,
				(error) =>
					this.setState({
						error: error
					})
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		render() {
			return (
				<Auxiliary>
					<Modal show={this.state.error} cancelModal={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		}
	};
};

export default withErrorHandler;
