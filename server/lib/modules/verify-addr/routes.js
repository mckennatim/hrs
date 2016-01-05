var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();
	router.get('/verify-addr', function(req, res) {
		// Display the Login page with any flash message, if any
		res.send('now in a verify-addr module of the api/hrs');
	});
	return router;
})();