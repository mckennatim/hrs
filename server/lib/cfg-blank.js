var secret = 'some phrase to be used to encode token';
var url = 'http://localhost'
var port = 3000;
var db= 'test';

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
		    pass: "xxxxxxx" 
      	}		
	}
}

exports.db = function(){
	return{
		url: 'mongodb://localhost/'+db,
		db: db		
	}
}