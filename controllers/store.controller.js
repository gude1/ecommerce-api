const { reportError } = require("../helpers/utlity");
const Store = require("../models/store.model");

exports.createOrUpdateStore = async (req, res) => {
  try {
    const { filename } = req.file;
    const { name, description, logo } = req.body;
    let has_store = Store.findOne({ creator_id: req.user._id });
  } catch (err) {
    reportError(err, "createStore err");
  }
};
