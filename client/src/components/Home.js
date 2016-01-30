const React = require('react');
const { connect } = require('react-redux');
import { increase, decrease } from '../actions/count';

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state change:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  );
};

Home = connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home);

export {Home};
