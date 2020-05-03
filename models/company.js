var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
	name: String,
	ein: String,
	city: String,
	type: String,
	address: String,
	email: String,
	phone: String,
	size: String,
	description: String
});

module.exports = mongoose.model('Company', companySchema);
