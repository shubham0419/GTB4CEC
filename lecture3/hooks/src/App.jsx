import { useEffect, useState } from 'react'
import './App.css'
import Hello from './component/Hello';

function App() {

  // let count = 0;

  // function handleIncriment(){
  //   count++;
  //   console.log(count);
  // }

  // hooks
  const [count,setCount] = useState(5);

  function handleIncriment(){
    // setCount(count+1);
    setCount((prev)=>{return prev+1})
  }

  useEffect(()=>{
    console.log("helloooooo");
  },[count])

  
  return (
    <>
      {count}
      <button onClick={handleIncriment}>Incriment</button>
      <Hello setter={setCount}/>
    </>
  )
}

export default App
