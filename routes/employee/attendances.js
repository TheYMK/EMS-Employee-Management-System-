const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const expressSanitizer = require('express-sanitizer');
const Employee = require('../../models/employee');
const Project = require('../../models/project');
const Payroll = require('../../models/payroll');
const middleware = require('../../middleware');

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

let allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - render index page to show options for attendances
router.get('/homeemployee/employees/:id/attendances', middleware.isLoggedAsEmployee, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.params.id);

		return res.render('emp/attendances/index', {
			employee: foundEmployee,
			datenow: today,
			blogs: allBlogs
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// Update - update employee to set attendances
router.put('/homeemployee/employees/:id/attendances', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			let yyyy = today.getFullYear();
			let hour = today.getHours();
			let minute = today.getMinutes();

			today = dd + '/' + mm + '/' + yyyy;

			if (minute.toString().length === 1) {
				minute = '0' + today.getMinutes();
			}

			let currentTime = hour + ':' + minute;

			if (foundEmployee.hasOwnProperty('attendances')) {
				let attendance = {
					date: today,
					time: currentTime
				};

				foundEmployee.attendances.push(attendance);
			} else {
				let attendance = {
					date: today,
					time: currentTime
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
