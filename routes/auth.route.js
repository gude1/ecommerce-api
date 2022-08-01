const express = require("express");
const {
  registerUser,
  logUserIn,
  refreshAccessToken,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", logUserIn);
router.post("/refreshtoken", refreshAccessToken);

module.exports = router;
