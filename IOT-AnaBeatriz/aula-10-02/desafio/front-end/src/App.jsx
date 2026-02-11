import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      <Home />
    </>
  )
}

export default App
