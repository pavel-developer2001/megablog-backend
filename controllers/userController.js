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
	async getUsers(req, res) {
		const users = await User.findAll();
		res.json({
			data: users,
		});
	}
	async getUser(req, res) {
		const { id } = req.params;
		const user = await User.findOne({ where: { id: id } });
		if (!user) {
			res.json({ message: "Пользователь не найден" });
		}
		res.json({ data: user });
	}
	async login(req, res) {
		const { email, password } = req.body;
		const findUser = await User.findOne({ where: { email: email } });
		if (!email) {
			res.json({ message: "Email не найден" });
		}
		const isMatch = await bcrypt.compare(password, findUser.password);
		if (!isMatch) {
			res.json({ message: "Неверный пароль. Попробуйте снова" });
		}
		const token = generateJwt(findUser.id, findUser.user, findUser.email);
		res.json({ token: token, data: findUser, userId: findUser.id });
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
