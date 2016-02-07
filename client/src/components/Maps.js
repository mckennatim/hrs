//const React = require('react');
import React, {PropTypes, Component} from 'react';
import {Mapp} from './mApp'

const coords = {
  lat: 42.3150166 ,
  lng: -71.11114839999999
};

class Maps extends Component {
  render() {
    return (
      <div style={styles.outer}>
        <div style={styles.heading}>
          <h2>in unver where is the map</h2>
        </div>
        <div style={styles.inner}>
          <Mapp  />
        </div>
      </div>
    );
  }
}

const styles = {
  outer: {
    display:'flex',
    flexDirection: 'column',
    background: '#E1E1E1',
    height: 600
  },
  heading:{
    margin: 'auto'
  },
  inner: {
    margin: 'auto'
  }
}

export {Maps}