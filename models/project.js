var mongoose = require('mongoose');

//Project DB schema
var projectSchema = new mongoose.Schema({
	name: String,
	start: String,
	end: String,
	description: String,
	state: String,
	department: String,
	company: String,
	employees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		}
	]
});

module.exports = mongoose.model('Project', projectSchema);
