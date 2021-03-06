const Sequelize = require("sequelize");
const sequelize = require("../db");
const Post = require("./post");

const User = sequelize.define("users", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	user: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});
User.hasMany(Post);
Post.belongsTo(User);

module.exports = User;
