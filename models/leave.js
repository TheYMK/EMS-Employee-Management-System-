var mongoose = require('mongoose');
var Employee = require('./employee');

var leaveSchema = new mongoose.Schema({
	category: String,
	start_date: String,
	end_date: String,
	reason: String,
	status: {
		type: String,
		default: 'Pending'
	},
	apply_date: { type: Date, default: Date.now },
	employee: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		},
		employee_id: String
	},
	company: String
});

module.exports = mongoose.model('Leave', leaveSchema);
