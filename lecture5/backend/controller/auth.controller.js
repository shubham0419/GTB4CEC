const JWT = require("jsonwebtoken");
const Users = require("../model/user.schema");
const bcrypt = require("bcrypt");

const login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const isUser = await Users.findOne({email});
    if(!isUser){
      res.status(404).json({message:"user not found"})
    }
    
    const isMatched = password==isUser.password;

    if(!isMatched){
      res.status(404).json({message:"Invalid password"})
    }

    const user = {
      email,
      name:isUser.name,
      // id:isUser.id
    }
    
    const token = JWT.sign(user,process.env.JWT_SECRET,{expiresIn:"1m"});

    res.status(200).json({
      user,
      token
    })
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