import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Produtos from "./components/Produtos.jsx";
import EsqueciMinhaSenha from "./components/EsqueciMinhaSenha.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/esqueci-senha" element={<EsqueciMinhaSenha />} />
      </Routes>
    </Router>
  );
}

export default App;