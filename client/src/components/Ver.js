import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {fetchAddr, selAddr, fetchUnverified} from '../actions'
import {Gmaps} from 'react-gmaps';
import Select from 'react-select';

const VerIn = ({onClick, onGet, unverified}) => {
	console.log(unverified)
	let input
	const logChange = (v) => {
		const vs = JSON.parse(v)
		console.log(vs.label)
		input.value = vs.label
		onClick(vs.label)
	}
	return (
		<div>
	 		<h4>Verify an address</h4>
	 		<button button onClick={() => onGet()} >
	 			get unverified
	 		</button><br/>
	 		{unverified}
			<Select
			    name="form-field-name"
			    value="one"
			    unverified={unverified}
			    onChange={logChange}
			/>	    
	    
	 		<input type="text" size="60" ref={node => {input = node;}} defaultValue='12 Parley Vale, Jamaica Plain, MA 02130'/><br/>
	 		<button onClick={() => {
	      onClick(input.value);
	    }}>
	      Find in weather
	    </button><br/>
	 	</div>
	)
}

const VerOut = ({candidates, selected, updSelected, dogs, dos}) => {
	console.log(candidates)
	console.log(dogs)
	console.log(dos)
	if(dos.length==0) {
		dos[0]='rintintin'
	}else{
		console.log('is defined')
	}
	
	const cngSelected = (i) => {
		console.log(candidates[i].formatted_address)
		let coords = candidates[i].geometry.location
		console.log(coords)
		let selected ={}
		selected.address=candidates[i].formatted_address
		selected.location=coords
		updSelected(selected)
	}

	return(
		<div>
			dog
			<ul>
				{candidates.map((c, i) => 
					<li key={i} onClick={()=>cngSelected(i)}>
						<span> {c.formatted_address}<br/>

					 	</span> 
				 	</li>
				)}
			</ul>
      <Gmaps
        width={'400px'}
        height={'300px'}
        lat={selected.location.lat}
        lng={selected.location.lng}
        zoom={15}
        loadingMessage={'Be happy'}
        params={{v: '3.exp'}}
        >
      </Gmaps>			
		</div>
	)
}

const Veri = ({onRawInput, onGetUnver, onSelected, candidates, 
		selected, unverified, dogs, dos}) => {
	//console.log(unverified)
	let mapProps = {
    center: [59.938043, 30.337157],
    zoom: 9, 
	} 
	return(
		<div>
		<VerIn onClick={(val) => onRawInput(val)} 
			onGet={() => onGetUnver()} 
			unverified={unverified}>
		</VerIn>
		<VerOut candidates={candidates} selected={selected} updSelected={(selected) => onSelected(selected)} dogs={dogs} dos={dos}></VerOut>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
    candidates: state.data.verify.results,
    selected: state.data.verify.selected,
    unverified: state.data.verify.unverified,
    dogs: ['butler', 'uli', 'petey', 'fritz', 'rusty', 'dusty'],
    dos: []
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  	onRawInput: (val) => {
  		dispatch(fetchAddr(val))
  	},
  	onSelected: (selected) => {
  		dispatch(selAddr(selected))
  	},
  	onGetUnver: () => {
  		dispatch(fetchUnverified())
  	}
  };
};

const Ver = connect(mapStateToProps,mapDispatchToProps)
(Veri);

export {Ver};
