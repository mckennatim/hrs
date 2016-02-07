import React from 'react';
import {connect} from 'react-redux';
import {fetchUnverified} from '../actions'

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
			 			get unverified
			 		</button><br/>					
				</div>
					<ul>
						<li></li>
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

Unverified = connect(mapStateToProps,mapDispatchToProps)(Unverified)
export {Unverified};