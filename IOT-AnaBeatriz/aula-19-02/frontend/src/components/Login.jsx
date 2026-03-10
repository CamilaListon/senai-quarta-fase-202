import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- hook do React Router
import { api } from "../services/api.js";
import "../style/Login.css";


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
      <div className="login">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="email-senha">
          <div className="email">
            <label>Email: </label>
            <input
              className="inplogin"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="senha">
            <label>Senha: </label>
            <input
              className="inplogin"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
        </div>

    <div className="entrar">
        <button type="submit" id="log-in">Entrar</button>
    </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <div className="baixo">
        <div className="faca-cadastro">
          <a href="/register">Faça seu Cadastro!</a>
        </div>
        <div className="esqueci-senha">
          <a href="/esqueci-senha">Esqueci Minha Senha</a>
        </div>
      </div>
    </div>
  );
};

export default Login;