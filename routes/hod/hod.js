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
const Leave = require('../../models/leave');
const Payroll = require('../../models/payroll');
const middleware = require('../../middleware');

// INDEX - render hod home page
router.get('/homehod', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});

		res.render('hod/index', { employee: foundEmployee, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
