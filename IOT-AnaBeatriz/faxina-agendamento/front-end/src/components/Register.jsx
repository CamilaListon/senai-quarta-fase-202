import { useState } from "react";
import { api } from "../services/api";
import "../styles/Register.scss";

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
    <div className="cadastro-container">
      <h2 className="login-cadastro">Cadastro</h2>

      <div className="formulario-cadastro">
        <form onSubmit={handleSubmit} className="formulario-interno-cadastro">
          <input placeholder="Nome" className="input-cadastro"
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <input placeholder="Email" className="input-cadastro"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input type="password" placeholder="Senha" className="input-cadastro"
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
          />

          <select
            onChange={(e) => setForm({ ...form, tipo_usuario: e.target.value })}
          >
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>

          <button>Cadastrar</button>
        </form>

        {msg && <p>{msg}</p>}

        <div className="cadastrar-btn">
          <a href="/">Voltar</a>
        </div>
      </div>
    </div>
  );
};

export default Register;