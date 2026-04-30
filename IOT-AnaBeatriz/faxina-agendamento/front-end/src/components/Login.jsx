import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, senha });

      localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao logar");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button>Entrar</button>
      </form>

      {error && <p className="erro">{error}</p>}

      <a href="/register">Criar conta</a>
    </div>
  );
};

export default Login;