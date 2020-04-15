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

// INDEX - display all payrolls
router.get('/homeadmin/payrolls', middleware.isLoggedInAsAdmin, function(req, res) {
	Payroll.find({}, function(err, allPayrolls) {
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
					res.render('admin/payrolls/index', {
						payrolls: allPayrolls,
						blogs: allBlogs,
						employees: allEmployees
					});
				}
			});
		}
	});
});

// EDIT - display edit form of a payroll
router.get('/homeadmin/payrolls/:id', middleware.isLoggedInAsAdmin, function(req, res) {
	Payroll.findById(req.params.id, function(err, foundPayroll) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Employee.findById(foundPayroll.employee.id, function(err, foundEmployee) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					res.render('admin/payrolls/edit', {
						payroll: foundPayroll,
						employee: foundEmployee,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

// UPDATE - update a particular payroll status
router.put('/homeadmin/payrolls/:id', middleware.isLoggedInAsAdmin, function(req, res) {
	let payroll = {
		status: 'Payed'
	};

	Payroll.findByIdAndUpdate(req.params.id, payroll, function(err, updatedPayroll) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			console.log(updatedPayroll);
			res.redirect('/homeadmin/payrolls/' + req.params.id);
		}
	});
});

// DESTROY - delete a particular payroll
router.delete('/homeadmin/payrolls/:id', middleware.isLoggedInAsAdmin, function(req, res) {
	Payroll.findByIdAndRemove(req.params.id, function(err, deletedPayroll) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.redirect('/homeadmin/payrolls');
		}
	});
});
module.exports = router;
