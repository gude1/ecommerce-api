const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const productimgMulterConfig = require("../middlewares/productimg.multer-config");

router.route("/").post(verifyToken, productimgMulterConfig, createProduct);

router
  .route("/:productId")
  .get(getProduct)
  .patch(verifyToken, productimgMulterConfig, updateProduct)
  .delete(verifyToken, deleteProduct);

module.exports = router;
