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

// INDEX - list all projects
router.get('/homehod/projects', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const allProjects = await Project.find({ company: req.user.company_name });

		res.render('hod/projects/index', { employee: foundEmployee, blogs: allBlogs, projects: allProjects });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// NEW - show a new project form
router.get('/homehod/projects/new', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const allDepartments = await Department.find({});

		return res.render('hod/projects/new', {
			employee: foundEmployee,
			blogs: allBlogs,
			departments: allDepartments
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// CREATE - create a new project
router.post('/homehod/projects', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundDepartment = await Department.findOne({ department_name: req.body.project.department });
		const project = await Project.create(req.body.project);

		console.log(req.body.project.department);
		await project.save();
		foundDepartment.projects.push(project);
		await foundDepartment.save();

		console.log(foundDepartment.projects);

		return res.redirect('/homehod/projects');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// SHOW - show info about one specific project
router.get('/homehod/projects/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const foundProject = await Project.findById(req.params.id);
		const allEmployees = await Employee.find({});

		return res.render('hod/projects/show', {
			employee: foundEmployee,
			project: foundProject,
			blogs: allBlogs,
			employees: allEmployees
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT - show edit form of one project
router.get('/homehod/projects/:id/edit', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const foundProject = await Project.findById(req.params.id);

		return res.render('hod/projects/edit', { employee: foundEmployee, blogs: allBlogs, project: foundProject });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE - update a particular project
router.put('/homehod/projects/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body.project);

		req.flash('success', 'Project updated successfully');
		return res.redirect('/homehod/projects/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DESTROY - delete a particular project
router.delete('/homehod/projects/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		await Project.findByIdAndRemove(req.params.id);

		req.flash('success', 'Project deleted successfully');
		return res.redirect('/homehod/projects');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
