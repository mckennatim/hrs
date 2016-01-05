import {expect} from 'chai';
var request= require('request');
var cons = require('tracer').console();
var mconn = require('../lib/cfg').db().mysql;
console.log(mconn)

var mysql      = require('mysql');
var connection = mysql.createConnection(mconn);

connection.connect();
//console.log(connection.config);
var conf = connection.config;
var locations;

describe("connection",()=>{
	var post ={location: '12 Parley Vale, Jamaica Plain, MA 02130', st:'MA'}
	it('connects', ()=>{
		expect(conf.user).to.equal('root');
		expect(conf.database).to.equal('forecast');
	});
	it('selects 1+1',(done)=>{
		connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
		  if (err) throw err;
		  expect(rows[0].solution).to.equal(2);
		  done();
		});
	});
	it('select from locations', (done)=>{
		connection.query('SELECT * FROM locations', function(err, rows, fields) {
		  if (err) throw err;
		  var sol =rows[2].location
		  console.log(sol);
		  expect(sol).to.equal('Climax Mine, Colorado')
		  done();
		});
	});
	it('inserts into locations home',(done)=>{
		connection.query('INSERT INTO `locations` SET ?', post, function(err, result) {
		  if (err) throw err;
		  //console.log(result)
		  expect(result.affectedRows).to.equal(1)
		  done();
		});
	})
	it('deletes locations home',(done)=>{
		connection.query('DELETE FROM `locations` WHERE `location` ="'+post.location+'" ', post, function(err, result) {
		  if (err) throw err;
		  //console.log(result)
		  expect(result.affectedRows).to.equal(2)
		  done();
		});
	})
	it('inserts into locations home',(done)=>{
		connection.query('INSERT INTO `locations` SET ?', post, function(err, result) {
		  if (err) throw err;
		  //console.log(result)
		  expect(result.affectedRows).to.equal(1)
		  done();
		});
	})
	it('lists locations from array, foreach `loc+dog` does not alter locations ',(done)=>{
		connection.query('SELECT location from locations', post, function(err, rows, fields) {
		  if (err) throw err;
		 	locations= rows.map((row)=>{
		 		//console.log(row.location)
		 		return row.location
		 	})
		 	locations.forEach((loc)=>{
		 		loc = loc+'  dog';
		 		//console.log(loc) 
		 	})
		 	//console.log(locations)
		  expect(locations[2]).to.equal('Climax Mine, Colorado')
		  expect(locations[2]).to.equal(rows[2].location)
		  done();
		});
	});
	it('gets 1 location then looks up its address', (done)=>{
		connection.query('SELECT location,	st from locations', post, function(err, rows, fields) {
		  if (err) throw err;
		 	locations= rows.map((row)=>{
		 		return row.location+', '+row.st
		 	})
		 	//console.log(locations)
		 	var addr = locations.map((loc)=>{
		 		var eaddr = loc.split(' ').join('+').replace(/,/g,'')
		 		//console.log(eaddr)
		 		//http://maps.googleapis.com/maps/api/geocode/json?address=Mt+Rainier+Paradise+Station,+Washington&sensor=false
		 		//http://maps.googleapis.com/maps/api/geocode/json?address=12+prley+Vale+Jamaica+Plain+Ma+02130&sensor=false
				// request('http://maps.googleapis.com/maps/api/geocode/json?address='+eaddr+'&sensor=false', function (error, response, body) {
				// 	console.log('error')
				//   if (!error && response.statusCode == 200) {
			 //    	console.log(body)
			 //    	cons.log(typeof(body))
			 //    	var gdata =JSON.parse(body)
			 //    	cons.log(gdata.results[0].geometry.location)
			 //    	return gdata.results[0].geometry.location
				//   }
				return eaddr;
		 	})
		})
		done()
	})

});