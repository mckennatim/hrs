import { combineReducers } from 'redux';
import {routeReducer } from 'redux-simple-router';

import {count} from './count';
import {verify} from './verify';

const reducers = combineReducers({count, verify})

const rootReducer = combineReducers(Object.assign({}, {reducers} , {
  routing: routeReducer
}));

export default rootReducer;
