import axios from "axios"
import Cookies from "js-cookie"

const BaseUrl = "http://localhost:5000"

export const loginUser = async (email, password) => {
  try {
    let payload ={
      email,
      password
    }
    // let res = await axios.post(BaseUrl+"/auth/login",{email,password});
    let res = await axios.post(BaseUrl+"/auth/login",payload);
    Cookies.set("token",res.data.token,{expires:7});
    return res.data.user;
  } catch (error) {
    return error.message;
  }
}

export const registerUser = async (userData) => {
  try {
    let res = await axios.post(BaseUrl+"/auth/register",userData);
    Cookies.set("token",res.data.token,{expires:7});
    return res.data.user;
  } catch (error) {
    return error.message;
  }
}

export const logoutUser = async () => {
  // create api to destroy token from backend
  Cookies.remove("token");
}

export const getCurrentUser = async () => {
  try {
    const token = Cookies.get("token");
    let res = await axios.get(BaseUrl+"/user",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
}
