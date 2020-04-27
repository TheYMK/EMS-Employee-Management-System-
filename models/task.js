var mongoose = require('mongoose');

//Project DB schema
var taskSchema = new mongoose.Schema({
	name: String,
	start: String,
	end: String,
	description: String,
	status: String,
	department: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Department'
		},
		department_name: String
	},
	company: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company'
		},
		name: String
	},
	project: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project'
		},
		name: String
	},
	employee: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		},
		employee_id: String
	}
});

module.exports = mongoose.model('Task', taskSchema);
