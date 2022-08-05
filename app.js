const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const storeRoutes = require("./routes/store.route");
const storeOwnerRoutes = require("./routes/storeowner.route");
const productcatRoutes = require("./routes/productcat.route");
const database = require("./helpers/database");
const cors = require("cors");
const { testUpdateStoreOwner } = require("./tests");
require("dotenv").config();
const { DB_URL } = process.env;

database.connectToDb(DB_URL);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/auth", authRoutes);
app.use("/api/storeowner", storeOwnerRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/productcat", productcatRoutes);
app.all("*", (req, res) =>
  res.status(404).json({
    success: false,
    error: "Resource not found",
  })
);

module.exports = app;
