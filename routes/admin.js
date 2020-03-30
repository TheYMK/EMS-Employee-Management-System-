var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');
var Department = require('../models/department');

// INDEX - admin home page
router.get('/homeadmin', function(req, res) {
	Department.find({}, function(err, allDepartments) {
		if (err) {
			console.log(err);
			return res.redirect('back');
		}
		res.render('admin/index', { departments: allDepartments });
	});
});

// temporary route
router.get('/homebasic', function(req, res) {
	res.send('Home Page');
});

// NEW - show a new department form
router.get('/departments/new', function(req, res) {
	res.render('admin/new');
});

// CREATE - create a new department
router.post('/departments', function(req, res) {
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
router.get('/departments/:id', function(req, res) {
	Department.findById(req.params.id, function(err, foundDepartment) {
		if (err || !foundDepartment) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/show', { dept: foundDepartment });
		}
	});
});

// EDIT - show edit form of one department
router.get('/departments/:id/edit', function(req, res) {
	Department.findById(req.params.id, function(err, foundDepartment) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			res.render('admin/edit', { dept: foundDepartment });
		}
	});
});

// Update - update a particular departments
router.put('/departments/:id', function(req, res) {
	Department.findByIdAndUpdate(req.params.id, req.body.department, function(err, updatedDepartment) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			console.log(updatedDepartment);
			res.redirect('/departments/' + req.params.id);
		}
	});
});

// DELETE - delete a particular departments
router.delete('/departments/:id', function(req, res) {
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
