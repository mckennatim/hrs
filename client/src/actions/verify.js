import fetch from 'isomorphic-fetch'

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

const recUnverified = (options) => {
	return {
		type: 'REC_UNVERIFIED',
		options
	}
}

const fetchUnverified = () => {
	return dispatch => {
	  const url = `http://10.0.1.104:3036/api/hrs/verify-addr`
	  //console.log(url)
	  return fetch(url)
	    .then(response => response.json()) //same as function(response){return response.json()}
	    .then((json)=>{
	    	let options = json.map((j)=>
	    		Object.assign({}, {
		        label: j.raw, value: JSON.stringify({id: j.id, label: j.raw})
		      })
	    	)
	    	console.log(options)
	      dispatch(recUnverified(options))
	    })		
	}
}

export {fetchAddr, selAddr, fetchUnverified};