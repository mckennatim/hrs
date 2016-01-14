var express = require('express');
import * as ydb from './db.js';
var mysql = require('mysql');
var mconn = require('../../cfg').db().mysql;
var connection = mysql.createConnection(mconn);

connection.connect();

ydb.getv(function(sol){
	console.log(sol.length)
});

module.exports = (function() {
	'use strict';
	var router = express.Router();
	router.get('/verify-addr', function(req, res) {
		console.log('in verify-addr')
		ydb.getv((sol)=>{
			res.send(sol)
		})
	});
	router.get('/verify-addr/like/:raw', function(req,res){
		console.log("in verify-addr/like:raw");
		var eraw = req.params.raw;
		var uraw = `%${decodeURI(eraw)}%`;
		var sql = "SELECT * FROM `locations` WHERE `raw` LIKE ?";
		var inserts =[uraw];
		sql = mysql.format(sql, inserts)
		console.log(sql)
		console.log(req.headers)
		connection.query(sql, function(err, rows, fields){
			if (err) throw err;
			//console.log(rows)
			res.send(rows);
		})
	});
	router.put('/verify-addr/:id', function(req,res){
		console.log("in verify-addr/id");
		var id = req.params.id;
		var upvals = req.body;
		console.log(upvals)
		var sql = "UPDATE locations SET ? WHERE id = ?";
		var inserts =[upvals, id];
		sql = mysql.format(sql, inserts)
		console.log(sql)
		// res.send('i did something')
		connection.query(sql, function(err,result){
			console.log(err)
			res.send(result)
		})
	});
	return router;
})();