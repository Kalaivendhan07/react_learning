import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  
    const refVal=useRef(null);

    useEffect(()=>{
        refVal.current.focus()
    },[])

    return (
       <>
        <input ref={refVal} type="text" placeholder="Enter your name..." />
       </>
    )
}