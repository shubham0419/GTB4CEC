const Users = require("../model/user.schema");

const getUser = async (req,res)=>{
  try {
    const user = req.user;
    res.status(200).json({message:"user fetched Successfully",user})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

const updateUser = async (req,res)=>{
  try {
    const {id} = req.user;

    const user = await Users.findByIdAndUpdate(id,req.body);
    res.status(200).json({message:"user updated Successfully",user});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

module.exports = {getUser,updateUser}