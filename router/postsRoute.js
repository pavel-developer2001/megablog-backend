const Router = require("express");
const router = Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/addPost", postController.createPost);

module.exports = router;
