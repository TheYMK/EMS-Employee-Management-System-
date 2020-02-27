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

//temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

router.get('/homeadmin', function(req, res) {
	res.render('home/homeadmin');
});

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
			if (user.role === 'Admin') {
				res.redirect('/homeadmin');
			} else {
				res.redirect('/homebasic');
			}
		});
	});
});

//SHOW login form
router.get('/login', function(req, res) {
	res.render('login');
});

//handle login logic
// router.post('/login', passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login' }), function(
// 	req,
// 	res
// ) {});
router.post('/login', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (err) {
			res.redirect('/login');
		} else {
			if (user.companyName === req.body.companyName) {
				if (user.role === 'Admin') {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homeadmin');
					});
				} else {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homebasic');
					});
				}
			} else {
				res.redirect('login');
			}
		}
	});
});

//Handle logout logic
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/');
});

module.exports = router;
