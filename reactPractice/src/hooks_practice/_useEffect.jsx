import { use } from "react";
import { useEffect, useState } from "react";

function TimerComponent() {

  const [count,setCount]=useState(0);

  let price=100;

  let total=count*price;

  const inc=()=>setCount((priv)=>priv+1)

  useEffect(()=>{
    console.log('Effect call every render....',count)
  })

  useEffect(()=>{
    console.log('efect call first render only',count);
    
  },[])


  useEffect(()=>{
    console.log('effect call when mount and variable changes happen','count :',count,'total',total)
  },[total])

  useEffect(()=>{
    const interval=setInterval(()=>{
       if (count>2) {
        inc()
       } 
    },2000)

    return ()=>{
        clearInterval(interval)
        console.log('cleanup function called...');
        
    }
  },[count])



  return (
    <>
      <h1>COUNT : {count}</h1>
      <h2>PRICE : {price}</h2>
      <h3>Total : {total}</h3>

      <button  onClick={inc} >Inc</button>
    </>
  )


}

export default TimerComponent;