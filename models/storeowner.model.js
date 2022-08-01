const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Declare the Schema of the Mongo model
const storeOwnerSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    lowercase: true,
    min: 6,
    max: 20,
    index: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    min: 8,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    min: 6,
    max: 11,
    required: true,
  },
});

storeOwnerSchema.plugin(uniqueValidator);
//Export the model
module.exports = mongoose.model("StoreOwner", storeOwnerSchema);
