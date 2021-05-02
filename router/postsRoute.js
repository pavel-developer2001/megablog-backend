const Router = require("express");
const router = Router();
const postController = require("../controllers/postController");

// router.get("/", postController.test);
router.post("/addPost", postController.createPost);

module.exports = router;
