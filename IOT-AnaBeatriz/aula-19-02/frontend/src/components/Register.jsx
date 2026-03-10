import { useState } from "react";
import "../style/Register.css"

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("1");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { nome, email, senha, tipo_usuario: tipoUsuario };
    console.log("Enviando:", data);

    try {
      const res = await fetch("http://localhost:3001/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      console.log("Resposta:", json);

      if (res.status === 201) {
        setMensagem("Usuário criado com sucesso!");
        setNome(""); setEmail(""); setSenha("");
      } else {
        setMensagem(json.message || "Erro ao criar usuário.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container-register">
      <h2>Cadastro de Usuário</h2>
      <div className="formulario">

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input className="inp-register" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input className="inp-register" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input className="inp-register" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div>
          <label>Tipo de Usuário:</label>
          <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
        </div>
        <button type="submit" id="cadastrar">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      </div>

      <div>
        <a href="/">Faça seu Login!</a>
      </div>
    </div>
  );
};

export default Register;