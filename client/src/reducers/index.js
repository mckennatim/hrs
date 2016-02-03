import { combineReducers } from 'redux';
import {routeReducer } from 'redux-simple-router';

import {count} from './count';
import {verify} from './verify';

const data = combineReducers({count, verify})

const rootReducer = combineReducers(Object.assign({}, {data} , {
  routing: routeReducer
}));

export default rootReducer;
