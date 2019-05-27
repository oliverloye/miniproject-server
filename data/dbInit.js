var connect = require("./dbConnect.js").connect;
connect(require("./settings").TEST_DB_URI);

var User = require("../models/User.js");
var LocationBlog = require("../models/LocationBlog.js");
var Position = require("../models/Position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
	var posDetail = { user: userId, loc: { coordinates: [lon, lat] } }
	if (dateInFuture) {
		posDetail.created = "2022-09-25T20:40:21.899Z"
	}
	return posDetail;
}

async function makeData() {
	console.log("Making users")
	try {
		var userInfos = [{
			firstName: "Captain", lastName: "America", userName: "hero1", password: "1234", email: "captain@america.com",
			job: [{ title: "First Avenger", company: "SHIELD", companyUrl: "www.shield.com" }, { title: "Advisor", company: "Bacefook", companyUrl: "www.bacefook.com" }]
		},
		{
			firstName: "Captain", lastName: "Marvel", userName: "hero2", password: "1234", email: "captain@marvel.com",
			job: [{ title: "Sencond Avenger", company: "SHIELD", companyUrl: "www.shield.com" }, { title: "Superhero", company: "Univers", companyUrl: "www.universe.com" }]
		},
		{
			firstName: "Tony", lastName: "Stark", userName: "ironman", password: "1234", email: "ironm@n.dk",
			job: [{ title: "Best Avenger", company: "SHIELD", companyUrl: "www.shield.com" }, { title: "Superhero", company: "Stark Industries", companyUrl: "www.stark.com" }]
		}];
		await User.deleteMany({});
		await Position.deleteMany({});
		await LocationBlog.deleteMany({})

		var users = await User.insertMany(userInfos);
		var positions = [positionCreator(12.549648284912108, 55.786081644399324, users[0]._id, true), positionCreator(12.561063766479492, 55.79235510128348, users[1]._id, true), positionCreator(12.56338119506836, 55.783958091676986, users[2]._id, true)]
		var blogs = [{ info: "Cool Place", img: "https://files.kstatecollegian.com/2018/06/Mouth-Alien-Monster-Green-Troll-Martian-Shrek-722415-1.jpg" , pos: { longitude: 26, latitude: 57 }, author: users[0]._id },]

		Position.insertMany(positions);
		LocationBlog.insertMany(blogs);

	} catch (err) {
		console.log(err);
	}
}

module.exports = { dbInit: makeData };