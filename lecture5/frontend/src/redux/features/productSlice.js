import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [{
      _id: "",
      name: "",
      price: 0,
      quantity: 0,
      category: "",
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
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    resetUserData: (state) => {
      state.value = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, resetUserData } = productSlice.actions;
export default productSlice.reducer;
