import React from 'react';
import Radium from 'radium';
import color from 'color';
import {connect} from 'react-redux';
const { pushPath } = require('redux-simple-router');
import {fetchUnverified, setUnverSel} from '../actions' 
import {uvStyles} from '../styles'
const { Link } = require('react-router');

@Radium
class Unverified extends React.Component{
	componentDidMount() {
		const {dispatch} = this.props
    dispatch(fetchUnverified())		
	}
	render() {
		const {unverified, onGetUnver, onUnverSel, pushPath} = this.props
		const onClickUnverSel = (unver_sel) =>{
			onUnverSel(unver_sel)
			pushPath('/reg')

		}
		return (
			<div style={uvStyles.di}>
				<div>
					<h3>Un-verified Addresses</h3>
			 		<button button onClick={() => onGetUnver()} >
			 			Refresh
			 		</button><br/>					
				</div>
				<div>
					<ul style={uvStyles.ul}>
						{unverified.map((un)=>(
						<li style={uvStyles.li} key={un.id}
						onClick={()=>onClickUnverSel(un)} >
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
    unverified: state.data.verify.unverified
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  	onGetUnver: () => {
  		dispatch(fetchUnverified())
  	}, 
  	onUnverSel: (unver_sel) => {
  		dispatch(setUnverSel(unver_sel))
  	},
    pushPath: (path) => {
      dispatch(pushPath(path))
    },  	
  	dispatch
  };
};

//Unverified = Radium(Unverified);
Unverified = connect(mapStateToProps,mapDispatchToProps)(Unverified)
export {Unverified};