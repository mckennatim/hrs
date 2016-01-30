const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { pushPath } = require('redux-simple-router');

function App({ pushPath, children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/ver">Ver</Link>
        {' '}
        <Link to="/wea">Wea</Link>
        {' '}
        <Link to="/unver">Unver</Link>
      </header>
      <div>
        <button onClick={() => pushPath('/ver')}>Go to /ver</button>
      </div>
      <div style={{marginTop: '1.5em'}}>{children}</div>
    </div>
  );
};

App = connect(null, { pushPath })(App);

export {App};
