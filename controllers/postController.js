const Post = require("../models/post");

class PostController {
	async getPosts(req, res) {
		const posts = await Post.findAll();
		res.json({ data: posts });
	}
	async getPost(req, res) {
		const { id } = req.params;
		const post = await Post.findOne({ where: { id: id } });
		if (!post) {
			res.json({
				message: "Статья не найдена",
			});
		}
		res.json({ data: post });
	}
	async createPost(req, res) {
		const { postTitle, postText, userId } = req.body;
		// console.log(req.user);
		if (postTitle == "") {
			res.json({ message: "Напишите заголовок" });
		}
		const newPost = await Post.create({
			postTitle: postTitle,
			postText: postText,
			userId: userId,
		});
		res.json({ data: newPost });
	}
}
module.exports = new PostController();
