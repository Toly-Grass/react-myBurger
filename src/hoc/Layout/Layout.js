import React, { Component } from 'react';
import Auxiliary from '../Auxiliray/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	closeSideDrawerHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer
			};
		});
	};

	render() {
		return (
			<Auxiliary>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawerHandler} />
				<main className={classes.Content}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

export default Layout;
