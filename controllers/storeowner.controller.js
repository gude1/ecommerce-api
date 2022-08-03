const { reportError } = require("../helpers/utlity");
const StoreOwner = require("../models/storeowner.model");

exports.getStoreOwner = async (req, res) => {
  try {
    const { storeowner } = req;
    const { name, _id, email, image } = storeowner;
    return res.status(200).json({
      success: true,
      data: {
        storeowner: storeowner.getPartialInfo(),
      },
    });
  } catch (err) {
    reportError(err, "getStorOwner Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.getAllStoreOwners = async (req, res) => {
  try {
    const store_owners = await StoreOwner.find().select("name _id email image");
    return res.status(200).json({
      success: true,
      data: {
        store_owners,
      },
    });
  } catch (err) {
    reportError(err, "getAllStoreOwners Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.updateStoreOwner = async (req, res) => {
  try {
    const { name } = req.body;
    const { filename } = req.file;
    const storeowner = await StoreOwner.findOne({ _id: req.storeowner._id });
    if (!storeowner) {
      return res.status(400).json({
        success: false,
        error: "Store owner not found",
      });
    }
    storeowner.name = name || storeowner.name;
    storeowner.image = filename || storeowner.image;
    await storeowner.save();

    return res.status(200).json({
      success: true,
      data: {
        storeowner: storeowner.getPartialInfo(),
      },
    });
  } catch (err) {
    reportError(err, "updateStoreOwner Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};
