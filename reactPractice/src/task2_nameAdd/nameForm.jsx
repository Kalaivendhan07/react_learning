import { useState } from "react"



export default function PersonForm({names,addName}) {

    let [text,setText]=useState('')

    let [error,setError]=useState('')

    function valitateFormData(e) {

        e.preventDefault();

        let userName=text.trim();

        if(!userName){
            return setError('Please Enter Name...')
        }

        if(names.some(data=>data.name==userName)){
            return setError('this name already exist...')
        }

        addName(userName)
        setText('')
        setError('')
        
    }
    
    return  (
        <div>
            <form onSubmit={valitateFormData}>
                <input type="text" value={text} placeholder="Enter Your Name..." onChange={(e)=>setText(e.target.value)} />
                <button type="submit">Add</button>
            </form>

            {
                error && <p>{error}</p>
            }
        </div>

      
    )
}