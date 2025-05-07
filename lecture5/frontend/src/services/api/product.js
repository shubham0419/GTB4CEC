import axios from "axios"

const BaseUrl = "http://localhost:4000"


export const getAllProducts = async (name,sortby,sortOrder,color,gender,size,wearType,productType) => {
  const params = {};
  if(name){
    params.name = name;
  }
  if(sortby){
    params.sortby = sortby;
    params.sortOrder = sortOrder;
  }
  if(color){
    params.color = color
  }
  if(gender){
    params.gender = gender;
  }
  if(size){
    params.size = size;
  }
  if(wearType){
    params.wearType = wearType;
  }
  if(productType){
    params.productType = productType;
  }

}

export const getProductsByCategory = async (category) => {
  
}

export const getNewArrivals = async () => {
  
}

export const getSaleProducts = async () => {
  
}
