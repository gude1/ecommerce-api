const express = require("express");
const app = express();
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);
router
  .route("/")
  .get((req, res) => res.sendStatus(200))
  .post((req, res) => res.sendStatus(200));

router.patch("/:id", (req, res) => res.sendStatus(200));

module.exports = router;
