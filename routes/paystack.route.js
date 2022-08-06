const express = require("express");
const {
  getPayStackInfo,
  createOrUpdatePayStackInfo,
} = require("../controllers/paystack.controller");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

router.route("/").post(verifyToken, createOrUpdatePayStackInfo);
router.post("/:storeId", getPayStackInfo);

module.exports = router;
