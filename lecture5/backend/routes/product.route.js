const express = require("express");
const { createProduct } = require("../controller/product.controller");
const { isAdmin } = require("../middleware");
const router = express.Router();

router.post("/create",isAdmin,createProduct)

module.exports = router