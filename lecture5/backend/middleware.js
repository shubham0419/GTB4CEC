const JWT = require("jsonwebtoken");

const isloggedIn = async (req,res,next)=>{
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];

    const verified = JWT.verify(token,process.env.JWT_SECRET);

    if(!verified){
      return res.status(402).json({message:"user not authenticated"})
    }

    req.user = verified;

    next();
  } catch (error) {
    res.status(402).json({message:error.message})
  }
}

const isAdmin = async (req,res,next)=>{
  try {
    const role = req.user.role;
    if(role != "admin"){
      return res.status(402).json({message:"user not verified"});
    }
    next();
  } catch (error) {
    res.status(402).json({message:error.message})
  }
}
module.exports = {isloggedIn,isAdmin}