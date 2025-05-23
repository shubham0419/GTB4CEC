const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "minimum price is 1 rupee"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "minimum quantity is 0 rupee"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  productType: {
    type: String,
    enum: ["wear", "playable", "equipment"],
  },
  sizes: [
    {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  ],
  colors: [
    {
      type: String,
      enum: ["red","blue","green","yellow","black","white","orange","purple","pink","brown","gray","cyan","magenta"],
    },
  ],
  gender:{
    type:String,
    enum:["male","female","both"]
  },
  wearType:{
    type:String,
    enum:["bottom","top"]
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required:true
  },
  sale:{
    live:{
      type:Boolean,
      default:false
    },
    discountPercentage:{
      type:Number
    },
    discoutnAmount:{
      type:Number
    }
  },
  image:{
    type:String
  }
},
{timestamps:true}
);

const Product = mongoose.model("Product",productSchema);
module.exports = Product;