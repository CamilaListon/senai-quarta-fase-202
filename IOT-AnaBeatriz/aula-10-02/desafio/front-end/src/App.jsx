import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Manutencao from './pages/Manutencao'
import RelatorioEficiencia from './pages/RelatorioEficiencia'
import UsoVeiculo from './pages/UsoVeiculo'
import Veiculos from './pages/Veiculos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    <Manutencao/>
    <UsoVeiculo/>
    <Veiculos/>
    <RelatorioEficiencia/>
    </>
  )
}

export default App
