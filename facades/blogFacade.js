var LocationBlog = require("../models/LocationBlog.js");

const addLocationBlog = async (blog) => {
	return await LocationBlog.create(blog);
}

const likeLocationBlog = async (user, blogId) => {
	const blog = await LocationBlog.findById(blogId);
	blog.likedBy.push(user);
	await LocationBlog.updateOne(blog);
	return blog;
}

const findById = async (id) => {
	return await LocationBlog.findById(id);
}

const getAllBlogs = async () => {
	return await LocationBlog.find({}).populate("author").populate("likedBy");
}

const findByPos = async (pos) => {
	return await LocationBlog.findOne({ pos: pos });
}

const deleteAll = async () => {
	await LocationBlog.deleteMany({});
}

module.exports = {
	addLocationBlog,
	likeLocationBlog,
	getAllBlogs,
	deleteAll,
	findByPos,
	findById
}