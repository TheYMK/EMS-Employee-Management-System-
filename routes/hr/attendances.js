const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const middleware = require('../../middleware');

// INDEX - list all attendances
router.get('/homehr/attendances', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allEmployees = await Employee.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		res.render('hr/attendances/index', { employees: allEmployees, employee: foundEmployee, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
