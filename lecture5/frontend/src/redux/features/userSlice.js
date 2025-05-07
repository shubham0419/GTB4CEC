import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    value: {
      _id: "",
      name: "",
      email: "",
      role: "",
      dob:"",
      userImage:"",
      favourites: [],
      cart: [],
      addresses: [],
      createdAt: "",
      updatedAt: "",
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    resetUserData:(state) =>{
      state.value = {}
    }
  },
});

// Action creators are generated for each case reducer function
export const {setUserData,resetUserData } = userSlice.actions;
export default userSlice.reducer;
