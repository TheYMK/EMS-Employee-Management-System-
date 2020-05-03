var mongoose = require('mongoose');
var Project = require('./project');

var departmentSchema = new mongoose.Schema({
	department_image: String,
	department_name: String,
	department_category: String,
	department_hod: String,
	department_description: String,
	department_employees: String,
	company: String,
	company_ein: String,
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project'
		}
	],
	createdBy: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

departmentSchema.pre('remove', async function(next) {
	try {
		await Project.remove({
			_id: {
				$in: this.projects
			}
		});
	} catch (err) {
		next(err);
	}
});

module.exports = mongoose.model('Department', departmentSchema);
