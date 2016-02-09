import React from 'react';
import Radium from 'radium';
import color from 'color';
var Keypress = require("react-keypress");
import {connect} from 'react-redux';
import {fetchUnverified, setUnverSel, fetchAddr} from '../actions' 
import {uvStyles} from '../styles'



@Radium
class Register extends React.Component{
	constructor(props) {
		super(props)
		this.rawChanged = this.rawChanged.bind(this)
	}
	componentDidMount() {
		const {unver_sel, onRawInput} = this.props
		onRawInput(unver_sel.raw)
		var that=this
		document.getElementById("unver").addEventListener("keydown", function(event){
			that.rawChanged(event)			
		})
	}
	rawChanged(event){
		const {unver_sel, onRawInput}=this.props
		if(event.keyCode==13){
			console.log('pressed return')
			console.log(unver_sel)
			onRawInput(unver_sel.raw)
		}
	}
	componentWillUnmount() {
		document.getElementById("unver").removeEventListener("keydown",function(){})
	}
	render(){
		const {unver_sel, cngUnverSel, candidates}=this.props
		let input
		const onChange=(value)=>{
			const newobj = {id:unver_sel.id, raw:value}
			cngUnverSel(newobj)
		}
		return(
			<div>
				<h3>Register</h3>
				{unver_sel.raw} <br/>
					<input id="unver" type="text" ref={node => {input = node;}} 
					value={unver_sel.raw}
					onChange={()=>onChange(input.value)}
					style={uvStyles.inp}/><br/>
					<div>
						<br/>
						<ul style={uvStyles.ul}>
						{candidates.map((c, i) => 
							<li  style={uvStyles.li}  key={i} onClick={()=>cngSelected(i)}>
								<span> {c.formatted_address}<br/>

							 	</span> 
						 	</li>
						)}
						</ul>			
					</div>					
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    unver_sel: state.data.verify.unver_sel,
    candidates: state.data.verify.results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	cngUnverSel: (unver_sel) => {
  		dispatch(setUnverSel(unver_sel))
  	},  
  	onRawInput: (raw) => {
  		dispatch(fetchAddr(raw))
  	},  		
  	dispatch
  };
};


Register = connect(mapStateToProps,mapDispatchToProps)(Register)
export {Register}