const express = require("express");
const {
  updateProductCat,
  deleteProductCat,
  getProductCat,
  createProductCat,
  getStoreOwnerProductCats,
} = require("../controllers/productcat.controller");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.route("/").get(getStoreOwnerProductCats).post(createProductCat);
router
  .route("/:productCatId")
  .get(getProductCat)
  .patch(updateProductCat)
  .delete(deleteProductCat);

module.exports = router;
