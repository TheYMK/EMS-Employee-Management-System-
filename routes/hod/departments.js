const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const Employee = require('../../models/employee');
const Payroll = require('../../models/payroll');
const Project = require('../../models/project');
const middleware = require('../../middleware');

// SHOW - show info about one specific dept
router.get('/homehod/departments/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundDepartment = await Department.findById(req.params.id);
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allEmployees = await Employee.find({});
		const allProjects = await Project.find({});

		return res.render('hod/departments/show', {
			employee: foundEmployee,
			dept: foundDepartment,
			employees: allEmployees,
			projects: allProjects,
			blogs: allBlogs
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT - show edit form of a department
router.get('/homehod/departments/:id/edit', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundDepartment = await Department.findById(req.params.id);
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);

		return res.render('hod/departments/edit', { dept: foundDepartment, blogs: allBlogs, employee: foundEmployee });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE - update a particular department
router.put('/homehod/departments/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body.department);
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
		return res.redirect('/homehod/departments/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
