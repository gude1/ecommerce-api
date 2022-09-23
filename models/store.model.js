const mongoose = require("mongoose");
const crypto = require("crypto");
const { STORE_IMGS_PATH } = require("../constant");
require("dotenv").config();

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
    },
    description: {
      type: mongoose.Schema.Types.String,
      minLength: 3,
    },
    logo: {
      type: mongoose.Schema.Types.String,
      default: null,
      get: function (data) {
        if (!data) {
          return null;
        }
        return `${process.env.SERVER_HOST}/${STORE_IMGS_PATH}/${data}`;
      },
    },
    storeownerid: {
      type: mongoose.Schema.Types.String,
      ref: "StoreOwner",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

//Export the model
module.exports = mongoose.model("Store", storeSchema);
