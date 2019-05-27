const User = require("../models/User.js");
const Position = require("../models/Position");

const positionCreator = (lon, lat, userId, dateInFuture) => {
	var posDetail = { user: userId, loc: { coordinates: [lon, lat] } }
	if (dateInFuture) {
		posDetail.created = "2022-09-25T20:40:21.899Z"
	}
	return posDetail;
}

const addUser = async (user) => {
	try {
		return await User.create(user);
	}
	catch (err) {
		console.log("Error: " + err);
	}
}

const getAllUsers = async () => {
	return await User.find({});
}

const deleteAll = async () => {
	await User.deleteMany({});
}

const findByUserName = async (username) => {
	return await User.findOne({ userName: username });
}

const findById = async (id) => {
	return await user.findById(id);
}

const login = async ({ body }) => {
	let user = await User.findOne({ userName: body.userName }).then((err, u) => {
		if (err || u == null) {
			throw new Error();
		} else if (user.password != body.password) {
			return null;
		} else {
			Position.findOneAndUpdate(
				{ user: u._id },
				{ $set: { loc: { type: "Point", coordinates: [body.longitude, body.latitude] }, created: Date.now() } },
				{ upsert: true, new: true }, function (err, pos) {
					if (err) {
						throw new Error(err);
					}
				});
		}
	})

	return user;
}

const findNearbyUsers = async (pos, dist) => {
	return await Position.find({
		loc: {
			$near: {
				$geometry: { type: "Point", coordinates: [pos.longitude, pos.latitude] },
				$maxDistance: dist,
				$minDistance: 0
			}
		}
	}, {}).populate("user");
}
module.exports = {
	addUser,
	getAllUsers,
	findByUserName,
	deleteAll,
	login,
	findNearbyUsers,
	positionCreator,
	findById
}