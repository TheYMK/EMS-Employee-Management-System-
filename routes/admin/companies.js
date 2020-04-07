var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var middleware = require('../../middleware');

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// SHOW - show info about one specific company
router.get('/homeadmin/companies/:id', function(req, res) {
	Company.findById(req.params.id, function(err, foundCompany) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/companies/show', { company: foundCompany, blogs: allBlogs });
		}
	});
});

module.exports = router;
