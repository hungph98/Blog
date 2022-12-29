const router = require("express").Router();
const PostController = require("../controllers/Post");

router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/find/:id", PostController.getPostById);
router.get("/", PostController.getAllPost);

module.exports = router;