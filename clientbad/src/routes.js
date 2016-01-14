import React from 'react';
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
import Main from './components/Main';
import Verify from './components/Verify';
import Raw from './components/Raw';



module.exports = (
  <Route name="app" path="/" handler={Main}>
  	<Route name="raw" path="/raw" handler={Raw}></Route>
  	<Route name="verify" path="/verify" handler={Verify}></Route>
  	<DefaultRoute handler={Verify} />
  </Route>
);