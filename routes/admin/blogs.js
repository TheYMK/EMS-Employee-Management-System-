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
router.get('/blogs', middleware.isLoggedIn, async (req, res) => {
	try {
		// finding all blogs
		const allBlogs = await Blog.find({ ownedBy: req.user.company_name });
		const foundEmployee = await Employee.findOne({ employee_id: req.user.username });

		res.render('admin/blogs/index', { blogs: allBlogs, employee: foundEmployee });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// NEW - Show a new blog form
router.get('/blogs/new', middleware.isLoggedIn, async (req, res) => {
	try {
		const foundEmployee = await Employee.findOne({ employee_id: req.user.username });
		res.render('admin/blogs/new', { blogs: allBlogs, employee: foundEmployee });
	} catch (err) {
		console.log(err);
	}
});

// CREATE - Create a new blog
router.post('/blogs', middleware.isLoggedIn, async (req, res) => {
	try {
		let blogTitle = req.body.blogTitle;
		let blogImage = req.body.blogImage;
		let blogContent = req.sanitize(req.body.blogContent);
		let owner = req.user.company_name;
		let author = {
			id: req.user.id,
			username: req.user.username
		};
		let newBlog = { title: blogTitle, image: blogImage, content: blogContent, ownedBy: owner, author };

		const newlyCreated = await Blog.create(newBlog);
		console.log(newlyCreated);
		res.redirect('/blogs');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// SHOW - Show info about one specific blog
router.get('/blogs/:id', middleware.isLoggedIn, async function(req, res) {
	Blog.findById(req.params.id).populate('comments').exec(async function(err, foundBlog) {
		if (err || !foundBlog) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			try {
				const foundEmployee = await Employee.findOne({ employee_id: req.user.username });
				return res.render('admin/blogs/show', { blog: foundBlog, blogs: allBlogs, employee: foundEmployee });
			} catch (err) {
				req.flash('error', err.message);
				return res.redirect('back');
			}
		}
	});
});

// EDIT - Show edit form of one blog
router.get('/blogs/:id/edit', middleware.checkBlogOwnership, async (req, res) => {
	try {
		const foundBlog = await Blog.findById(req.params.id);
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findOne({ employee_id: req.user.username });

		res.render('admin/blogs/edit', { blog: foundBlog, blogs: allBlogs, employee: foundEmployee });
	} catch (err) {
		console.log(err);
		req.flash('error', 'Blog not found');
		return res.redirect('back');
	}
});

// UPDATE - Update a particular blog
router.put('/blogs/:id', middleware.checkBlogOwnership, async (req, res) => {
	try {
		req.body.blog.content = req.sanitize(req.body.blog.content);
		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body.blog);

		res.redirect('/blogs/' + req.params.id);
	} catch (err) {
		req.flash('error', err.message);
		return res.redirect('/blogs');
	}
});

// DESTROY - Delete a particular blog
router.delete('/blogs/:id', middleware.checkBlogOwnership, async (req, res) => {
	try {
		const blog = await Blog.findByIdAndRemove(req.params.id);
		blog.remove();
		res.redirect('/blogs');
	} catch (err) {
		req.flash('error', err.message);
		return res.redirect('/blogs');
	}
});

module.exports = router;
