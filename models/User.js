//const connectDb = require('../config/db');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	lastCapture: {
		type: Boolean,
		default: false

	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
