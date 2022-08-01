const jwt = require("jsonwebtoken");
const StoreOwner = require("../models/storeowner.model");
const { reportError } = require("../helpers/utlity");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const storeowner = jwt.verify(token, process.env.ACCESS_KEY);
    if (!storeowner) {
      return res.status(401).json({
        success: false,
        error: "Authenticatication failed",
      });
    }
    req.storeowner = await StoreOwner.findOne({ _id: storeowner._id });
    next();
  } catch (err) {
    reportError(err, "verifyToken err");
    return res.status(401).json({
      success: false,
      error: "Authenticatication failed",
    });
  }
};
