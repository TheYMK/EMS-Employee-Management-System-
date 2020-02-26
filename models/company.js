var mongoose = require('mongoose');

//mongoose/model config
// dob = date of birth ,  fos = field of study
var employeeSchema = new mongoose.Schema({
	name: String,
	location: String,
	size: String
});

module.exports = mongoose.model('Company', employeeSchema);
