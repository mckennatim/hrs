const uvStyles ={
	ul: {  
		listStyleType: 'none',
  	width: 320,
  	background: 'lightcyan'
	},
	li: {
	  padding: 10,
	  overflow: 'auto',
	  borderBottom: '1px solid green',
    ':hover': {
    	transform: 'translateX(30px) rotate(7deg) scale(1.3,1.3)',
      backgroundColor: 'aquamarine'
    },

	},
	lia: {
	  textDecoration: 'none',
	  color: 'green',
	  display: 'block',
	  width: 300,



	}

}

export {uvStyles}