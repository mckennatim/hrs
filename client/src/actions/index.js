import fetch from 'isomorphic-fetch'
import {increase, decrease} from './count'

const reqAddr = (raw) => {
	console.log(raw)
	return {
		type: 'REQ_ADDR',
		raw
	}
}

const recAddr = (raw, json) => {
	console.log(raw)
	return {
		type: 'REC_ADDR',
		results: json,
		raw
	}
}

const selAddr = (selected) => {
	return {
		type: 'SEL_ADDR',
		selected
	}
}

const fetchAddr = (raw) => {
	return dispatch => {
		dispatch(reqAddr(raw))
	  const eraw = `?address=`+raw.split(' ').join('+')+`&sensor=false`
	  const url = `http://maps.googleapis.com/maps/api/geocode/json`
	  console.log(url+eraw)
	  return fetch(url+eraw)
	    .then(response => response.json()) //same as function(response){return response.json()}
	    .then((json)=>{
	      console.log(json.results.length)
	      dispatch(recAddr(raw, json.results)) 
	    })		
	}
}



export {increase, decrease, fetchAddr, selAddr};