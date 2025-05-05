const JWT = require("jsonwebtoken");
const Users = require("../model/user.schema");
const bcrypt = require("bcrypt");

const login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await Users.findOne({email});

    if(!user){
      res.status(403).json({message:"Invalid email or Password"});
    }
    
    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
      res.status(403).json({message:"Invalid email or Password"});
    }
    
    const token = JWT.sign({name:user.name,email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({message:"user logged in susscessfully",user,token});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
}

const signup = async(req,res)=>{
  try {
    const {name,email,password,role} = req.body;

    const hashPass = await bcrypt.hash(password,10);

    const user = await Users.create({
      name,
      email,
      password:hashPass,
      role
    })

    const token = JWT.sign({name:user.name,email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({message:"user created susscessfully",user,token});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
module.exports = {login,signup}