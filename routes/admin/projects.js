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
var middleware = require('../../middleware');

var allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all projects
router.get('/homeadmin/projects', middleware.isLoggedIn, function(req, res) {
	Project.find({ company: req.user.company_name }, function(err, allProjects) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.render('admin/projects/index', { projects: allProjects, blogs: allBlogs });
		}
	});
});

// NEW - show a new project form
router.get('/homeadmin/projects/new', middleware.isLoggedIn, function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/projects/new', { blogs: allBlogs, departments: allDepartments });
		}
	});
});

// CREATE - Create a new project
router.post('/homeadmin/projects', middleware.isLoggedIn, function(req, res) {
	Project.create(req.body.project, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			console.log(newlyCreated);
			res.redirect('/homeadmin/projects');
		}
	});
});

// SHOW - Show info about one specific project
router.get('/homeadmin/projects/:id', middleware.isLoggedIn, function(req, res) {
	Project.findById(req.params.id, function(err, foundProject) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Employee.find({}, function(err, allEmployees) {
				if (err) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					allEmployees.forEach(function(emp) {
						foundProject.employees.push(emp);
					});

					res.render('admin/projects/show', {
						project: foundProject,
						blogs: allBlogs,
						employees: allEmployees
					});
				}
			});
		}
	});
});

// EDIT - show info about one specific project
router.get('/homeadmin/projects/:id/edit', middleware.isLoggedIn, function(req, res) {
	Project.findById(req.params.id, function(err, foundProject) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			Department.find({}, function(err, allDepartments) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					res.render('admin/projects/edit', {
						blogs: allBlogs,
						departments: allDepartments,
						project: foundProject
					});
				}
			});
		}
	});
});

// UPDATE - Update a particular project
router.put('/homeadmin/projects/:id', middleware.isLoggedIn, function(req, res) {
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.redirect('/homeadmin/projects/' + req.params.id);
		}
	});
});

// DELETE - Delete a particular project
router.delete('/homeadmin/projects/:id', middleware.isLoggedIn, function(req, res) {
	Project.findByIdAndRemove(req.params.id, function(err, deletedProject) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.redirect('/homeadmin/projects');
		}
	});
});

module.exports = router;
