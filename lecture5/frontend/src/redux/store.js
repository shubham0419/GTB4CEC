import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import productSlice  from './features/productSlice'

export default configureStore({
  reducer: {
    userData:userSlice,
    products:productSlice
  }
})