import React from 'react';

// class Ver extends React.component{
// 	constructor() {
//     super()
//   }
// 	render () {
// 		return <div>
// 			<h4>Verify an address</h4>
// 			<input type="text" size="60"/><br/>
// 			<button >Find in google</button>
// 	  </div>;
// 	}
// }

// module.exports = Ver;

module.exports = function Ver() {
  return <div>
		<h4>Verify an decent address</h4>
		<input type="text" size="60"/><br/>
		<button >Find in google</button>
  </div>;
}
