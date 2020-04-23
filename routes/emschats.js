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

// INDEX
router.get('/emschat', middleware.isLoggedIn, function(req, res) {
	Employee.findById(req.user.employee.id, function(err, foundEmployee) {
		if (err || !foundEmployee) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Department.findOne({ department_name: foundEmployee.department }, function(err, foundDepartment) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					res.render('emschat/index', { employee: foundEmployee, department: foundDepartment });
				}
			});
		}
	});
});

// SHOW
router.get('/emschat/chatroom', middleware.isLoggedIn, function(req, res) {
	res.render('emschat/show');
});

module.exports = router;
