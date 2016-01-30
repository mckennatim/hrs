import {increase, decrease} from './count'

const ckAddr = (raw) => {
	console.log(raw)
	return {
		type: 'CK_ADDR',
		raw
	}
}

export {increase, decrease, ckAddr};