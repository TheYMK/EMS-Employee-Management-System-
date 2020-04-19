var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var Project = require('../../models/project');
const Leave = require('../../models/leave');
var middleware = require('../../middleware');

let allBlogs;

Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - render hr home page

router.get('/homehr', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const foundDepartment = await Department.findOne({ department_name: foundEmployee.department });
		res.render('hr/index', {
			employee: foundEmployee,
			department: foundDepartment,
			blogs: allBlogs
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
