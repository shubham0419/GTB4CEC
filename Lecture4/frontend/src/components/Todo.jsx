import React from "react";
import './Todo.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/features/todo/todoSlice";

const Todo = ({singleTodo}) => {
  const dispatch = useDispatch()

  const handleDelete = async()=>{
    try {
      let res = await axios.delete(`http://localhost:5000/delete/${singleTodo.id}`);
      // setter(res.data.TODOS); 
      dispatch(updateTodo(res.data.TODOS));
    } catch (error) {
      console.log(error); 
    }
  }
  return (
    <div id="todo">
      <div>
        <h3>{singleTodo.title}</h3>
        <p>{singleTodo.description}</p>
      </div>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default Todo;
