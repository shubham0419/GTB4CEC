import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [{
      _id: "",
      name: "",
      price: 0,
      image:"",
      quantity: 0,
      category: {},
      live:{},
      sizes: [],
      colors: [],
      gender: "",
      wearType: "",
      createdBy: "",
      createdAt: "",
      updatedAt: "",
    }],
  },
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
    resetProducts: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, resetProducts } = productSlice.actions;
export default productSlice.reducer;
