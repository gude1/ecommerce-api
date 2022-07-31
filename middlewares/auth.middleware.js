const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { reportError } = require("../helpers/utlity");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_KEY);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Authenticatication failed",
      });
    }
    req.user = await User.findOne({ _id: user._id });
    next();
  } catch (err) {
    reportError(err, "verifyToken err");
    return res.status(401).json({
      success: false,
      error: "Authenticatication failed",
    });
  }
};
