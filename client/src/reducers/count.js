const initialState = {
	raw:'',
	loc: '',
  number: 1
}

const count = (state = initialState, action) => {
  if(action.type === 'INCREASE') {
    return { 
    	...state,
    	number: state.number + action.amount 
    };
  }
  else if(action.type === 'DECREASE') {
    return { 
    	...state,
    	number: state.number - action.amount 
    };
  }
  return state;
}

const verify = (state = initialState, action) =>{
	if(action.type === 'CK_ADDR'){
		const resu = {loc: action.raw}
		return {
			...state,
			result: resu
		}
	}
	return state;
}

export {count};