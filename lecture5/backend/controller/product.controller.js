const Product = require("../model/product.model")


const createProduct = async (req,res)=>{
  try {
    const product = await Product.create(req.body);
    res.status(200).json({message:"product created successfully",product})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

module.exports = {createProduct};