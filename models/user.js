var mongoose = require('mongoose');
var passpoerLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	user_email: String,
	password: String,
	user_role: String,
	company_name: String,
	company_email: String,
	company_phone: String,
	company_address: String,
	company_type: String,
	company_city: String,
	company_size: String,
	company_description: String
});

UserSchema.plugin(passpoerLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
