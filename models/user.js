var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Employee = require('./employee');

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
		}
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
			ref: 'Employee'
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

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
