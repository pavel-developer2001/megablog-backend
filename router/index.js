const Router = require("express");
const router = new Router();
const usersRouter = require("./usersRoute");

router.use("/user", usersRouter);
module.exports = router;
