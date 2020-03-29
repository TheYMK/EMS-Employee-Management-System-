var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');

// INDEX - admin home page
router.get('/homeadmin', function(req, res) {
	res.render('home/homeadmin');
});

// temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

module.exports = router;
