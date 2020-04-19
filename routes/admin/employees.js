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
router.get('/homeadmin/employees', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.get('/homeadmin/employees/new', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.post('/homeadmin/employees', middleware.isLoggedInAsAdmin, function(req, res) {
	Employee.create(req.body.employee, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			console.log(newlyCreated);
			var pwd = '2020' + newlyCreated.passport_no;
			var pwdUpdate = { password: pwd };
			Employee.findByIdAndUpdate(newlyCreated._id, pwdUpdate, function(err, emp) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					Department.findOne({ department_name: emp.department }, function(err, foundDepartment) {
						if (err) {
							console.log(err);
							res.redirect('back');
						} else {
							var newUser = new User({
								username: newlyCreated.employee_id,
								user_email: newlyCreated.email,
								user_role: newlyCreated.designation,
								company_name: newlyCreated.company,
								company: {
									id: req.user.company.id
								},
								employee: {
									id: emp.id
								},
								department: {
									id: foundDepartment.id
								}
							});

							// newUser.employees.push(updated);

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
		}
	});
});

// SHOW - show info about one specific employee
router.get('/homeadmin/employees/:id', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.get('/homeadmin/employees/:id/edit', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.put('/homeadmin/employees/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body.employee);

		let usr = {
			username: req.body.employee.employee_id
		};

		const updatedUser = await User.findOneAndUpdate({ 'employee.id': updatedEmployee.id }, usr);

		const foundUser = await User.findOne({ username: req.body.employee.employee_id });
		const foundDepartment = await Department.findOne({ department_name: req.body.employee.department });

		foundUser.department.id = foundDepartment.id;
		await foundUser.save();

		// Removing from employee user db
		await User.findOneAndRemove({ 'employee.id': updatedEmployee.id });

		// recreating user with new informations
		var pwd = '2020' + req.body.employee.passport_no;
		var pwdUpdate = { password: pwd };

		var newUser = new User({
			username: req.body.employee.employee_id,
			user_email: req.body.employee.email,
			user_role: req.body.employee.designation,
			company_name: req.body.employee.company,
			company: {
				id: req.user.company.id
			},
			employee: {
				id: updatedEmployee.id
			},
			department: {
				id: foundDepartment.id
			}
		});

		const user = await User.register(newUser, pwd);

		res.redirect('/homeadmin/employees/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		res.redirect('back');
	}
});

// DELETE - delete a particular employee
router.delete('/homeadmin/employees/:id', middleware.isLoggedInAsAdmin, function(req, res) {
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
