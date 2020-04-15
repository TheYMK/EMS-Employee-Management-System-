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
