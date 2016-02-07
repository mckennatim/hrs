const dataState = {
  raw: '',
  isFetching: false,
  result: {},
  results: [
    {
      address_components: [{}, {},{},{},{},{},{},{long_name: "00000"}],
      formatted_address: "nowhere",
      geometry: {
        location: {
          lat: 0,
          lng: 0
        }
      }
    }
  ],
  selected: {
    address: '12 selected place',
    location: {
      lat: 12.44,
      lng: -7.11
    }
  },
  unverified: [
  ]
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
        raw: action.results[0].formatted_address,
        result: action.results[0],
        results: action.results
      })
    case 'SEL_ADDR':
      return Object.assign({}, state, {
        selected: action.selected
      }) 
    case 'REC_UNVERIFIED':
      //console.log(action.unverified)
      return Object.assign({}, state, {
        unverified: action.unverified
      })           
    default:
      return state
  }
}

