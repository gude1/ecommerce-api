const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", authController.registerUser);

router.post("/login", (req, res) => {
  console.log("login", req.body);
  return res.status(200).json({
    success: true,
  });
});

module.exports = router;
