import React from 'react'

const Hello = ({setter}) => {

  function IncrimentFive(){
    setter((prev)=>{
      return prev+5;
    })
  }

  return (
    // <button onClick={()=>{setter((prev)=>{return prev+5})}}>Incriment Five</button>
    <button onClick={IncrimentFive}>Incriment Five</button>

  )
}

export default Hello;