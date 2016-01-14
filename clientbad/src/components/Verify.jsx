import React from 'react';

export default React.createClass({
  getUnver: function() {
    return this.props.unver || [];
  },
  render: function() {
    return <div className="verify">
      <ul>
        {this.getUnver().map(loc =>
          <li key={loc.id}>{loc.raw}</li>
        )}
      </ul>
    </div>;
  }
});