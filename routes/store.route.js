const express = require("express");
const { getAStoresProduct } = require("../controllers/product.controller");
const router = express.Router();
const {
  createOrUpdateStore,
  fetchAStore,
} = require("../controllers/store.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const storeimgMulterConfig = require("../middlewares/storeimg.multer-config");

router.use(verifyToken);
router.post("/", storeimgMulterConfig, createOrUpdateStore);
router
  .route("/:storeId")
  .get(fetchAStore)
  .patch(storeimgMulterConfig, createOrUpdateStore);

router.get("/:storeId/products", getAStoresProduct);

module.exports = router;
