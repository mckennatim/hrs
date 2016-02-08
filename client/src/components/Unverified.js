import React from 'react';
import Radium from 'radium';
import color from 'color';
import {connect} from 'react-redux';
import {fetchUnverified} from '../actions' 
import {uvStyles} from '../styles'

@Radium
class Unverified extends React.Component{
	componentDidMount() {
		const {dispatch} = this.props
    dispatch(fetchUnverified())		
	}
	render() {
		const {unverified, onGetUnver} = this.props
		return (
			<div>
				<div>
					<h3>Un-verified Addresses</h3>
			 		<button button onClick={() => onGetUnver()} >
			 			Refresh
			 		</button><br/>					
				</div>
					<ul style={uvStyles.ul}>
						{unverified.map((un)=>(
						<li style={uvStyles.li} key={un.value.id}>
							<a style={uvStyles.lia} key={un.value.id}>
								{un.value.label}
							</a>
						</li>
						))}
					</ul>			
				<div>
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
  	dispatch
  };
};

//Unverified = Radium(Unverified);
Unverified = connect(mapStateToProps,mapDispatchToProps)(Unverified)
export {Unverified};