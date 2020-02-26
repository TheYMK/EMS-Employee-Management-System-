var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//landing page route
router.get('/', function(req, res) {
	res.render('landing');
});

//SHOW register form
router.get('/register', function(req, res) {
	res.render('register');
});

// // temporary route
// router.get('/home', function(req, res) {
// 	res.send('Home Page');
// });

//handle registration logic
router.post('/register', function(req, res) {
	var sel = req.body.role;

	var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		role: sel,
		companyName: req.body.companyName,
		companyLocation: req.body.companyLocation,
		companySize: req.body.companySize
	});

	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			return res.redirect('/');
		}
		passport.authenticate('local')(req, res, function() {
			res.redirect('/home');
		});
	});
});

module.exports = router;
