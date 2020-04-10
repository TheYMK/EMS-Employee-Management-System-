var mongoose = require('mongoose');
var Employee = require('./employee');

var payrollSchema = new mongoose.Schema({
	employee: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		},
		employee_id: String
	},
	start_date: String,
	end_date: String,
	status: String
});

module.exports = mongoose.model('Payroll', payrollSchema);
