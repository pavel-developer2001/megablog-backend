const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, user, email) => {
	return jwt.sign({ id, user, email }, process.env.SECRET_KEY || "secret key", {
		expiresIn: "24h",
	});
};
class UserController {
	test(req, res) {
		res.send("hello users");
	}
	async register(req, res) {
		console.log(req.body);
		const { user, email, password, password2 } = req.body;
		if (password != password2) {
			res.status(404).json({ message: "Пароли не совпадают" });
		}
		const candidate = await User.findOne({ where: { email: email } });
		if (candidate) {
			res.json({ message: "Пользователь уже существует" });
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser = new User({
			user: user,
			email: email,
			password: hashPassword,
		});
		await newUser.save();
		const token = generateJwt(newUser.id, newUser.user, newUser.email);
		res.json({
			message: "Пользователь зарегистрирован",
			token: token,
			data: newUser,
		});
	}
}

module.exports = new UserController();
