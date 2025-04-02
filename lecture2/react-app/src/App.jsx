import './App.css'
import Navbar from './components/Navbar'

function App() {
  
  const user = {
    name:"shubham",
    college:"NSUT",
    school:"RPVV",
    college_year:2023
  }

  return (
    <>
      <Navbar user={user} time={(new Date()).getTime()}/>
      {/* <Navbar></Navbar> */}
      {/* {Navbar()} */}
    </>
  )
}

export default App
