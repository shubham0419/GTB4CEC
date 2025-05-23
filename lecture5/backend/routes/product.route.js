const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductsByCategory, getProductById, createCategory, getAllCategories } = require("../controller/product.controller");
const { isAdmin, isloggedIn } = require("../middleware");
const router = express.Router();

router.post("/create",isloggedIn,isAdmin,createProduct);
router.put("/update/:id",isloggedIn,isAdmin,updateProduct);
router.post("/category/create",isloggedIn,isAdmin,createCategory)
router.get("/categories",getAllCategories);
router.delete("/delete/:id",isloggedIn,isAdmin,deleteProduct);
router.get("/all",getAllProducts);
router.get("/category/:id",getProductsByCategory);
router.get("/:id",getProductById);

module.exports = router;