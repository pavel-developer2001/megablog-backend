const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Post = sequelize.define("posts", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	postTitle: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	postText: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	countLike: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
});
// Post.hasOne(User);
// User.belongsToMany(Post);

module.exports = Post;
