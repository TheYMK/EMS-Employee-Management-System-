var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var middleware = require('../../middleware');

// INDEX - admin home page
router.get('/homeadmin', middleware.isLoggedIn, function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			console.log(err);
			return res.redirect('back');
		}
		Blog.find({}, function(err, allBlogs) {
			if (err) {
				console.log(err);
				return res.redirect('back');
			}

			res.render('admin/index', { departments: allDepartments, blogs: allBlogs });
		});
	});
});

// temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

module.exports = router;
