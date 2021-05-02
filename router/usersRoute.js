const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
