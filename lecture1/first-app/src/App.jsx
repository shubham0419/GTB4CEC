import './App.css'

function App() {

  const name = "shubham";
  // if(name){
  // }
  const n = 7;

  const m = undefined ?? 5;

  const arr = [1,2,3,4,5,6,7,8,9];
  const sqArr = arr.map((it)=>{
    return it*it;
  })
  console.log(sqArr);

  const oddArr = arr.filter((it)=>{
    return it%2;
  })
  console.log(oddArr);

  const total = arr.reduce((accum,it)=>{
    return accum+it
  },0)

  // calculate sum of all the even numbers without using filter
  const evenSum = arr.reduce((accum,it)=>{
    if(it%2==0){
      return accum+it
    }
    return accum;
  },0)
  console.log(evenSum);

  const ele = arr.find((it)=>{
    return it%5;
  }) // return 1 as 1%5 is true

  const elem = arr.find((it)=>{
    return !(it%5);
  }) //return 5 as !(5%5) is true

  return (
    <>
      <p>{(n===5)?name:"Go Back"}</p>
      <p>{(n===7) && name}</p>
      <p>{n<7 || name}</p>
      <p>{m}</p>
      {/* {arr.map((it)=>{
        return <p key={it}>{it}</p>
      })} */}
      {arr.map((it,index)=>{
        return <p key={index}>{it}</p>
      })}
    </>
  )
}

export default App
