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
const middleware = require('../../middleware');

// INDEX - render hr home page

router.get('/homehr', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const foundDepartment = await Department.findOne({ department_name: foundEmployee.department });
		const allBlogs = await Blog.find({});
		const allEmployees = await Employee.find({});
		const allPayrolls = await Payroll.find({});
		const allLeaves = await Leave.find({});

		// getting all employees of the company
		let totalEmployees = [];
		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name) {
				totalEmployees.push(employee);
			}
		});

		// getting total of employees working in full-time and part-time
		let fullTimes = 0;
		let partTimes = 0;

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name) {
				if (employee.type_of_employee === 'Full-Time') {
					fullTimes++;
				} else {
					partTimes++;
				}
			}
		});

		// getting total attendances of employees of the company

		let attendances = [];

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name && employee.attendances.length > 0) {
				employee.attendances.forEach(function(attendance) {
					attendances.push(attendance);
				});
			}
		});

		// getting total pending and paid payrolls for employees of the company
		let totalPendingPayrolls = 0;
		let totalPaidPayrolls = 0;

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name) {
				allPayrolls.forEach(function(payroll) {
					if (payroll.employee.id.equals(employee.id)) {
						if (payroll.status === 'Pending') {
							totalPendingPayrolls++;
						} else {
							totalPaidPayrolls++;
						}
					}
				});
			}
		});

		// getting total pending and approved leaves for employees of the company
		let totalPendingLeaves = 0;
		let totalApprovedLeaves = 0;

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name) {
				allLeaves.forEach(function(leave) {
					if (leave.employee.id.equals(employee.id)) {
						if (leave.status === 'Pending') {
							totalPendingLeaves++;
						} else {
							totalApprovedLeaves++;
						}
					}
				});
			}
		});

		// getting total employees of employees who marked attendances on time and/or late
		let totalOnTime = 0;
		let totalLate = 0;

		allEmployees.forEach(function(employee) {
			if (employee.company === req.user.company_name) {
				employee.attendances.forEach(function(attendance) {
					if (attendance.time === employee.hour_start) {
						totalOnTime++;
					} else {
						totalLate++;
					}
				});
			}
		});

		// console.log(totalLate);
		// console.log(totalOnTime);

		res.render('hr/index', {
			employee: foundEmployee,
			department: foundDepartment,
			blogs: allBlogs,
			employees: totalEmployees,
			fullTimes: fullTimes,
			partTimes: partTimes,
			attendances: attendances,
			totalPendingPayrolls: totalPendingPayrolls,
			totalPaidPayrolls: totalPaidPayrolls,
			totalPendingLeaves: totalPendingLeaves,
			totalApprovedLeaves: totalApprovedLeaves,
			totalOnTime: totalOnTime,
			totalLate: totalLate
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
