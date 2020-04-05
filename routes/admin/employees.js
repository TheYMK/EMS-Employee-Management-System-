var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
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

// INDEX - list all employees
router.get('/homeadmin/employees', middleware.isLoggedIn, function(req, res) {
	Employee.find({}, function(err, allEmployees) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
		} else {
			res.render('admin/employees/index', { employees: allEmployees, blogs: allBlogs });
		}
	});
});

// NEW - show a new employees form
router.get('/homeadmin/employees/new', middleware.isLoggedIn, function(req, res) {
	Department.find({}, function(err, allDepartment) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
		} else {
			res.render('admin/employees/new', { departments: allDepartment, blogs: allBlogs });
		}
	});
});

// CREATE - create a new employee
router.post('/homeadmin/employees', middleware.isLoggedIn, function(req, res) {
	Employee.create(req.body.employee, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			console.log(newlyCreated);
			var pwd = '2020' + newlyCreated.passport_no;
			var pwdUpdate = { password: pwd };
			Employee.findByIdAndUpdate(newlyCreated._id, pwdUpdate, function(err, updated) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					var newUser = new User({
						username: newlyCreated.employee_id,
						user_email: newlyCreated.email,
						user_role: newlyCreated.designation,
						company_name: newlyCreated.company
					});

					User.register(newUser, pwd, function(err, user) {
						if (err) {
							console.log(err);
							return res.redirect('back');
						}

						res.redirect('/homeadmin/employees');
					});
				}
			});
		}
	});
});

// SHOW - show info about one specific employee
router.get('/homeadmin/employees/:id', middleware.isLoggedIn, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.render('admin/employees/show', { emp: foundEmployee, blogs: allBlogs });
		}
	});
});

// EDIT - show edit form of one employee
router.get('/homeadmin/employees/:id/edit', middleware.isLoggedIn, function(req, res) {
	Employee.findById(req.params.id, function(err, foundEmployee) {
		if (err || !foundEmployee) {
			console.log(err);
			req.flash('error', 'Employee not found');
			res.redirect('back');
		} else {
			Department.find({}, function(err, allDepartments) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					res.render('admin/employees/edit', {
						emp: foundEmployee,
						departments: allDepartments,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

// UPDATE - update a particular employee
router.put('/homeadmin/employees/:id', middleware.isLoggedIn, function(req, res) {
	Employee.findByIdAndUpdate(req.params.id, req.body.employee, function(err, updatedEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.redirect('/homeadmin/employees/' + req.params.id);
		}
	});
});

// DELETE - delete a particular employee
router.delete('/homeadmin/employees/:id', middleware.isLoggedIn, function(req, res) {
	Employee.findByIdAndRemove(req.params.id, function(err, deletedEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			User.findOneAndRemove({ username: deletedEmployee.employee_id }, function(err, removed) {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/homeadmin/employees');
				}
			});
		}
	});
});

module.exports = router;
