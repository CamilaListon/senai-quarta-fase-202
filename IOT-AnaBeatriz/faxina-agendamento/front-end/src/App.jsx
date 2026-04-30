import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Agendamentos from "./components/Agendamentos";
import Clientes from "./components/Clientes";
import Profissionais from "./components/Profissionais";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protegidas */}
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/agendamentos" element={
          <PrivateRoute>
            <Agendamentos />
          </PrivateRoute>
        } />

        <Route path="/clientes" element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        } />

        <Route path="/profissionais" element={
          <PrivateRoute>
            <Profissionais />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;