const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const Payroll = require('../../models/payroll');
const middleware = require('../../middleware');

// INDEX - display all payrolls
router.get('/homehr/payrolls', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allPayrolls = await Payroll.find({});
		const allBlogs = await Blog.find({});
		const allEmployees = await Employee.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);

		res.render('hr/payrolls/index', {
			payrolls: allPayrolls,
			blogs: allBlogs,
			employees: allEmployees,
			employee: foundEmployee
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT - display edit form of a payroll
router.get('/homehr/payrolls/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const foundPayroll = await Payroll.findById(req.params.id);
		const foundEmployee = await Employee.findById(foundPayroll.employee.id);
		const allBlogs = await Blog.find({});

		res.render('hr/payrolls/edit', {
			payroll: foundPayroll,
			employee: foundEmployee,
			blogs: allBlogs
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE - update a particular payroll status
router.put('/homehr/payrolls/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		let payroll = {
			status: 'Paid'
		};
		const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id, payroll);

		console.log(updatedPayroll);
		return res.redirect('/homehr/payrolls/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DESTROY - delete a particular payroll
router.delete('/homehr/payrolls/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const deletedPayroll = await Payroll.findByIdAndRemove(req.params.id);
		res.redirect('/homehr/payrolls');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
