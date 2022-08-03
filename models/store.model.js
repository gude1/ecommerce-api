const mongoose = require("mongoose");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const storeSchema = new mongoose.Schema(
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
    description: {
      type: mongoose.Schema.Types.String,
      minLength: 3,
      default: "",
    },
    logo: {
      type: mongoose.Schema.Types.String,
      unique: true,
      default: null,
    },
    storeownerid: {
      type: mongoose.Schema.Types.String,
      ref: "StoreOwner",
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Store ", storeSchema);
