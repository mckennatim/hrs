import React from 'react';
import Radium from 'radium';
import color from 'color';
import {connect} from 'react-redux';
const { pushPath } = require('redux-simple-router');
import {fetchVerified, setUnverSel, fetchAddr} from '../actions' 
import {uvStyles} from '../styles'
const { Link } = require('react-router');

@Radium
class Verified extends React.Component{
	componentDidMount() {
		const {onGetVer} = this.props
    onGetVer()		
	}
	onClickVerSel (ver_sel) {
		const {onVerSel, pushPath, dispatch} = this.props
		onVerSel(ver_sel)
		dispatch(fetchAddr(ver_sel.raw))
		pushPath('/reg')

	}	
	render() {
		const {verified, onGetVer, pushPath} = this.props
		return (
			<div style={uvStyles.di}>
				<div>
					<h3>Verified Addresses</h3>
			 		<button button onClick={() => onGetVer()} >
			 			Refresh
			 		</button><br/>					
				</div>
				<div>
					<ul style={uvStyles.ul}>
						{verified.map((un)=>(
						<li style={uvStyles.li} key={un.id}
						onClick={()=>this.onClickVerSel(un)} >
								{un.raw}
						</li>
						))}
					</ul>			
				</div>
			</div>		
		)
	}
}
const mapStateToProps = (state) => {
  return {
    verified: state.data.verify.verified
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  	onGetVer: () => {
  		dispatch(fetchVerified())
  	}, 
  	onVerSel: (ver_sel) => {
  		dispatch(setUnverSel(ver_sel))
  	},
    pushPath: (path) => {
      dispatch(pushPath(path))
    },  	
  	dispatch
  };
};

//Verified = Radium(Verified);
Verified = connect(mapStateToProps,mapDispatchToProps)(Verified)
export {Verified};