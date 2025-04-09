const express = require("express");
const { login,signup } = require("../controller/auth.controller");
const router = express.Router();

router.post("/login",login);

module.exports = router