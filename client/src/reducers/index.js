import { combineReducers } from 'redux';
import {routeReducer } from 'redux-simple-router';

import {count} from './count';

const rootReducer = combineReducers(Object.assign({}, {count} , {
  routing: routeReducer
}));

export default rootReducer;
