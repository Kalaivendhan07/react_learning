

export default function CounterBtn({label,onClick,disable}) {
    
    return (
        <button onClick={onClick} disabled={disable} >{label}</button>
    )
}