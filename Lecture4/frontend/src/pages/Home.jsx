import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [allTodos,setAllTodos] = useState([]);
  // async function getAllTodos(){
  // }
  const getAllTodos = async()=>{
    try {
      const res = await axios.get("http://localhost:5000/alltodos");
      console.log(res.data.TODOS);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllTodos();
  },[])

  return (
    <div>Home</div>
  )
}

export default Home