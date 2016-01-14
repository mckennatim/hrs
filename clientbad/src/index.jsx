import React from 'react';
import ReactDOM from 'react-dom';
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
import * as mock from './components/mockData.js';
import Main from './components/Main';
import Verify from './components/Verify';
import Raw from './components/Raw';


console.log(mock.db.getv[2])
const unver = mock.db.getv


// ReactDOM.render(
//   <Verify unver={unver} />,
//   document.getElementById('app')
// );


console.log("hello  mother")



//React.initializeTouchEvents(true)

// Router.run(routes, function(Root){
//   React.render(<Root />, document.getElementById('app'));
// });

ReactDOM.render((
	<Router>	
	  <Route name="app" path="/" component={Main}>
	  	<Route name="raw" path="/raw" component={Raw}></Route>
	  	<Route name="verify" path="/verify" component={Verify}></Route>
	  	<DefaultRoute component={Verify} />
	  </Route>
  </Router>
),document.getElementById('app')) ;
