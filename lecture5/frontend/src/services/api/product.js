import axios from "axios";

const BaseUrl = "http://localhost:5000";

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

export const getProductsByCategory = async (category) => {};

export const getNewArrivals = async () => {};

export const getSaleProducts = async () => {};
