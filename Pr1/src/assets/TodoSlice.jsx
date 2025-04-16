import { createSlice } from '@reduxjs/toolkit'




const TodoSlice = createSlice({
  name: "default",
  initialState:[],
  reducers: {
    addTodo:(state,action)=>{
      state.push({id:Date.now(),text:action.payload})
    },
    delTodo:(state,action)=>{
      return state.filter(todo=> todo.id !== action.payload)
    }
    // editTodo:(state,action)=>{
    //   return state.splice()
    // }
  }
});

export const {addTodo,delTodo} = TodoSlice.actions

export default TodoSlice.reducer