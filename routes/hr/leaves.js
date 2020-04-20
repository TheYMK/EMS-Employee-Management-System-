const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const Payroll = require('../../models/payroll');
const Leave = require('../../models/leave');
const middleware = require('../../middleware');

// INDEX - list all leaves
router.get('/homehr/leaves', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allLeaves = await Leave.find({});
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);

		return res.render('hr/leaves/index', { leaves: allLeaves, blogs: allBlogs, employee: foundEmployee });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE - update a particular leave
router.put('/homehr/leaves/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		let leave = {
			status: 'Approved'
		};
		const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, leave);

		return res.redirect('/homehr/leaves');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DESTROY - delete a particular leave
router.delete('/homehr/leaves/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const deletedLeave = await Leave.findByIdAndRemove(req.params.id);

		res.redirect('/homehr/leaves');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
