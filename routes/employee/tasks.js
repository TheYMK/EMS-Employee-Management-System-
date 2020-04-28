const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const expressSanitizer = require('express-sanitizer');
const Employee = require('../../models/employee');
const Project = require('../../models/project');
const Payroll = require('../../models/payroll');
const Task = require('../../models/task');
const middleware = require('../../middleware');

// INDEX - list all tasks
router.get('/homeemployee/tasks', middleware.isLoggedAsEmployee, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const allTasks = await Task.find({});
		const foundDepartment = await Department.findById(req.user.department.id);

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

		return res.render('emp/tasks/index', {
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

// SHOW - show info about one specific task
router.get('/homeemployee/tasks/:id', middleware.isLoggedAsEmployee, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allBlogs = await Blog.find({});
		const foundTask = await Task.findById(req.params.id);
		const assignedEmployee = await Employee.findOne({ employee_id: foundTask.employee.employee_id });

		return res.render('emp/tasks/show', {
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
module.exports = router;
