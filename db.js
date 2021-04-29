const Sequelize = require("sequelize");

const sequelize = new Sequelize("megablog", "postgres", "31101955", {
	host: "localhost",
	dialect: "postgres",
});

module.exports = sequelize;
