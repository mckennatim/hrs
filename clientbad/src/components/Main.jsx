var React = require('react');
import { RouteHandler, Link } from 'react-router';
var mStyle = {
	li: {
		display: 'inline',
		padding: '10px'
	},
	ul: {
	},
  span:{
    color: 'yellow'
  },
  div: {
    height: '900',
    background: 'green',
  }
};


var Main = React.createClass({
  render: function(){
    return (
      <div style={mStyle.div}>
        <ul>
        <li style={mStyle.li}><Link to="/raw"><span style={mStyle.span}> raw </span></Link></li>
        <li style={mStyle.li}><Link to="/verify"><span style={mStyle.span}> verify </span></Link></li>
        </ul>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;