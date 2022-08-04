const { reportError } = require("../helpers/utlity");
const Store = require("../models/store.model");

exports.createOrUpdateStore = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.storeowner;
    const { storeId } = req.params;
    let store = storeId
      ? await Store.findOne({ storeownerid: _id, _id: storeId })
      : await Store.findOne({ storeownerid: _id });

    if (req.method == "PATCH" && !store) {
      return res.status(404).json({
        success: false,
        error: `Store with id of ${storeId} not found`,
      });
    }

    if (req.method == "POST" && store) {
      return res.status(400).json({
        success: false,
        error: `You have already created a store`,
      });
    }

    if (store) {
      store.name = name || store.name;
      store.description = description || store.description;
      store.logo = req?.file?.filename || store.logo;
      await store.save();
    } else {
      store = await Store.create({
        name,
        description,
        logo: req.file?.filename,
        storeownerid: _id,
      });
    }
    return res.status(200).json({
      success: true,
      store,
    });
  } catch (err) {
    reportError(err, "createOrUpdateStore err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.fetchAStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findOne({ _id: storeId });
    if (!store) {
      return res.status(404).json({
        success: false,
        error: `Store with id of ${storeId} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      store,
    });
  } catch (err) {
    reportError(err, "fetchAStore err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};
