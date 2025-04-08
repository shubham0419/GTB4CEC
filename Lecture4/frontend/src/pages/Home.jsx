import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [allTodos,setAllTodos] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  // async function getAllTodos(){
  // }
  const getAllTodos = async()=>{
    try {
      const res = await axios.get("http://localhost:5000/alltodos");
      console.log(res.data.TODOS)
      setAllTodos(res.data.TODOS);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllTodos();
  },[])

  const handleSubmit = async()=>{

  }
  const handleTitleChange = (event)=>{
    setTitle(event.target.value)
    console.log(title);
  }
  const handleDesChange = (event)=>{
    setDescription(event.target.value)
    console.log(description);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleTitleChange} type='text' placeholder='Title'/>
        <input onChange={handleDesChange} type='text' placeholder='Description'/>
        <button>Add</button>
      </form>
      {allTodos.map((todo)=>{
        return <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      })}
    </div>
  )
}

export default Home