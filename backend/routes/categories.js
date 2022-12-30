const router = require("express").Router();
const CategoryController = require("../controllers/Category");

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategory);

module.exports = router;