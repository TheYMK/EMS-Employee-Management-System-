var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var Project = require('../../models/project');
const Leave = require('../../models/leave');
var middleware = require('../../middleware');

let allBlogs;
let allEmployees;

Blog.find({}, function(err, blogs) {
	if (err) {
		console.log(err);
	} else {
		allBlogs = blogs;
	}
});

Employee.find({}, function(err, employees) {
	if (err) {
		console.log(err);
	} else {
		allEmployees = employees;
	}
});

// INDEX - employee home page
router.get('/homeemployee', middleware.isLoggedAsEmployee, function(req, res) {
	Employee.findById(req.user.employee.id, function(err, foundEmployee) {
		if (err || !foundEmployee) {
			console.log(err);
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			Department.findOne({ department_name: foundEmployee.department }, function(err, foundDepartment) {
				if (err || !foundDepartment) {
					console.log(err);
					req.flash('error', err.message);
					res.redirect('back');
				} else {
					Project.find({ department: foundEmployee.department }, function(err, allProjects) {
						if (err) {
							console.log(err);
							req.flash('error', err.message);
							res.redirect('back');
						} else {
							Leave.find({}, function(err, allLeaves) {
								if (err) {
									console.log(err);
									req.flash('error', err.message);
									res.redirect('back');
								} else {
									let prjcts = [];
									let prjctTeam = [];
									allProjects.forEach(function(project) {
										if (
											project.company === req.user.company_name &&
											project.department === foundEmployee.department
										) {
											prjcts.push(project);
										}
									});

									allEmployees.forEach(function(employee) {
										if (
											employee.company === req.user.company_name &&
											employee.department === foundDepartment.department_name
										) {
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

									res.render('emp/index', {
										employee: foundEmployee,
										team: prjctTeam,
										blogs: allBlogs,
										department: foundDepartment,
										projects: prjcts,
										pendingLeaves: pendingLeaves,
										approvedLeaves: approvedLeaves
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
