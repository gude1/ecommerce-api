const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
require("dotenv").config();

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
    paystack_ref: {
      type: mongoose.Schema.Types.String,
      default: () => crypto.randomBytes(32).toString("hex"),
      required: true,
      unique: true,
    },
    items: {
      type: [mongoose.Schema.Types.String],
      required: true,
    },
    store_id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    customer_name: {
      type: mongoose.Schema.Types.String,
      minLength: 3,
      required: true,
    },
    customer_email: {
      type: mongoose.Schema.Types.String,
      minLength: 8,
      required: true,
      lowercase: true,
    },
    amount_paid: {
      type: mongoose.Schema.Types.Number,
      min: 100,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.String,
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

orderSchema.plugin(uniqueValidator);
orderSchema.plugin(mongoosePaginate);

orderSchema.virtual("ordered_products", {
  ref: "Product",
  localField: "items",
  foreignField: "_id",
  justOne: true,
});

orderSchema.virtual("store", {
  ref: "Store",
  localField: "store_id",
  foreignField: "_id",
  justOne: true,
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
