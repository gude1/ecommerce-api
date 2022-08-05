const mongoose = require("mongoose");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const productCatSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      minLength: 3,
      index: true,
    },
    store_id: {
      type: mongoose.Schema.Types.String,
      ref: "Store",
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.Types.String,
      ref: "StoreOwner",
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("ProductCat", productCatSchema);
