var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
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

// INDEX - list all departments
router.get('/homeadmin/departments', middleware.isLoggedIn, function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			res.render('admin/departments/index', { departments: allDepartments, blogs: allBlogs });
		}
	});
});

// NEW - show a new department form
router.get('/homeadmin/departments/new', middleware.isLoggedIn, function(req, res) {
	res.render('admin/departments/new', { blogs: allBlogs });
});

// CREATE - create a new department
router.post('/homeadmin/departments', middleware.isLoggedIn, function(req, res) {
	var name = req.body.department_name;
	var hod = req.body.department_hod;
	var category = req.body.department_category;
	var description = req.body.department_description;
	var image = req.body.department_image;
	var createdBy = {
		id: req.user.id,
		username: req.user.username
	};

	var newDepartment = {
		department_image: image,
		department_name: name,
		department_hod: hod,
		department_category: category,
		department_description: description,
		createdBy
	};

	Department.create(newDepartment, function(err, newlyCreated) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			console.log(newlyCreated);
			req.flash('success', 'Department created successfully');
			res.redirect('/homeadmin');
		}
	});
});

// SHOW - show info about one specific dept
router.get('/homeadmin/departments/:id', middleware.isLoggedIn, function(req, res) {
	Department.findById(req.params.id).populate('projects').exec(function(err, foundDepartment) {
		if (err || !foundDepartment) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Employee.find({}, function(err, allEmployees) {
				if (err) {
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					Project.find({}, function(err, allProjects) {
						if (err) {
							console.log(err);
							res.flash('error', err.message);
							res.redirect('back');
						} else {
							res.render('admin/departments/show', {
								dept: foundDepartment,
								employees: allEmployees,
								blogs: allBlogs,
								projects: allProjects
							});
						}
					});
				}
			});
		}
	});
});

// EDIT - show edit form of one department
router.get('/homeadmin/departments/:id/edit', middleware.isLoggedIn, function(req, res) {
	Department.findById(req.params.id, function(err, foundDepartment) {
		if (err || !foundDepartment) {
			req.flash('error', 'Department not found');
			res.redirect('back');
		} else {
			res.render('admin/departments/edit', { dept: foundDepartment, blogs: allBlogs });
		}
	});
});

// Update - update a particular departments
router.put('/homeadmin/departments/:id', middleware.isLoggedIn, function(req, res) {
	Department.findByIdAndUpdate(req.params.id, req.body.department, function(err, updatedDepartment) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			req.flash('success', 'Department updated successfully');
			res.redirect('/homeadmin/departments/' + req.params.id);
		}
	});
});

// DELETE - delete a particular departments
router.delete('/homeadmin/departments/:id', middleware.isLoggedIn, function(req, res) {
	Department.findById(req.params.id, function(err, department) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			department.remove();
			req.flash('success', 'Department deleted successfully');
			res.redirect('/homeadmin');
		}
	});
});

module.exports = router;
