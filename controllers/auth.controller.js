const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { isEmpty, reportError } = require("../helpers/utlity");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let errs = {};
    if (!name || name.length < 6 || name.length > 20) {
      errs = {
        ...errs,
        name: "Name is required and must be between 6-20 characters",
      };
    }
    if (!email || email.length < 8) {
      errs = {
        ...errs,
        email: "Email is required and must be atleast 6 characters long",
      };
    }
    if (!password || password.length < 6 || password.length > 11) {
      errs = {
        ...errs,
        password: "Password is required and must be between 6-11 characters",
      };
    }
    if (!isEmpty(errs)) {
      return res.status(400).send({
        success: false,
        errors: errs,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedpassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    reportError(err, "registerUser err");
    return res.status(err?.response?.status || 500).json({
      success: false,
      error:
        err?.message ||
        "Could not proccess your request at this time please try again",
    });
  }
};

exports.logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const verify = bcrypt.compare(password, user?.password || "");
    if (!user || !verify) {
      return res.status(400).send({
        success: false,
        error: "Incorrect email or password",
      });
    }
    const token = await jwt.sign({ user }, process.env.ACCESS_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    reportError(err, "logUserIn err");
    return res.status(err?.response?.status || 500).json({
      success: false,
      error:
        err?.message ||
        "Could not proccess your request at this time please try again",
    });
  }
};
