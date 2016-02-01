const dataState = {
  raw: '',
  isFetching: false,
  result: {}
}
//http://maps.googleapis.com/maps/api/geocode/json?address=12+parley+Vale,+Jamaica+Plain,+MA+02130&sensor=false

export const verify = (state = dataState, action) =>{
  switch (action.type) {
    case 'REQ_ADDR':
      return Object.assign({}, state, {
        isFetching: true
      })    
    case 'REC_ADDR':
      return Object.assign({}, state, {
        isFetching: false,
        raw: action.result.formatted_address,
        result: action.result
      })
    default:
      return state
  }
}

