
import { useState } from "react"
import CounterBtn from "./button"



export default function CounterApp() {
let [count,setCount]=useState(0)
let [inital,setInitial]=useState(1)

let list=[1,2,10]
  
    function inc(val) {
        setCount(priv_val=>priv_val+val)
    }

    function dec(val){
        setCount(priv=>Math.max(0,priv-val))
    }

    function reset() {
        setCount(0)
        setInitial(1)
    }

    return <main>
        <h1>Counter App</h1>
        <h3>{count}</h3>
        <h4>{
            count>=10 && <p>you reached 10</p>
        } </h4>
        <CounterBtn label={'-'+inital} onClick={()=>dec(inital)} disable={count==0}></CounterBtn>
        <CounterBtn label="Reset" onClick={()=>reset()} disable={count==0}></CounterBtn>
        <CounterBtn label={'+'+inital} onClick={()=>inc(inital)}></CounterBtn>

               

        <div>
            <div>Steps List: </div>
            {
                list.map(data=>(
                    <button onClick={()=>setInitial(data)}>{data}</button>
                ))
            }
        </div>
        

    </main>
}