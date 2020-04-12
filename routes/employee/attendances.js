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

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - render index page to show options for attendances
router.get('/homeemployee/employees/:id/attendances', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			return res.redirect('back');
		}

		res.render('emp/attendances/index', {
			employee: foundEmployee,
			datenow: today,
			blogs: allBlogs
		});
	});
});

// Update - update employee to set attendances
router.put('/homeemployee/employees/:id/attendances', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			if (foundEmployee.hasOwnProperty('attendances')) {
				var attendance = {
					date: today
				};

				foundEmployee.attendances.push(attendance);
			} else {
				var attendance = {
					date: today
				};
				foundEmployee.attendances.push(attendance);
			}

			foundEmployee.save();

			if (foundEmployee.attendances.length >= 30) {
				var newPayroll = {
					employee: {
						id: req.params.id,
						employee_id: foundEmployee.employee_id
					},

					start_date: foundEmployee.attendances[0].date,
					end_date: foundEmployee.attendances[foundEmployee.attendances.length - 1].date
				};
				foundEmployee.attendances.splice(0, foundEmployee.attendances.length);
				Payroll.create(newPayroll, function(err, newlyCreated) {
					if (err) {
						console.log(err);
					} else {
					}
				});
			}

			res.redirect('/homeemployee/employees/' + req.params.id + '/attendances');
		}
	});
});

module.exports = router;
