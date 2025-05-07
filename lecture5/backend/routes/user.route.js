const express = require("express");
const { getUser, updateUser, toggleCart, toggleFavourites } = require("../controller/user.controller");
const router = express.Router();

router.get("/",getUser);
router.put("/update",updateUser);
router.get("/toggleCart",toggleCart);
router.get("/toggleFavourites",toggleFavourites);

module.exports = router;