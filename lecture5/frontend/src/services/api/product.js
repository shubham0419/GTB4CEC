import axios from "axios";
import Cookies from "js-cookie";
const BaseUrl = "http://localhost:4000";

export const getAllProducts = async (
  name,
  sortby,
  sortOrder,
  color,
  gender,
  size,
  wearType,
  productType
) => {
  try {
    const params = {};
    if (name) {
      params.name = name;
    }
    if (sortby) {
      params.sortby = sortby;
      params.sortOrder = sortOrder;
    }
    if (color) {
      params.color = color;
    }
    if (gender) {
      params.gender = gender;
    }
    if (size) {
      params.size = size;
    }
    if (wearType) {
      params.wearType = wearType;
    }
    if (productType) {
      params.productType = productType;
    }

    const res = await axios.get(BaseUrl + "/product/all", params);
    return res.data.products;
  } catch (error) {
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await axios.get(`${BaseUrl}/product/${productId}`)
    return res.data.product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export const createCategory = async (categoryName)=>{
  try {
    const payload = {
      name:categoryName
    }
    const token = Cookies.get("token");
    const res = await axios.post(BaseUrl+"/product/category/create",payload,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    return res.data.category.name;
  } catch (error) {
    console.log(error);
  }
}

export const getAllCategories = async ()=>{
  try {
    let res = await axios.get(BaseUrl+"/product/categories");
    return res.data.categories;
  } catch (error) {
    console.log(error);
  }
}

export const getProductsByCategory = async (category) => {};

export const getNewArrivals = async () => {};

export const getSaleProducts = async () => {};
