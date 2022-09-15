const express = require("express");
const {
  createAOrder,
  updateAOrder,
  fetchAOrder,
  updateOrderPaymentStatus,
} = require("../controllers/order.controller");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", createAOrder);

router
  .route("/:orderId")
  .patch(verifyToken, updateAOrder)
  .get(fetchAOrder)
  .post(updateOrderPaymentStatus);

module.exports = router;
