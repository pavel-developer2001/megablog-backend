const Post = require("../models/post");

class PostController {
	async createPost(req, res) {
		const { postText } = req.body;
		const newPost = await Post.create({
			postText: postText,
		});
		res.json({ data: newPost });
	}
}
module.exports = new PostController();
