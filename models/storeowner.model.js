const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const storeOwnerSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      minLength: 6,
      maxLength: 20,
      index: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      minLength: 8,
      required: true,
      lowercase: true,
      unique: true,
    },
    image: {
      type: mongoose.Schema.Types.String,
      default: null,
    },
    password: {
      type: mongoose.Schema.Types.String,
      minLength: 6,
      required: true,
    },
  },
  { timestamps: true }
);

storeOwnerSchema.methods.getPartialInfo = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    image: this.image,
  };
};

storeOwnerSchema.plugin(uniqueValidator);
//Export the model
module.exports = mongoose.model("StoreOwner", storeOwnerSchema);
