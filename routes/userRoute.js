const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/userMiddleware");
router.post("/create", userController.createUser);
router.post("/get/:id", verifyToken, userController.getUserById);
router.get("/get", verifyToken, userController.getAllUser);
router.post("/update/:id", verifyToken, userController.updateUser);
router.post("/delete/:id", verifyToken, userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
