const JWT = require("jsonwebtoken");
const Users = require("../users");

const login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const isUser = Users.find((usr)=>usr.email===email);
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
    
  } catch (error) {
    
  }
}
module.exports = {login,signup}