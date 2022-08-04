const mongoose = require("mongoose");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
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
      default: "",
    },
    image: {
      type: mongoose.Schema.Types.String,
      default: null,
    },
    catergory_id: {
      type: mongoose.Schema.Types.String,
      ref: "ProductCat",
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      min: 10,
      required: true,
    },
    hidden: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
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
module.exports = mongoose.model("Product", productSchema);
