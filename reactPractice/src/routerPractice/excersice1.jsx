
import {BrowserRouter,Routes,Route,Link,useParams,useNavigate } from "react-router";

function Home() {
    return <h1>Home page</h1>
}


function About(){
    return <h1>About page</h1>
}

function Customers(){
    let {cus_name}=useParams()
    const navigate=useNavigate()
    const handleNavigate=()=>{

        navigate("/")
    }
    return (
    <>
        <h2>Customer Name : {cus_name}</h2>
        <button onClick={handleNavigate} >Home</button>
    </>
    )
}

function NotFound() {
    return <h1>Page Not Found</h1>
}


export default function RoutingPractice() {

   return (
     <BrowserRouter>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
           
        </nav>

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/customer/:cus_name" element={<Customers/>} />
        </Routes>
     </BrowserRouter>
   )
}