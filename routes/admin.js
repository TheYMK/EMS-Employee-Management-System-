var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');
var Department = require('../models/department');

// INDEX - admin home page
router.get('/homeadmin', function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			console.log(err);
			return res.redirect('back');
		}
		res.render('admin/index', { departments: allDepartments });
	});
});

// temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

module.exports = router;
