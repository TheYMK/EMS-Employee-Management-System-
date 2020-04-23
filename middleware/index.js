var Employee = require('../models/employee');
var Blog = require('../models/blog');
var Comment = require('../models/comment');
var Department = require('../models/department');
var User = require('../models/user');
var Company = require('../models/company');
var middlewareObj = {};

// Checking blog ownership
middlewareObj.checkBlogOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Blog.findById(req.params.id, function(err, foundBlog) {
			if (err || !foundBlog) {
				req.flash('error', 'Blog not found');
				res.redirect('back');
			} else {
				//does a user own the blog
				if (foundBlog.author.id.equals(req.user.id) || req.user.user_role === 'Admin') {
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

//  Checking comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err || !foundComment) {
				req.flash('error', 'Comment not found');
				res.redirect('back');
			} else {
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', "You don't have permission to do that");
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}
};

// Check if user is logged in as Admin
middlewareObj.isLoggedInAsAdmin = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.user_role === 'Admin') {
			return next();
		}
	}

	req.flash('error', 'Only Admin allowed to see this page');
	res.redirect('/login');
};

// Check if user is logged in as Employee
middlewareObj.isLoggedAsEmployee = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.user_role !== 'Admin' && req.user.user_role !== 'HR' && req.user.user_role !== 'HOD') {
			return next();
		}
	}

	req.flash('error', 'Only Employee allowed to see this page');
	res.redirect('/login');
};

// Check if user is logged in as HR
middlewareObj.isLoggedInAsHR = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.user_role === 'HR') {
			return next();
		}
	}

	req.flash('error', 'Only HR allowed to see this page');
	res.redirect('/login');
};

// Check if user is logged in as HOD
middlewareObj.isLoggedInAsHOD = function(req, res, next) {
	if (req.isAuthenticated()) {
		if (req.user.user_role === 'HOD') {
			return next();
		}
	}

	req.flash('error', 'Only HOD allowed to see this page');
	res.redirect('/login');
};

// Check if user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You need to be logged in to do that');
	res.redirect('/login');
};

module.exports = middlewareObj;
