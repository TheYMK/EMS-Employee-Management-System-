const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const Company = require('../models/company');
const Department = require('../models/department');
const expressSanitizer = require('express-sanitizer');
const Employee = require('../models/employee');
const Project = require('../models/project');
const Payroll = require('../models/payroll');
const middleware = require('../middleware');

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
