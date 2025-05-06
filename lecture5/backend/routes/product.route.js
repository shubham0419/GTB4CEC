const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByCategory } = require("../controller/product.controller");
const { isAdmin } = require("../middleware");
const router = express.Router();

router.post("/create",isAdmin,createProduct);
router.put("/update/:id",isAdmin,updateProduct);
router.delete("/delete/:id",isAdmin,deleteProduct);
router.get("/",getAllProducts);
router.get("/category/:id",getProductsByCategory);

module.exports = router;