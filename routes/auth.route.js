const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("auth route", "/");
});

router.post("/login", (req, res) => {
  console.log("login", req.body);
  return res.status(200).json({
    success: true,
  });
});

module.exports = router;
