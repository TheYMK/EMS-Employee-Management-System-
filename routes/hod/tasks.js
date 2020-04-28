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
const Task = require('../../models/task');
const middleware = require('../../middleware');

// INDEX - list all tasks
router.get('/homehod/tasks', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const allTasks = await Task.find({});
		const foundDepartment = await Department.findById(req.user.department.id);

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;

		allTasks.forEach(async function(task) {
			if (task.end === today) {
				let tsk = {
					status: 'Completed'
				};

				const updatedTask = await Task.findByIdAndUpdate(task.id, tsk);
			} else if (task.start === today) {
				let tsk = {
					status: 'In progress'
				};

				const updatedTask = await Task.findByIdAndUpdate(task.id, tsk);
			} else {
				let tsk = {
					status: 'Not started yet'
				};

				const updatedTask = await Task.findByIdAndUpdate(task.id, tsk);
			}
		});

		return res.render('hod/tasks/index', {
			employee: foundEmployee,
			blogs: allBlogs,
			tasks: allTasks,
			department: foundDepartment
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// NEW - show a new task form
router.get('/homehod/tasks/new', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const allEmployees = await Employee.find({ company: req.user.company_name });
		const foundDepartment = await Department.findById(req.user.department.id);
		const allProjects = await Project.find({ company: req.user.company_name });

		return res.render('hod/tasks/new', {
			employee: foundEmployee,
			blogs: allBlogs,
			employees: allEmployees,
			department: foundDepartment,
			projects: allProjects
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// CREATE - create a new task
router.post('/homehod/tasks', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		let firstName = req.body.task.employee.split(' ');
		const foundEmployee = await Employee.findOne({ first_name: firstName });
		const foundDepartment = await Department.findOne({
			department_name: req.body.task.department,
			company: req.user.company_name
		});
		const foundCompany = await Company.findOne({ name: req.body.task.company });
		const foundProject = await Project.findOne({ name: req.body.task.project });

		console.log(foundProject);

		let newTask = {};

		if (foundEmployee.department === foundDepartment.department_name) {
			newTask = {
				name: req.body.task.name,
				start: req.body.task.start,
				end: req.body.task.end,
				description: req.body.task.description,
				status: req.body.task.status,
				department: {
					id: foundDepartment.id,
					department_name: foundDepartment.department_name
				},
				company: {
					id: foundCompany.id,
					name: foundCompany.name
				},
				project: {
					id: foundProject.id,
					name: foundProject.name
				},
				employee: {
					id: foundEmployee.id,
					employee_id: foundEmployee.employee_id
				}
			};

			const newlyCreated = await Task.create(newTask);
		}

		return res.redirect('/homehod/tasks');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// SHOW - show info about one specific task
router.get('/homehod/tasks/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const foundTask = await Task.findById(req.params.id);
		const assignedEmployee = await Employee.findOne({ employee_id: foundTask.employee.employee_id });

		return res.render('hod/tasks/show', {
			employee: foundEmployee,
			blogs: allBlogs,
			task: foundTask,
			assignedEmployee: assignedEmployee
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT - show edit form of one particular task
router.get('/homehod/tasks/:id/edit', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const foundTask = await Task.findById(req.params.id);
		const allEmployees = await Employee.find({ company: req.user.company_name });
		const foundDepartment = await Department.findById(req.user.department.id);
		const allProjects = await Project.find({ company: req.user.company_name });

		return res.render('hod/tasks/edit', {
			employee: foundEmployee,
			blogs: allBlogs,
			task: foundTask,
			employees: allEmployees,
			department: foundDepartment,
			projects: allProjects
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE - update a particular task
router.put('/homehod/tasks/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		let firstName = req.body.task.employee.split(' ');
		const foundEmployee = await Employee.findOne({ first_name: firstName });
		const foundDepartment = await Department.findOne({ department_name: req.body.task.department });
		const foundCompany = await Company.findOne({ name: req.body.task.company });
		const foundProject = await Project.findOne({ name: req.body.task.project });

		console.log(foundProject);

		let newTask = {};

		if (foundEmployee.department === foundDepartment.department_name) {
			newTask = {
				name: req.body.task.name,
				start: req.body.task.start,
				end: req.body.task.end,
				description: req.body.task.description,
				status: req.body.task.status,
				department: {
					id: foundDepartment.id,
					department_name: foundDepartment.department_name
				},
				company: {
					id: foundCompany.id,
					name: foundCompany.name
				},
				project: {
					id: foundProject.id,
					name: foundProject.name
				},
				employee: {
					id: foundEmployee.id,
					employee_id: foundEmployee.employee_id
				}
			};

			const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTask);
		}

		req.flash('success', 'Task updated successfully');
		return res.redirect('/homehod/tasks/' + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DESTROY - delete a particular task
router.delete('/homehod/tasks/:id', middleware.isLoggedInAsHOD, async (req, res) => {
	try {
		const deletedTask = await Task.findByIdAndRemove(req.params.id);

		return res.redirect('/homehod/tasks');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
