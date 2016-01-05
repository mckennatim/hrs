var mysql = require('mysql');
var mconn = require('../../cfg').db().mysql;
var connection = mysql.createConnection(mconn);

function getv(){
	console.log('dogfood')
}

var ydb= {
	getv:getv
}

getv()