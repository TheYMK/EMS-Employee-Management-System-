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

// INDEX - employee home page
router.get('/homeemployee', middleware.isLoggedIn, function(req, res) {
	Employee.findById(req.user.employee.id, function(err, foundEmployee) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			console.log(foundEmployee);
			res.render('emp/index', { employee: foundEmployee });
		}
	});
});

module.exports = router;
