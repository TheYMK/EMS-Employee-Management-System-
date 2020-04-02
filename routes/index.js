var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Company = require('../models/company');

//landing page route
router.get('/', function(req, res) {
	res.render('landing');
});

//SHOW register form
router.get('/register', function(req, res) {
	res.render('register');
});

//handle registration logic
router.post('/register', function(req, res) {
	var sel = req.body.user_role;

	var newUser = new User({
		username: req.body.username,
		user_email: req.body.user_email,
		user_role: sel,
		company_name: req.body.company_name,
		company_email: req.body.company_email,
		company_phone: req.body.company_phone,
		company_address: req.body.company_address,
		company_type: req.body.company_type,
		company_city: req.body.company_city,
		company_size: req.body.company_size,
		company_description: req.body.company_description
	});

	var newCompany = new Company({
		name: req.body.company_name,
		city: req.body.company_city,
		type: req.body.company_type,
		address: req.body.company_address,
		email: req.body.company_email,
		phone: req.body.company_phone,
		size: req.body.company_size,
		description: req.body.company_description
	});

	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.redirect('/');
		}
		passport.authenticate('local')(req, res, function() {
			if (user.user_role === 'Admin') {
				res.redirect('/homeadmin');
			} else if (user.user_role === 'HOD') {
				res.redirect('/homebasic');
			} else if (user.user_role === 'HR') {
				res.redirect('/homebasic');
			} else {
				res.redirect('/homeemployee');
			}
		});
	});

	Company.create(newCompany, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			console.log(newlyCreated);
		}
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
			res.redirect('back');
		} else {
			if (user != null && user.company_name === req.body.company_name) {
				if (user.user_role === 'Admin') {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homeadmin');
					});
				} else if (user.user_role === 'HOD') {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homebasic');
					});
				} else if (user.user_role === 'HR') {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homebasic');
					});
				} else {
					passport.authenticate('local')(req, res, function() {
						res.redirect('/homeemployee');
					});
				}
			} else {
				res.redirect('back');
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
