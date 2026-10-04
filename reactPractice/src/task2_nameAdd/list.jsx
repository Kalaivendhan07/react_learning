
export default function NameList({id,name,position,remove}) {
    return (

           <li>
            <span>{position}.</span>
             <span>{name}</span>
             <button className="btn" onClick={remove}>Delete</button>
           </li>
        
    )
}