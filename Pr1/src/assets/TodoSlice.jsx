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
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
  }}
});

export const {addTodo,delTodo,editTodo} = TodoSlice.actions

export default TodoSlice.reducer