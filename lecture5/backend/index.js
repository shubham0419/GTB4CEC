const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDb = require("./db");

app.get("/", (req, res) => {
  res.status(200).json({message:"you have the Access"})
});

// routers
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const { isloggedIn } = require("./middleware");

app.use("/auth",authRoutes);
app.use("/user",isloggedIn,userRoutes);

app.listen(PORT, () => {
  connectDb()
  console.log("Server running on port " + PORT)
});