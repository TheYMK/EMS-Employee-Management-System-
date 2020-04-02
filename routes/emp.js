var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');
var Department = require('../models/department');

// INDEX - employee home page
router.get('/homeemployee', function(req, res) {
	res.render('emp/index');
});

module.exports = router;
