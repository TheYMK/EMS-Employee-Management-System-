var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var middleware = require('../../middleware');

// INDEX - admin home page
router.get('/homeadmin', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		// finding all departments and blogs
		const allDepartments = await Department.find({});
		const allBlogs = await Blog.find({});

		res.render('admin/index', { departments: allDepartments, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

module.exports = router;
