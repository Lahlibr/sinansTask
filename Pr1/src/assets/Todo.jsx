import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, delTodo } from './TodoSlice';
function TodoList() {
  const [text,setText] = useState('');
  const [confirmId,setConfirmId]=useState();
  const [color,setColour] = useState('red')
  const dispatch = useDispatch();
  const todos = useSelector(state=>state.todos)
  const handleAdd =(e)=>{
    e.preventDefault();
    if(text.trim()){
      dispatch(addTodo(text))
      setText('')
    }
  }
  const deletetodo=()=>{
    dispatch(delTodo(confirmId))
    setConfirmId(null)
  }
  return (
    <>
      <form onSubmit={handleAdd}> 
        <input type='text' value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <button>Add</button>
      </form>
      
      <ul>
     
        {todos.map(({id,text})=>
          
          <li style={{color:color}} onClick={()=>setColour('green')} type="checkbox" key={id} >{text}
          <button onClick={()=>
            setConfirmId(id)
          }>Delete</button></li>
        )}
      </ul>
      {confirmId&&(
        <>
        <p>sure</p>
        <button onClick={()=> setConfirmId(null)}>Cancel</button>
        <button onClick={deletetodo}>Delete</button>
        </>
      )}
    </>
  )
}

export default TodoList
