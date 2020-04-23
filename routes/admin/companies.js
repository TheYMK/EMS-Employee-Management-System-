var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var middleware = require('../../middleware');

// SHOW - show info about one specific company
router.get('/homeadmin/companies/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const foundCompany = await Company.findById(req.params.id);
		const allBlogs = await Blog.find({});

		res.render('admin/companies/show', { company: foundCompany, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
	}
});

module.exports = router;
