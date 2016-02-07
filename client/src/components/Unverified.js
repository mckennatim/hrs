import React from 'react';
import {connect} from 'react-redux';
import {ckAddr} from '../actions'

let Unverified = ({}) => {
	return (
		<div>
			<div>
				<h3>Un-verified Addresses</h3>
			</div>
				<ul>
					<li></li>
				</ul>			
			<div>
			</div>
		</div>
	)
}

Unverified = connect()(Unverified)
export {Unverified};