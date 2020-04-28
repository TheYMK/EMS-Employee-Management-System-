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
const Leave = require('../../models/leave');
const Payroll = require('../../models/payroll');
const Task = require('../../models/task');
var middleware = require('../../middleware');

// INDEX - employee home page
router.get('/homeemployee', middleware.isLoggedAsEmployee, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const foundDepartment = await Department.findOne({ department_name: foundEmployee.department });
		const allProjects = await Project.find({ department: foundEmployee.department });
		const allLeaves = await Leave.find({});
		const allPayrolls = await Payroll.find({});
		const allBlogs = await Blog.find({});
		const allEmployees = await Employee.find({});
		const allTasks = await Task.find({});

		let prjcts = [];
		let prjctTeam = [];
		allProjects.forEach(function(project) {
			if (project.company === req.user.company_name && project.department === foundEmployee.department) {
				prjcts.push(project);
			}
		});

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name && employee.department === foundDepartment.department_name) {
				prjctTeam.push(employee);
			}
		});

		let pendingLeaves = 0;
		let approvedLeaves = 0;
		allLeaves.forEach(function(leave) {
			if (leave.employee.id.equals(req.user.employee.id)) {
				if (leave.status === 'Pending') {
					pendingLeaves++;
				} else {
					approvedLeaves++;
				}
			}
		});

		let pendingPayrolls = 0;
		let payedPayrolls = 0;

		allPayrolls.forEach(function(payroll) {
			if (payroll.employee.id.equals(req.user.employee.id)) {
				if (payroll.status === 'Pending') {
					pendingPayrolls++;
				} else {
					payedPayrolls++;
				}
			}
		});

		let notStartedTasks = 0;
		let inProgressTasks = 0;
		let completedTasks = 0;

		allTasks.forEach(function(task) {
			if (
				task.company.name === req.user.company_name &&
				task.department.department_name === foundEmployee.department &&
				task.employee.employee_id === req.user.username
			) {
				if (task.status === 'In progress') {
					inProgressTasks++;
				} else if (task.status === 'Completed') {
					completedTasks++;
				} else {
					notStartedTasks++;
				}
			}
		});

		res.render('emp/index', {
			employee: foundEmployee,
			team: prjctTeam,
			blogs: allBlogs,
			department: foundDepartment,
			projects: prjcts,
			pendingLeaves: pendingLeaves,
			approvedLeaves: approvedLeaves,
			pendingPayrolls: pendingPayrolls,
			payedPayrolls: payedPayrolls,
			notStartedTasks: notStartedTasks,
			inProgressTasks: inProgressTasks,
			completedTasks: completedTasks
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
