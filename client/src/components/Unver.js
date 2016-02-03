//const React = require('react');
import React, {PropTypes, Component} from 'react';
import {Mapp} from './mApp'

const coords = {
  lat: 42.3150166 ,
  lng: -71.11114839999999
};

class Unver extends Component {

  render() {
    return (
      <div>
        <h1>in unver where is the map</h1>
        <Mapp/>
      </div>
    );
  }
}

export {Unver}