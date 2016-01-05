var secret = 'some phrase to be used to encode token';
var url = 'http://10.0.1.102'
var port = 3036;
var db= 'hero';

exports.cfg = function(){
	return{
		secret:secret,
		url:url,
		port: port
	}
}

exports.gmail= function() {
	return {
		service: 'Gmail',
		auth: {
		    user: "mckenna.tim@gmail.com",
		    pass: "Gonji9ol" 
      	}		
	}
}

exports.db = function(){
	return{
		mongo:{
			url: 'mongodb://localhost/'+db,
			db: db
		},
		mysql:{
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'forecast'			
		}				
	}
}