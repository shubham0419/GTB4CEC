import React from 'react'
import "./Navbar.css"

const Navbar = ({user,time}) => {

  return (
    <div>
      <h1>Navbar {time}</h1>
      <p>Welcome {user.name}</p>
      <p>college:{user.college} {user.college_year}</p>
    </div>
  )
}

export default Navbar