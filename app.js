const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const port = 3000;

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
