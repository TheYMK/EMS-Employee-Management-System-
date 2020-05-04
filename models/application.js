var mongoose = require('mongoose');

var applicationSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
	company: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company'
		},
		name: String,
		ein: String
	},
	applicant: {
		// Personal Details
		first_name: String,
		last_name: String,
		date_of_birth: String,
		gender: String,
		nationality: String,
		photo: String,
		// Contact Details
		address: String,
		city: String,
		country: String,
		mobile: String,
		phone: String,
		email: String,

		// Official Status
		department: String,
		type_of_employee: String,
		desired_designation: String,
		qualification: String
	},
	curriculum_vitae: String,
	status: {
		type: String,
		default: 'Pending'
	}
});

module.exports = mongoose.model('Application', applicationSchema);
