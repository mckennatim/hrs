const React = require('react');
const ReactDOM = require('react-dom');
const { compose, createStore, combineReducers } = require('redux');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute } = require('react-router');
const createHistory = require('history/lib/createHashHistory');
const { syncReduxAndRouter} = require('redux-simple-router');
const { App, Home, Verified, Unverified, Wea, Maps, Register } = require('./components');
import rootReducer from './reducers';
import configureStore from './store/configureStore'

const store = configureStore()

const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="ver" component={Verified}/>
          <Route path="reg" component={Register}/>
          <Route path="unver" component={Unverified}/>
          <Route path="maps" component={Maps}/>
          <Route path="wea" component={Wea}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
