const router = require("express").Router();
const UserController = require("../controllers/User");

router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/find/:id", UserController.getUserById);
router.get("/", UserController.getAllUser);

module.exports = router;