const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const middleware = require('../../middleware');

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all employees
router.get('/homehr/employees', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allEmployees = await Employee.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);
		res.render('hr/employees/index', {
			employees: allEmployees,
			blogs: allBlogs,
			employee: foundEmployee
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

router.get('/homehr/employees/new', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		let allDepartments = await Department.find({});
		let foundEmployee = await Employee.findById(req.user.employee.id);
		res.render('hr/employees/new', { departments: allDepartments, employee: foundEmployee, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// CREATE - create a new employee
router.post('/homehr/employees', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const newlyCreated = await Employee.create(req.body.employee);
		console.log(newlyCreated);
		var pwd = '2020' + newlyCreated.passport_no;
		var pwdUpdate = { password: pwd };
		const emp = await Employee.findByIdAndUpdate(newlyCreated._id, pwdUpdate);
		const foundDepartment = await Department.findOne({ department_name: emp.department });

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

		const user = await User.register(newUser, pwd);

		res.redirect('/homehr/employees');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		res.redirect('back');
	}
});

// SHOW - show info about one specific employee
router.get('/homehr/employees/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.params.id);
		res.render('hr/employees/show', { emp: foundEmployee, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		res.redirect('back');
	}
});

// EDIT - show edit form of one employee
router.get('/homehr/employees/:id/edit', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.params.id);
		const allDepartments = await Department.find({});

		res.render('hr/employees/edit', {
			emp: foundEmployee,
			departments: allDepartments,
			blogs: allBlogs
		});
	} catch (err) {
		console.log(err);
		req.flash('error', 'Employee not found');
		res.redirect('back');
	}
});

// UPDATE - update a particular employee
router.put('/homehr/employees/:id', middleware.isLoggedInAsHR, async (req, res) => {
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

		res.redirect('/homehr/employees/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		res.redirect('back');
	}
});

// DELETE - delete a particular employee
router.delete('/homehr/employees/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
		const removedUser = await User.findOneAndRemove({ username: deletedEmployee.employee_id });
		res.redirect('/homehr/employees');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		res.redirect('back');
	}
});

module.exports = router;
