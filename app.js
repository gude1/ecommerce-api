const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const database = require("./helpers/database");
const cors = require("cors");
require("dotenv").config(); //process.env.DB_HOST

database.connectToDb(process.env.DB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.all("*", (req, res) =>
  res.status(404).json({
    success: false,
    error: "Resource not found",
  })
);

module.exports = app;
