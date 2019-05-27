var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	title: String,
	company: String,
	companyUrl: String
})

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	job: [JobSchema],
	created: { type: String, default: new Date().toDateString() },
	lastUpdated: String
})

UserSchema.pre("save", function (next) {
	this.password = "Hash Please and add some salt" + this.password;
	next();
})

UserSchema.pre("update", function (next) {
	this.update({}, { $set: { lastUpdated: new Date().toDateString() } })
})

var User = mongoose.model("User", UserSchema);
module.exports = User;