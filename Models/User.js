const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
	id : {
		type: String,
		required: true,
		unique: true
	},
	username : {
		type: String,
		required: true
	},
	hotelname : {
		type: String,
		required: true
	},
	email : {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	}
}, { collection: 'User' })

const User = mongoose.model('User', userInfo);

module.exports = User;