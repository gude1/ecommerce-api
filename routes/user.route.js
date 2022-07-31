const express = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const app = express();
const router = express.Router();

router.use(verifyToken);
router
  .route("/")
  .get((req, res) => res.sendStatus(200))
  .post((req, res) => res.sendStatus(200));

module.exports = router;
