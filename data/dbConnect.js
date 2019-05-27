var mongoose = require('mongoose');

/**
 * convert all types of ObjectId to string
 */
const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};

function disconnect() {
	mongoose.disconnect();
}

function connect(connectionString) {
	return mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true });
}
mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open ');
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection closed ');
});
mongoose.connection.on('error', function (err) {
	console.log('Mongoose default connection error: ' + err);
});

module.exports = { connect, disconnect };