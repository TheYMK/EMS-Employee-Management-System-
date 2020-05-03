var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Employee = require('./employee');
var bcrypt = require('bcryptjs');

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
	company_description: String,
	company: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company'
		},
		ein: String
	},
	employee: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employee'
		}
	},
	department: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Department'
		}
	}
});

UserSchema.pre('remove', async function(next) {
	try {
		await Employee.remove({
			_id: {
				$in: this.employees
			}
		});
	} catch (err) {
		next(err);
	}
});

// bcrypt middleware
// UserSchema.pre('save', function(next) {
// 	const user = this;
// 	if (user.isModified('password')) {
// 		bcrypt.genSalt(10, function(err, salt) {
// 			if (err) return next(err);
// 			bcrypt.hash(user.password, salt, function(err, hash) {
// 				if (err) return next(err);
// 				user.password = hash;
// 				next();
// 			});
// 		});
// 	} else {
// 		next();
// 	}
// });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
