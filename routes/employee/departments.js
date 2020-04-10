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
var middleware = require('../../middleware');

// SHOW - show info about one specific dept
router.get('/homeemployee/departments/:id', middleware.isLoggedIn, function(req, res) {
	Employee.findById(req.user.employee.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			req.flash('error', err.message);
			return res.redirect('back');
		}

		Department.findOne({ department_name: foundEmployee.department }, function(err, foundDepartment) {
			if (err) {
				console.log(err);
				req.flash('error', err.message);
				res.redirect('back');
			} else {
				Employee.find({}, function(err, allEmployees) {
					if (err) {
						return console.log(err);
					}

					Project.find({}, function(err, allProjects) {
						if (err) {
							return console.log(err);
						} else {
							res.render('emp/departments/show', {
								dept: foundDepartment,
								employee: foundEmployee,
								employees: allEmployees,
								projects: allProjects
							});
						}
					});
				});
			}
		});
	});
});

module.exports = router;
