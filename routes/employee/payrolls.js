var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var Project = require('../../models/project');
var Payroll = require('../../models/payroll');
var middleware = require('../../middleware');

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all payrolls
router.get('/homeemployee/employees/:id/payrolls', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Payroll.find({}, function(err, allPayroll) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					res.render('emp/payrolls/index', {
						employee: foundEmployee,
						payrolls: allPayroll,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

module.exports = router;
