const Product = require("../model/product.model")

const createProduct = async (req,res)=>{
  try {
    const product = await Product.create(req.body);
    res.status(200).json({message:"product created successfully",product})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

const updateProduct = async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.updateOne({_id:id},req.body);
    res.status(200).json({message:"Product updated successsfully",product})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

const deleteProduct = async(req,res)=>{
  try {
    const {id} = req.params;
    const product = await Product.deleteOne({_id:id});
    res.status(200).json({message:"Product deleted successsfully",product})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

const getAllProducts = async(req,res)=>{
  try {
    const {name,sortby,sortOrder,color,size,gender,productType,wearType} = req.query;

    const pipline = []
    if(name){
      const nameQuery = {
        $match: {
          // Your search criteria here
          // Example: Search for documents where 'name' contains 'abc'
          name: { $regex: name, $options: 'i' },
        },
      }
      pipline.push(nameQuery);
    }
    if(sortby){
      if(sortby=="price"){
        const sortquery = {
          $sort:{
            price: sortOrder=="asc"? 1 : -1, // sortby is field(price, name ) and 1 stands for ascending order ,-1 stand for descending order
          }  
        }
      pipline.push(sortquery);}
    }
    if(color){
      pipline.push({
        $match: {
          colors: color,
        },
      });
    }
    if(size){
      pipline.push({
        $match:{
          sizes:size
        }
      })
    }
    if(gender){
      pipline.push({
        $match:{
          gender:gender
        }
      })
    }
    if(productType){
      pipline.push({
        $match:{
          productType:productType
        }
      })
    }
    if(wearType){
      pipline.push({
        $match:{
          wearType:wearType
        }
      })
    }

    pipline.push({
      $lookup: {
        from: 'categories', // The collection name (usually lowercase and plural of the model name)
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    });
    
    pipline.push({
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true 
      }
    });
    
    const products = await Product.aggregate(pipline);
    res.status(200).json({message:"product found successfully",products})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

const getProductsByCategory = async(req,res)=>{
  try {
    const {id} = req.params;
    const products = await Product.find({category:id});
    res.status(200).json({message:"Products fetched successfully",products})
  } catch (error) {
    res.status(402).json({message:error.message});
  }
}

module.exports = {createProduct,updateProduct,deleteProduct,getAllProducts,getProductsByCategory};