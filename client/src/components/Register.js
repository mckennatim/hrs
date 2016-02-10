import React from 'react';
import Radium from 'radium';
import color from 'color';
var Keypress = require("react-keypress");
import {connect} from 'react-redux';
import {fetchUnverified, setUnverSel, fetchAddr, selAddr} from '../actions' 
import {uvStyles} from '../styles'
const { pushPath } = require('redux-simple-router');

@Radium
class Register extends React.Component{
	constructor(props) {
		super(props)
		this.rawChanged = this.rawChanged.bind(this)
		this.unver = {}
		this.devchars =''
		this.isDev = false
	}
	componentDidMount() {
		const {unver_sel} = this.props
		this.devchars=unver_sel.devid
		this.ckDevid(this.devchars)
		this.unver = document.getElementById("unver")
		this.device = document.getElementById("device")
		var that = this
		this.unver.addEventListener("keydown", function(event){
			that.rawChanged(event)			
		})
		this.device.addEventListener("keydown", function(event){
			that.devChanged(event)			
		})
	}
	componentWillUnmount() {
		this.unver.removeEventListener("keydown",function(){})
		this.device.removeEventListener("keydown",function(){})
	}	
	rawChanged(event){
		const {unver_sel, onRawInput}=this.props
		if(event.keyCode==13){
			onRawInput(unver_sel.raw)
			this.unver.setAttribute("readonly", "readonly")
			this.unver.setAttribute("disabled", "true")
			setTimeout(function(){
				this.unver.removeAttribute("readonly")
				this.unver.removeAttribute("disabled")				
			},100)
			console.log(unver_sel)
		}
	}
	ckDevid (devchars){
		const {unver_sel, cngUnverSel}=this.props
		//a fake check, really would check device database
		if (this.devchars.length>6){
			console.log('devchars is longer than 6')
			const newusel = Object.assign({}, unver_sel, {
				isTheDev : true,
				devid: this.devchars					
			})
			console.log(newusel)
			cngUnverSel(newusel)
		}else{	
			const newusel = Object.assign({}, unver_sel, {
				isTheDev : false,
				devid: this.devchars				
			})
			console.log(newusel)
			cngUnverSel(newusel)						
		}	
	}
	devChanged(event){
		const {unver_sel, cngUnverSel}=this.props
		console.log(this.devchars)
		if(event.keyCode==13){
			console.log('hit enter')
			console.log(this.devchars)
			this.ckDevid(this.devchars)
		}
	}


	onDevChange(inp){
		this.devchars= inp
	}
	onRawChange(value){
		const {unver_sel, cngUnverSel}=this.props
		const newobj = {id:unver_sel.id, raw:value}
		cngUnverSel(newobj)		
	}
	selAddr(i) {
		const {candidates, cngUnverSel, pushPath, unver_sel} = this.props
		//console.log(candidates[i].formatted_address)
		let coords = candidates[i].geometry.location
		//console.log(coords)
		candidates[i].current = true
		let unveradd = {}
		unveradd.address=candidates[i].formatted_address
		unveradd.lat=coords.lat
		unveradd.lng=coords.lng
		unveradd.id = unver_sel.id
		unveradd.devid = unver_sel.devid
		unveradd.raw = unver_sel.raw
		unveradd.idx=i
		cngUnverSel(unveradd)
		pushPath('/maps')
	}
	showAddr (i){
		const {unver_sel} =this.props
		if(unver_sel.idx==i){
			return [
				{
	      	backgroundColor: 'aquamarine'	
      	},
      	uvStyles.li		
			]
		}else{
			return [
				uvStyles.li
			]
		}
	}		
	render(){
		const {unver_sel, candidates}=this.props
		let input, dev
		return(
			<div>
				<h3>Register</h3>
				<h4>Device: {unver_sel.devid}
					<span style={[
							{display:unver_sel.isTheDev?'inline':'none'}, 
							uvStyles.ck
						]}>&#10004;</span> </h4>
				<input id="device" type="text" ref={node => {dev = node;}} 
					defaultValue={unver_sel.devid}
					onChange={()=>this.onDevChange(dev.value)}
					style={uvStyles.inp}/><br/>
				<h4>Location: 
					<span style={[
							{display:unver_sel.isThePlace?'inline':'none'}, 
							uvStyles.ck
						]}>&#10004;</span> 
				</h4>
				<h5>raw</h5>	
					<input id="unver" type="text" ref={node => {input = node;}} 
					value={unver_sel.raw}
					onChange={()=>this.onRawChange(input.value)}
					style={uvStyles.inp}/><br/>
					<div>
						<h5>candidate locations</h5>	
						<ul style={uvStyles.ul}>
						{candidates.map((c, i) => {
							return (
								<li  style={this.showAddr(i)}  key={i} onClick={()=> this.selAddr(i)}>
									<span> {c.formatted_address}<br/>
								 	</span> 
							 	</li>
							)
						})}
						</ul>			
					</div>					
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    unver_sel: state.data.verify.unver_sel,
    selected: state.data.verify.selected,
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
  	updSelected: (selected) => {
  		dispatch(selAddr(selected))
  	}, 
    pushPath: (path) => {
      dispatch(pushPath(path))
    },  	  	 		
  	dispatch
  };
};


Register = connect(mapStateToProps,mapDispatchToProps)(Register)
export {Register}