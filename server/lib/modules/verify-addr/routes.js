var express = require('express');


module.exports = (function() {
	'use strict';
	var router = express.Router();
	router.get('/verify-addr', function(req, res) {
		console.log('in verify-addr')
		res.send('now in a verify-addr module of the api/hrs');
	});
	return router;
})();