const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", authController.registerUser);
router.post("/login", authController.logUserIn);
route.post("/refreshaccess", authController.refreshAccessToken);

module.exports = router;
