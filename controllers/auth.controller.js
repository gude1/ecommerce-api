const bcrypt = require("bcrypt");
const StoreOwner = require("../models/storeowner.model");
const jwt = require("jsonwebtoken");
const { isEmpty, reportError } = require("../helpers/utlity");
require("dotenv").config();
const { ACCESS_KEY, REFRESH_KEY } = process.env;

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
    await StoreOwner.create({
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
    return res.status(500).json({
      success: false,
      error: "Could not proccess your request at this time please try again",
    });
  }
};

exports.logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const storeowner = await StoreOwner.findOne({ email });
    if (!storeowner) {
      return res.status(400).send({
        success: false,
        error: "Incorrect email or password",
      });
    }
    const verify = bcrypt.compare(password, storeowner?.password || "");
    if (!verify) {
      return res.status(400).send({
        success: false,
        error: "Incorrect email or password",
      });
    }
    const access = await jwt.sign(
      {
        name: storeowner.name,
        email: storeowner?.email,
        _id: storeowner?._id,
        image: storeowner?.image,
      },
      ACCESS_KEY,
      {
        expiresIn: "5m",
      }
    );

    const refresh = await jwt.sign(
      { _id: storeowner?._id },
      process.env.REFRESH_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        access,
        refresh,
      },
    });
  } catch (err) {
    console.warn("access_key", ACCESS_KEY);
    reportError(err, "logUserIn err");
    return res.status(500).json({
      success: false,
      error: "Could not proccess your request at this time please try again",
    });
  }
};

exports.logUserOut = async (req, res) => {};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refresh } = req.body;
    const _id = jwt.verify(refresh, REFRESH_KEY);
    const storeowner = await StoreOwner.findOne({ _id });
    if (!storeowner) {
      return res.status(403).json({
        success: false,
        error: "Refresh token is invalid",
      });
    }
    const access = await jwt.sign(
      {
        name: storeowner.name,
        email: storeowner?.email,
        _id: storeowner?._id,
        image: storeowner?.image,
      },
      ACCESS_KEY,
      {
        expiresIn: "5m",
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        access,
      },
    });
  } catch (err) {
    reportError(err, "refreshAccessToken err");
    return res.status(403).json({
      success: false,
      error: "Could not validate refresh token",
    });
  }
};
