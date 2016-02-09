//const React = require('react');
import React, {PropTypes, Component} from 'react';
import Radium from 'radium';
import {connect} from 'react-redux';
import {Gmaps} from 'react-gmaps';
import {uvStyles} from '../styles'

class Maps extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    const {selected} = this.props
    return (
      <div style={styles.outer}>
        <div style={styles.heading}>
          <h2>{selected.address}</h2>
        </div>
        <div style={styles.inner}>
        <Gmaps
          width={'300px'}
          height={'400px'}
          lat={selected.location.lat}
          lng={selected.location.lng}
          zoom={14}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          >
        </Gmaps>
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

const mapStateToProps = (state) => {
  return {
    selected: state.data.verify.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};


Maps = connect(mapStateToProps,mapDispatchToProps)(Maps)
export {Maps}
