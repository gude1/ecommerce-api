const mongoose = require("mongoose");
const crypto = require("crypto");
const { PRODUCT_IMGS_PATH } = require("../constant");
require("dotenv").config();

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
      get: (data) => {
        if (!data) {
          return null;
        }
        return `${process.env.SERVER_HOST}/${PRODUCT_IMGS_PATH}/${data}`;
      },
    },
    category_id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      min: 1,
      required: true,
    },
    hidden: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
    creator_id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    store_id: {
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

productSchema.virtual("store", {
  ref: "Store",
  localField: "store_id",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("category", {
  ref: "ProductCat",
  localField: "category_id",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("store_owner", {
  ref: "StoreOwner",
  localField: "category_id",
  foreignField: "_id",
  justOne: true,
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
