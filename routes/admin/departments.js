const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const Project = require('../../models/project');
const middleware = require('../../middleware');

let allBlogs;
Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

// INDEX - list all departments
router.get('/homeadmin/departments', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const allDepartments = await Department.find({});
		const allBlogs = await Blog.find({});
		res.render('admin/departments/index', { departments: allDepartments, blogs: allBlogs });
	} catch (err) {
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// NEW - show a new department form
router.get('/homeadmin/departments/new', middleware.isLoggedInAsAdmin, function(req, res) {
	res.render('admin/departments/new', { blogs: allBlogs });
});

// CREATE - create a new department
router.post('/homeadmin/departments', middleware.isLoggedInAsAdmin, function(req, res) {
	const name = req.body.department_name;
	const hod = req.body.department_hod;
	const category = req.body.department_category;
	const description = req.body.department_description;
	const image = req.body.department_image;
	const createdBy = {
		id: req.user.id,
		username: req.user.username
	};

	const newDepartment = {
		department_image: image,
		department_name: name,
		department_hod: hod,
		department_category: category,
		department_description: description,
		company: req.user.company_name,
		company_ein: req.user.company.ein,
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
router.get('/homeadmin/departments/:id', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.get('/homeadmin/departments/:id/edit', middleware.isLoggedInAsAdmin, function(req, res) {
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
router.put('/homeadmin/departments/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		var createdBy = {
			id: req.user.id,
			username: req.user.username
		};
		let dpt = {
			department_name: req.body.department.department_name,
			department_hod: req.body.department.department_hod,
			department_category: req.body.department.department_category,
			department_image: req.body.department.department_image,
			department_description: req.body.department.department_description,
			company: req.user.company_name,
			createdBy
		};

		const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, dpt);
		const foundDepartment = await Department.findById(req.params.id);
		const allEmployees = await Employee.find({});
		const allProjects = await Project.find({});

		// update department name for all employees belonging to this department
		allEmployees.forEach(async function(employee) {
			if (
				employee.company === req.user.company_name &&
				employee.department === updatedDepartment.department_name
			) {
				let emp = {
					department: foundDepartment.department_name
				};

				const updatedEmployee = await Employee.findByIdAndUpdate(employee.id, emp);
			}
		});

		// update department name for all projects belonging to this department
		allProjects.forEach(async function(project) {
			if (project.company === req.user.company_name && project.department === updatedDepartment.department_name) {
				let prjct = {
					department: foundDepartment.department_name
				};

				const updatedProject = await Project.findByIdAndUpdate(project.id, prjct);
			}
		});

		req.flash('success', 'Department updated successfully');
		return res.redirect('/homeadmin/departments/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DELETE - delete a particular departments
router.delete('/homeadmin/departments/:id', middleware.isLoggedInAsAdmin, function(req, res) {
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
