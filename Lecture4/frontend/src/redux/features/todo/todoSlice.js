import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'Todos',
  initialState: {
    value: []
  },
  reducers: {
    updateTodo: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateTodo } = todoSlice.actions

export default todoSlice.reducer