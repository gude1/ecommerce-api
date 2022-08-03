const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getStoreOwner,
  getAllStoreOwners,
  updateStoreOwner,
} = require("../controllers/storeowner.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const profileimgMulter = require("../middlewares/profileimg.multer-config");

router.use(verifyToken);
router.get("/", getStoreOwner);
router.patch("/", profileimgMulter, updateStoreOwner);
router.get("/all", getAllStoreOwners);
// router.route("/").get(getStorOwner);

module.exports = router;
