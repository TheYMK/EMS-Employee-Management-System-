var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var Employee = require('../../models/employee');

var allBlogs;

Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all departments
router.get('/homeadmin/departments', function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/departments/index', { departments: allDepartments, blogs: allBlogs });
		}
	});
});

// NEW - show a new department form
router.get('/homeadmin/departments/new', function(req, res) {
	res.render('admin/departments/new', { blogs: allBlogs });
});

// CREATE - create a new department
router.post('/homeadmin/departments', function(req, res) {
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
			console.log(err);
			res.redirect('back');
		} else {
			console.log(newlyCreated);
			res.redirect('/homeadmin');
		}
	});
});

// SHOW - show info about one specific dept
router.get('/homeadmin/departments/:id', function(req, res) {
	Department.findById(req.params.id, function(err, foundDepartment) {
		if (err || !foundDepartment) {
			console.log(err);
			res.redirect('back');
		} else {
			Employee.find({}, function(err, allEmployees) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					res.render('admin/departments/show', {
						dept: foundDepartment,
						employees: allEmployees,
						blogs: allBlogs
					});
				}
			});
		}
	});
});

// EDIT - show edit form of one department
router.get('/homeadmin/departments/:id/edit', function(req, res) {
	Department.findById(req.params.id, function(err, foundDepartment) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/departments/edit', { dept: foundDepartment, blogs: allBlogs });
		}
	});
});

// Update - update a particular departments
router.put('/homeadmin/departments/:id', function(req, res) {
	Department.findByIdAndUpdate(req.params.id, req.body.department, function(err, updatedDepartment) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			console.log(updatedDepartment);
			res.redirect('/homeadmin/departments/' + req.params.id);
		}
	});
});

// DELETE - delete a particular departments
router.delete('/homeadmin/departments/:id', function(req, res) {
	Department.findByIdAndRemove(req.params.id, function(err, deletedDept) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.redirect('/homeadmin');
		}
	});
});

module.exports = router;
