const express = require("express");
const {
  getStoreOwner,
  getAllStoreOwners,
} = require("../controllers/storeowner.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const app = express();
const router = express.Router();

router.use(verifyToken);
router.get("/", getStoreOwner);
router.get("/all", getAllStoreOwners);
// router.route("/").get(getStorOwner);

module.exports = router;
