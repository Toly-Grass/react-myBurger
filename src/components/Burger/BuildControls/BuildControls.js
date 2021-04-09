import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Beef', type: 'beef' }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong>{props.totalPrice.toFixed(2)}$</strong>
		</p>
		{controls.map((control) => {
			return (
				<BuildControl
					key={control.label}
					label={control.label}
					added={() => props.ingredientAdded(control.type)}
					removed={() => props.ingredientRemoved(control.type)}
					disabled={props.disabled[control.type]}
				/>
			);
		})}
		<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
			ORDER NOW
		</button>
	</div>
);

export default buildControls;
// disabled={Object.values(props.disabled).reduce((acc, igDisabled) => acc && igDisabled, true)}
