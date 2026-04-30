import { useState } from "react";
import { api } from "../services/api";
import "../styles/login.scss";

const Register = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo_usuario: "1"
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/usuario", form);
      setMsg("Usuário criado com sucesso!");
    } catch (err) {
      setMsg(err.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nome"
          onChange={(e) => setForm({...form, nome: e.target.value})}
        />

        <input placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <input type="password" placeholder="Senha"
          onChange={(e) => setForm({...form, senha: e.target.value})}
        />

        <select
          onChange={(e) => setForm({...form, tipo_usuario: e.target.value})}
        >
          <option value="1">User</option>
          <option value="2">Admin</option>
        </select>

        <button>Cadastrar</button>
      </form>

      {msg && <p>{msg}</p>}

      <a href="/">Voltar</a>
    </div>
  );
};

export default Register;