const express = require("express");
const app = express();
const sequelize = require("./db");
const cors = require("cors");
const router = require("./router");

app.use(express.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 3001;
const start = async () => {
	try {
		await sequelize.sync();
		app.listen(PORT, () => console.log(`server start to port is ${PORT}`));
	} catch (err) {
		console.log(err);
	}
};
start();
