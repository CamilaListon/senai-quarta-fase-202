import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- hook do React Router
import { api } from "../services/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // <- inicializa o hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Enviando:", { email, senha });
      const response = await api.post("/login", { email, senha });

      console.log("Resposta:", response.data);

      // Salva o token no localStorage
      localStorage.setItem("token", response.data.token);

      // Redireciona para a página de produtos
      navigate("/produtos");
    } catch (err) {
      console.log("Erro ao logar:", err);
      setError(err.response?.data?.message || "Erro desconhecido");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <div>
        <a href="/register">Faça seu Cadastro!</a>
      </div>
    </div>
  );
};

export default Login;