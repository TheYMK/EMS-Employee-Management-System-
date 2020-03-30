var mongoose = require('mongoose');

var departmentSchema = new mongoose.Schema({
	department_image: String,
	department_name: String,
	department_category: String,
	department_hod: String,
	department_description: String,
	department_employees: String,
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

module.exports = mongoose.model('Department', departmentSchema);
