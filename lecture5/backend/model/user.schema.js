const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  userImg:{
    type:String,
  },
  dob:{
    type:String
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  favourites:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
  ],
  cart:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
  ],
  addresses:[
    {
      type:String
    }
  ]
},{
  timestamps:true
})

const Users = mongoose.model("User",userSchema);
module.exports = Users;