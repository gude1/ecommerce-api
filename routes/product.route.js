const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
} = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const productimgMulterConfig = require("../middlewares/productimg.multer-config");

router.use(verifyToken);
router.route("/").post(productimgMulterConfig, createProduct);

router.route("/:productId").get(getProduct).patch(updateProduct);

module.exports = router;
