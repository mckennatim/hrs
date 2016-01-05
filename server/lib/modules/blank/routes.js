var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();
	router.get('/blank', function(req, res) {
		// Display the Login page with any flash message, if any
		res.send('in a blank module of the api');
	});
	return router;
})();