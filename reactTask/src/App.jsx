import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import detailsreturn,{personName,professional} from './detail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>hii i am {personName}, i  am a {professional}</h1>

       <div>{detailsreturn({personName:'kalai',professional:'software developer'})}</div>
    </>
  )
}

export default App
