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

var currentEmployee;
// INDEX - list all projects
router.get('/homeemployee/projects', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.user.employee.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Project.find({ company: req.user.company_name }, function(err, allProjects) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					currentEmployee = foundEmployee;
					res.render('emp/projects/index', {
						projects: allProjects,
						employee: foundEmployee,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

// SHOW - show info about one specific project
router.get('/homeemployee/projects/:id', middleware.isLoggedAsEmployee, function(req, res) {
	Project.findById(req.params.id, function(err, foundProject) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Employee.find({}, function(err, allEmployees) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					// not useful
					allEmployees.forEach(function(emp) {
						foundProject.employees.push(emp);
					});

					res.render('emp/projects/show', {
						project: foundProject,
						employees: allEmployees,
						employee: currentEmployee,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

module.exports = router;
