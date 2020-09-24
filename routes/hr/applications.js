const express = require('express');
const path = require('path');
const router = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Company = require('../../models/company');
const Department = require('../../models/department');
const expressSanitizer = require('express-sanitizer');
const Employee = require('../../models/employee');
const Project = require('../../models/project');
const Payroll = require('../../models/payroll');
const Application = require('../../models/application');
const middleware = require('../../middleware');

const mongoURI = 'mongodb://localhost:27017/ems_db';
const conn = mongoose.connection;

// init gfs
let gfs;
let uploadedFile;

conn.once('open', () => {
	// Init stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads'
				};
				resolve(fileInfo);
			});
		});
	}
});
const upload = multer({ storage });

// INDEX
// @route GET /homehr/applications
// @desc Display all applications
router.get('/homehr/applications', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);

		const allApplications = await Application.find({ 'company.name': req.user.company_name });

		return res.render('hr/applications/index', {
			employee: foundEmployee,
			blogs: allBlogs,
			applications: allApplications
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// SHOW
// @route GET /homehr/applications/:id
// @desc Show a particular application
router.get('/homehr/applications/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const foundApplication = await Application.findById(req.params.id);
		const foundEmployee = await Employee.findById(req.user.employee.id);

		gfs.files.findOne({ filename: foundApplication.curriculum_vitae }, (err, file) => {
			// Check if files
			// if (!file || file.length === 0) {
			//     return res.status(404).json({

			//     });
			// }
			// File exist
			return res.render('hr/applications/show', {
				blogs: allBlogs,
				application: foundApplication,
				file: file,
				employee: foundEmployee
			});
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT
// @route GET /homehr/applications/:id/edit
// @desc show edit form of a particular application
router.get('/homehr/applications/:id/edit', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const foundEmployee = await Employee.findById(req.user.employee.id);
		const allDepartments = await Department.find({});
		const foundApplication = await Application.findById(req.params.id);

		return res.render('hr/applications/edit', {
			blogs: allBlogs,
			employee: foundEmployee,
			application: foundApplication,
			departments: allDepartments
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// CREATE / UPDATE
// @route POST /homehr/applications/:id/approve
// @desc Update application status and create employee
router.post('/homehr/applications/:id/approve', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const newlyCreated = await Employee.create(req.body.employee);
		console.log(newlyCreated);
		let pwd = '2020' + newlyCreated.passport_no;
		let pwdUpdate = { password: pwd };
		const emp = await Employee.findByIdAndUpdate(newlyCreated._id, pwdUpdate);
		const foundDepartment = await Department.findOne({ department_name: emp.department });

		// update application status
		let application = {
			status: 'Approved'
		};

		const updatedApplication = await Application.findByIdAndUpdate(req.params.id, application);

		const newUser = new User({
			username: newlyCreated.employee_id,
			user_email: newlyCreated.email,
			user_role: newlyCreated.designation,
			company_name: newlyCreated.company,
			company: {
				id: req.user.company.id
			},
			employee: {
				id: emp.id
			},
			department: {
				id: foundDepartment.id
			}
		});

		const user = await User.register(newUser, pwd);
		console.log(user);
		req.flash('success', 'Application approved, employee added to Database');

		return res.redirect('/homehr/applications');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE
// @router PUT /homehr/applications/:id/reject
// @desc Update an application status
router.put('/homehr/applications/:id/reject', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		let application = {
			status: 'Rejected'
		};

		const updatedApplication = await Application.findByIdAndUpdate(req.params.id, application);

		gfs.remove({ filename: updatedApplication.curriculum_vitae, root: 'uploads' }, (err, gridStore) => {
			if (err) {
				return res.status(404).json({ err: err });
			}
		});

		return res.redirect('/homehr/applications');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DELETE
// @route DELETE /homehr/applications/:id
// @desc Delete a particular application
router.delete('/homehr/applications/:id', middleware.isLoggedInAsHR, async (req, res) => {
	try {
		const deletedApplication = await Application.findByIdAndRemove(req.params.id);
		return res.redirect('/homehr/applications');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
