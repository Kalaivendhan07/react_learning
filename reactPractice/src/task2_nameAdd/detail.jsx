import { useState } from "react"
import NameList from "./list"
import PersonForm from "./nameForm"




export default function () {

    let [names,setNames]=useState([])

    function addName(name) {
        console.log(name,'inpuit set name ');
        
        setNames(privName=>[...privName,{id:crypto.randomUUID(),name}])

        console.log(names,'names');
        
    }

    function deleteName(id) {
        setNames(privName=>privName.filter(data=>data.id!=id))
    }

    return <main>
        <h1>Enter your name list:</h1>
        <PersonForm names={names} addName={addName} />
        <div>
            {
                (names.length>0) ? (<span>Data Count : {names.length}</span>) : <span>Names Not saved Yet</span>
            }
        </div>
        <div>
            <ul>
                {
                    names.map((val,index)=>(
                         <NameList key={val.id} name={val.name} position={index+1} remove={()=>deleteName(val.id)} />
                    ))
                }
            </ul>

            {
                names.length>0 && <button onClick={()=>{setNames([])}}>clear All</button>
            }
        </div>
       

    </main>
}