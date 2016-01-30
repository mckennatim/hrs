import React from 'react';
import {connect} from 'react-redux';
import {ckAddr} from '../actions'
//import {fetchWeather} from '../actions';

let Ver = ({dispatch}) => {
	let input;
	return (
		<div>
	 		<h4>Vertherify an address</h4>
	 		<input type="text" size="60" ref={node => {input = node;}}/><br/>
	 		<button onClick={() => {
		        dispatch(ckAddr(input.value));
		        input.value = '';}}>
		        Find in weather
		      </button>
   	</div>
	);
}
Ver = connect()(Ver)

export {Ver};
