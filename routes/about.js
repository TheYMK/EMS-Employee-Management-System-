var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Blog = require('../models/blog');
var Comment = require('../models/comment');
var Company = require('../models/company');
var Department = require('../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../models/employee');
var Project = require('../models/project');
var Payroll = require('../models/payroll');
var middleware = require('../middleware');

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// SHOW - Display about show page
router.get('/about', middleware.isLoggedIn, function(req, res) {
	res.render('about/show', { blogs: allBlogs });
});

module.exports = router;
