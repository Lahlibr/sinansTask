import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, delTodo, editTodo } from './TodoSlice';

function TodoList() {
  const [text, setText] = useState('');
  const [confirmId, setConfirmId] = useState();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [completedIds, setCompletedIds] = useState([]);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleDelete = () => {
    dispatch(delTodo(confirmId));
    setConfirmId(null);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, newText: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const toggleCompleted = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {todos.map(({ id, text }) => (
          <div key={id} style={{ color: completedIds.includes(id) ? 'green' : 'red' }}>
            <input
              type="checkbox"
              checked={completedIds.includes(id)}
              onChange={() => toggleCompleted(id)}
            />
            {editId === id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleEditSave(id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {text}
                <button onClick={() => { setEditId(id); setEditText(text); }}>
                  Edit
                </button>
                <button onClick={() => setConfirmId(id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </ul>

      {confirmId && (
        <>
          <p>Are you sure you want to delete?</p>
          <button onClick={() => setConfirmId(null)}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  );
}

export default TodoList;
