const { reportError } = require("../helpers/utlity");
const StoreOwner = require("../models/storeowner.model");

/**
 * This function returns the currently authenticated store owner
 *
 * @param {*} res
 * @param {*} req
 * @returns
 */
exports.getStoreOwner = async (req, res) => {
  try {
    const { storeowner } = req;
    const { name, _id, email, image } = storeowner;
    return res.status(200).json({
      success: true,
      data: {
        storeowner: { name, _id, email, image },
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

/**
 * This function returns all store owners
 *
 * @param {*} req
 * @param {*} res
 */
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
