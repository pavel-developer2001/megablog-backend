const Router = require("express");
const router = new Router();
const usersRouter = require("./usersRoute");
const postsRouter = require("./postsRoute");

router.use("/user", usersRouter);
router.use("/posts", postsRouter);
module.exports = router;
