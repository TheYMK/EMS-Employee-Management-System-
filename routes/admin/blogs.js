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

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all blogs
router.get('/homeadmin/blogs', middleware.isLoggedIn, function(req, res) {
	Blog.find({ ownedBy: req.user.company_name }, function(err, allBlogs) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
		} else {
			res.render('admin/blogs/index', { blogs: allBlogs });
		}
	});
});

// NEW - Show a new blog form
router.get('/homeadmin/blogs/new', middleware.isLoggedIn, function(req, res) {
	res.render('admin/blogs/new', { blogs: allBlogs });
});

// CREATE - Create a new blog
router.post('/homeadmin/blogs', middleware.isLoggedIn, function(req, res) {
	var blogTitle = req.body.blogTitle;
	var blogImage = req.body.blogImage;
	var blogContent = req.sanitize(req.body.blogContent);
	var owner = req.user.company_name;
	var author = {
		id: req.user.id,
		username: req.user.username
	};
	var newBlog = { title: blogTitle, image: blogImage, content: blogContent, ownedBy: owner, author };

	Blog.create(newBlog, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
		} else {
			console.log(newlyCreated);
			res.redirect('/homeadmin/blogs');
		}
	});
});

// SHOW - Show info about one specific blog
router.get('/homeadmin/blogs/:id', middleware.isLoggedIn, function(req, res) {
	Blog.findById(req.params.id).populate('comments').exec(function(err, foundBlog) {
		if (err || !foundBlog) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.render('admin/blogs/show', { blog: foundBlog, blogs: allBlogs });
		}
	});
});

// EDIT - Show edit form of one blog
router.get('/homeadmin/blogs/:id/edit', middleware.checkBlogOwnership, function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err || !foundBlog) {
			req.flash('error', 'Blog not found');
			console.log(err);
		} else {
			res.render('admin/blogs/edit', { blog: foundBlog, blogs: allBlogs });
		}
	});
});

// UPDATE - Update a particular blog
router.put('/homeadmin/blogs/:id', middleware.checkBlogOwnership, function(req, res) {
	req.body.blog.content = req.sanitize(req.body.blog.content);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/homeadmin/blogs');
		} else {
			res.redirect('/homeadmin/blogs/' + req.params.id);
		}
	});
});

// DESTROY - Delete a particular blog
router.delete('/homeadmin/blogs/:id', middleware.checkBlogOwnership, function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err, blog) {
		if (err) {
			res.redirect('/homeadmin/blogs');
		} else {
			blog.remove();
			res.redirect('/homeadmin/blogs');
		}
	});
});

module.exports = router;
