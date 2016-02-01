const React = require('react');
const ReactDOM = require('react-dom');
const { compose, createStore, combineReducers } = require('redux');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute } = require('react-router');
const createHistory = require('history/lib/createHashHistory');
const { syncReduxAndRouter} = require('redux-simple-router');
const { App, Home, Ver, Unver, Wea } = require('./components');
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
          <Route path="ver" component={Ver}/>
          <Route path="unver" component={Unver}/>
          <Route path="wea" component={Wea}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
