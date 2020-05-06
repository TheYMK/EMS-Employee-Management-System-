var mongoose = require('mongoose');
//mongoose/model config
// dob = date of birth ,  fos = field of study
var employeeSchema = new mongoose.Schema({
	// Personal Details
	first_name: String,
	last_name: String,
	date_of_birth: String,
	gender: String,
	marital_status: String,
	nationality: String,
	passport_no: String,
	photo: String,
	// Contact Details
	address: String,
	city: String,
	country: String,
	mobile: String,
	phone: String,
	email: String,
	// Bank Informations
	bank_name: String,
	account_name: String,
	account_no: String,
	// Official Status
	curriculum_vitae: String,
	employee_id: String,
	designation: String,
	joining_date: String,
	department: String,
	salary: String,
	company: String,
	type_of_employee: String,
	qualification: String,
	password: String,
	hour_start: String,
	hour_end: String,
	attendances: [
		{
			date: String,
			time: String
		}
	]
});
// var Emp = mongoose.model('Employee', employeeSchema);

module.exports = mongoose.model('Employee', employeeSchema);
