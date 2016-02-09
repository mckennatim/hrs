import fetch from 'isomorphic-fetch'
import {increase, decrease} from './count'
import {fetchAddr, selAddr, fetchUnverified, setUnverSel} from './verify'
import {setDeviceType} from './app'



export {increase, decrease, fetchAddr, selAddr, 
	fetchUnverified, setDeviceType, setUnverSel};