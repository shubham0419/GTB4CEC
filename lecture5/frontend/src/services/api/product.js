import axios from "axios";

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

    const res = await axios.get(BaseUrl + "/product", params);
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

export const getProductsByCategory = async (category) => {};

export const getNewArrivals = async () => {};

export const getSaleProducts = async () => {};
