import React from 'react';
import {connect} from 'react-redux';
import {fetchAddr} from '../actions'
//import {fetchWeather} from '../actions';

const VerIn = ({onClick}) => {
	let input
	return (
		<div>
	 		<h4>Vertherify an address</h4>
	 		<input type="text" size="60" ref={node => {input = node;}} defaultValue='12 Parley Vale, Jamaica Plain, MA 02130'/><br/>
	 		<button onClick={() => {
	      onClick(input.value);
	      input.value = '';
	    }}>
	      Find in weather
	    </button><br/>
	 	</div>
	)
}

const VerOut = ({result}) => (
	<div>
		<span >{result.formatted_address} </span><br/>
		<span >lat: {result.geometry.location.lat} </span><br/>
		<span>lng: {result.geometry.location.lng}</span>
	</div>
)

const Veri = ({onRawInput, result}) => (
	<div>
	<VerIn onClick={(val) => onRawInput(val)} ></VerIn>
	<VerOut result={result}></VerOut>
	</div>
)

const mapStateToProps = (state) => {
	console.log(state)
  return {
    result: state.reducers.verify.result
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  	onRawInput: (val) => {
  		dispatch(fetchAddr(val))
  	}
  };
};

const Ver = connect(mapStateToProps,mapDispatchToProps)
(Veri);

// let Ver = ({dispatch}) => {
// 	let input;
// 	return (
// 		<div>
// 	 		<h4>Vertherify an address</h4>
// 	 		<input type="text" size="60" ref={node => {input = node;}} defaultValue='12 Parley Vale, Jamaica Plain, MA 02130'/><br/>
// 	 		<button onClick={() => {
//         dispatch(ckAddr(input.value));
//         input.value = '';}}>
//         Find in weather
//       </button><br/>
//       <span>dog</span>

//    	</div>
// 	);
// }
// Ver = connect()(Ver)

export {Ver};
