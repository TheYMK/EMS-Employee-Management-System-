var mongoose = require('mongoose');

//mongoose/model config
// dob = date of birth ,  fos = field of study
var employeeSchema = new mongoose.Schema({
	image: String,
	empID: String,
	name: String,
	email: String,
	phone: String,
	age: Number,
	start_date: { type: Date, default: Date.now },
	nationality: String,
	contract_type: String,
	location: String,
	gender: String,
	dob: String,
	fos: String,
	job: String,
	departement: String,
	marital_status: String,
	qualification: String,
	experience: String,
	salary: String
});
// var Emp = mongoose.model('Employee', employeeSchema);

module.exports = mongoose.model('Employee', employeeSchema);
