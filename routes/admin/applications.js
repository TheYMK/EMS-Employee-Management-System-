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

// @route POST /homeadmin/upload
// @desc Uploads file to DB
router.post('/homeadmin/upload', upload.single('file'), (req, res) => {
	// res.json({ file: req.file });

	res.redirect('/homeadmin/applications/new');
});

// @route GET /homeadmin/files
// @desc Display all files in JSON
router.get('/homeadmin/files', (req, res) => {
	gfs.files.find().toArray((err, files) => {
		// Check if files
		if (!files || files.length === 0) {
			return res.status(404).json({
				err: 'No files exist'
			});
		}

		// Files exist
		return res.json(files);
	});
});

// @route GET /homeadmin/download/:filename
// @desc  Download single file object
router.get('/homeadmin/download/:filename', (req, res) => {
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		// // Check if file
		// if (!file || file.length === 0) {
		// 	return res.status(404).json({
		// 		err: 'No file exists'
		// 	});
		// }
		// File exists
		res.set('Content-Type', file.contentType);
		res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
		// streaming from gridfs
		var readstream = gfs.createReadStream({
			filename: req.params.filename
		});
		//error handling, e.g. file does not exist
		readstream.on('error', function(err) {
			console.log('An error occurred!', err);
			throw err;
		});
		readstream.pipe(res);
	});
});

// INDEX
// @route GET /homeadmin/applications
// @desc Display all applications
router.get('/homeadmin/applications', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const allApplications = await Application.find({});
		const allBlogs = await Blog.find({});

		return res.render('admin/applications/index', { applications: allApplications, blogs: allBlogs });
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// NEW
// @route GET /homeadmin/applications/new
// @desc display a new application form
router.get('/homeadmin/applications/new', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const allDepartments = await Department.find({});

		gfs.files.find().toArray((err, files) => {
			// Check if files
			if (!files || files.length === 0) {
				console.log('no cv uploaded');
				let emptyFile = {
					filename: 'Empty file'
				};
				files.push(emptyFile);
				return res.render('admin/applications/new', {
					blogs: allBlogs,
					departments: allDepartments,
					files: files
				});
			} else {
				return res.render('admin/applications/new', {
					blogs: allBlogs,
					departments: allDepartments,
					files: files
				});
			}
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// CREATE
// @route POST /homeadmin/applications
// @desc create a new application
router.post('/homeadmin/applications', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const foundCompany = await Company.findById(req.user.company.id);

		let newApplication = {
			company: {
				id: foundCompany.id,
				name: foundCompany.name,
				ein: foundCompany.ein
			},
			applicant: {
				first_name: req.body.application.first_name,
				last_name: req.body.application.last_name,
				date_of_birth: req.body.application.date_of_birth,
				gender: req.body.application.gender,
				nationality: req.body.application.nationality,
				photo: req.body.application.photo,
				address: req.body.application.address,
				city: req.body.application.city,
				country: req.body.application.country,
				mobile: req.body.application.mobile,
				phone: req.body.application.phone,
				email: req.body.application.email,
				department: req.body.application.department,
				type_of_employee: req.body.application.type_of_employee,
				desired_designation: req.body.application.desired_designation,
				qualification: req.body.application.qualification
			},
			curriculum_vitae: req.body.application.curriculum_vitae
		};

		const createdApplication = await Application.create(newApplication);

		return res.redirect('/homeadmin/applications');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// SHOW
// @route GET /homeadmin/applications/:id
// @desc - Show a particular application
router.get('/homeadmin/applications/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const foundApplication = await Application.findById(req.params.id);

		gfs.files.findOne({ filename: foundApplication.curriculum_vitae }, (err, file) => {
			// Check if files
			// if (!file || file.length === 0) {
			//     return res.status(404).json({

			//     });
			// }
			// File exist
			return res.render('admin/applications/show', {
				blogs: allBlogs,
				application: foundApplication,
				file: file
			});
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// EDIT
// @route GET /homeadmin/applications/:id/edit
// @desc Edit a particular application
router.get('/homeadmin/applications/:id/edit', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const allBlogs = await Blog.find({});
		const allDepartments = await Department.find({});
		const foundApplication = await Application.findById(req.params.id);

		gfs.files.find().toArray((err, files) => {
			// Check if files
			if (!files || files.length === 0) {
				console.log('no cv uploaded');
				let emptyFile = {
					filename: 'Empty file'
				};
				files.push(emptyFile);
				return res.render('admin/applications/new', {
					blogs: allBlogs,
					departments: allDepartments,
					files: files
				});
			} else {
				return res.render('admin/applications/edit', {
					blogs: allBlogs,
					departments: allDepartments,
					files: files,
					application: foundApplication
				});
			}
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// UPDATE
// @route PUT /homeadmin/applications/:id
// @desc update a particular application
router.put('/homeadmin/applications/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		let application = {
			applicant: {
				first_name: req.body.application.first_name,
				last_name: req.body.application.last_name,
				date_of_birth: req.body.application.date_of_birth,
				gender: req.body.application.gender,
				nationality: req.body.application.nationality,
				photo: req.body.application.photo,
				address: req.body.application.address,
				city: req.body.application.city,
				country: req.body.application.country,
				mobile: req.body.application.mobile,
				phone: req.body.application.phone,
				email: req.body.application.email,
				department: req.body.application.department,
				type_of_employee: req.body.application.type_of_employee,
				desired_designation: req.body.application.desired_designation,
				qualification: req.body.application.qualification
			}
		};

		const updatedApplication = await Application.findByIdAndUpdate(req.params.id, application);

		req.flash('success', 'Application updated successfully');
		return res.redirect('/homeadmin/applications');
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DELETE
// @route DELETE /homeadmin/applications/:id
// @desc Delete a particular application
router.delete('/homeadmin/applications/:id', middleware.isLoggedInAsAdmin, async (req, res) => {
	try {
		const deletedApplication = await Application.findByIdAndRemove(req.params.id);

		gfs.remove({ filename: deletedApplication.curriculum_vitae, root: 'uploads' }, (err, gridStore) => {
			if (err) {
				return res.status(404).json({ err: err });
			}

			res.redirect('/homeadmin/applications');
		});
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
