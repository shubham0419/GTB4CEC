import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Todo from '../components/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../redux/features/todo/todoSlice';

const Home = () => {
  // const [allTodos,setAllTodos] = useState([]);
  const allTodos = useSelector(state => state.todo.value)
  const dispatch = useDispatch();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  // async function getAllTodos(){
  // }
  const getAllTodos = async()=>{
    try {
      const res = await axios.get("http://localhost:4000/alltodos");
      console.log(res.data.TODOS);
      // setAllTodos(res.data.TODOS);
      dispatch(updateTodo(res.data.TODOS));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllTodos();
  },[])

  const handleSubmit = async(event)=>{
    event.preventDefault();
    const payload = {
      title,
      description
    }
    const res = await axios.post("http://localhost:4000/create",payload);
    // setAllTodos(res.data.TODOS);
    dispatch(updateTodo(res.data.TODOS));
  }

  const handleTitleChange = (event)=>{
    setTitle(event.target.value)
  }
  const handleDesChange = (event)=>{
    setDescription(event.target.value)
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input onChange={handleTitleChange} type='text' placeholder='Title'/>
        <input onChange={handleDesChange} type='text' placeholder='Description'/>
        <button>Add</button>
      </form>
      {allTodos.map((todo)=>{
        return <Todo key={todo.id} singleTodo={todo} />
      })}
    </div>
  )
}

export default Home