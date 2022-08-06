const { reportError } = require("../helpers/utlity");
const Paystack = require("../models/paystack.model");
const Store = require("../models/store.model");

exports.createOrUpdatePayStackInfo = async (req, res) => {
  try {
    const { _id } = req.storeowner;
    const { public_key, secret_key, test } = req.body;

    const store = await Store.findOne({ creator_id: _id });
    if (!store) {
      return res.status(400).json({
        success: false,
        error: "Missing values  to continue",
      });
    }

    let paystack = await Paystack.findOne({ creator_id: _id });

    if (!paystack) {
      paystack = await Paystack.create({
        public_key,
        secret_key,
        test: test || true,
        store_id: store._id,
        creator_id: _id,
      });
    } else {
      paystack.public_key = public_key || paystack.public_key;
      paystack.secret_key = secret_key || paystack.secret_key;
      paystack.test = test || paystack.test;
      paystack.store_id = store._id;
      await paystack.save();
    }

    return res.status(200).json({
      success: true,
      data: {
        paymentinfo: {
          public_key: paystack.public_key,
          secret_key: paystack.secret_key,
          test: paystack.test,
          _id: paystack._id,
        },
      },
    });
  } catch (err) {
    reportError(err, "createOrUpdatePayStackInfo Err");
    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "Could not process your request at this time please try again",
    });
  }
};

exports.getPayStackInfo = async (req, res) => {
  try {
    const { storeId } = req.params;
    const paystack = await Paystack.findOne({ store_id: storeId }).select(
      "public_key secret_key test"
    );

    if (!paystack) {
      return res.status(404).json({
        success: false,
        error: "Payment info not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        paymentinfo: paystack,
      },
    });
  } catch (err) {
    reportError(err, "getPayStackInfo Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};
