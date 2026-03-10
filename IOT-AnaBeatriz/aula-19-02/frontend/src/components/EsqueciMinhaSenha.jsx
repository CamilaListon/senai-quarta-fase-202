import { useState } from "react";
import "../style/EsqueciMinhaSenha.css"

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [etapa, setEtapa] = useState(1);

  const verificarEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/usuario/esqueci-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const json = await res.json();

      if (res.ok) {
        setMensagem("Email encontrado! Digite a nova senha.");
        setEtapa(2);
      } else {
        setMensagem(json.message);
      }

    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const redefinirSenha = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/usuario/redefinir-senha", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha: novaSenha
        })
      });

      const json = await res.json();

      if (res.ok) {
        setMensagem("Senha redefinida com sucesso!");
        setEtapa(1);
        setEmail("");
        setNovaSenha("");
        setConfirmarSenha("");
      } else {
        setMensagem(json.message);
      }

    } catch (error) {
      console.error(error);
      setMensagem("Erro ao redefinir senha.");
    }    
  };

  return (
    
    <div className="container">
      <h2>Recuperar Senha</h2>

      {etapa === 1 && (
        <form onSubmit={verificarEmail}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Verificar Email</button>
        </form>
      )}

      {etapa === 2 && (
        <form onSubmit={redefinirSenha}>
          <div>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </div>
        
          <div>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit">Alterar Senha</button>
        </form>
      )}

      {mensagem && <p>{mensagem}</p>}

      <a href="/">Voltar ao login</a>
    </div>
  );
};

export default EsqueciMinhaSenha;