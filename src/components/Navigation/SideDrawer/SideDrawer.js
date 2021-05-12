import React from 'react';
import Auxiliary from '../../../hoc/Auxiliray/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
	let sideDrawerClasses = [ classes.SideDrawer, classes.Close ];
	if (props.open) {
		sideDrawerClasses = [ classes.SideDrawer, classes.Open ];
	}
	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closeSideDrawer} />
			<div className={sideDrawerClasses.join(' ')} onClick={props.closeSideDrawer}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Auxiliary>
	);
};

export default sideDrawer;
