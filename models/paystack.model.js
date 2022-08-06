const mongoose = require("mongoose");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const paystackSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
    public_key: {
      type: mongoose.Schema.Types.String,
      required: true,
      minLength: 8,
    },
    secret_key: {
      type: mongoose.Schema.Types.String,
      required: true,
      minLength: 8,
    },
    test: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
      default: true,
    },
    store_id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.Types.String,
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
module.exports = mongoose.model("Paystack", paystackSchema);
