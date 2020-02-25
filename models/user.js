var mongoose = require('mongoose');
var passpoerLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	role: String
});

UserSchema.plugin(passpoerLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
