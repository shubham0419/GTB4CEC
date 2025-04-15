const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/auth.route");
const connectDb = require("./db");

app.get("/", (req, res) => {
  res.status(200).json({message:"you have the Access"})
});

app.use("/auth",authRoutes);

app.listen(PORT, () => {
  connectDb()
  console.log("Server running on port " + PORT)
});