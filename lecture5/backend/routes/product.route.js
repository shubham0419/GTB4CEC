const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByCategory } = require("../controller/product.controller");
const { isAdmin, isloggedIn } = require("../middleware");
const router = express.Router();

router.post("/create",isloggedIn,isAdmin,createProduct);
router.put("/update/:id",isloggedIn,isAdmin,updateProduct);
router.delete("/delete/:id",isloggedIn,isAdmin,deleteProduct);
router.get("/",getAllProducts);
router.get("/category/:id",getProductsByCategory);

module.exports = router;