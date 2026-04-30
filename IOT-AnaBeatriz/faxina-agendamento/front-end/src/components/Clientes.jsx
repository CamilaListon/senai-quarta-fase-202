import { useEffect, useState } from "react";
import { listarClientes, criarCliente } from "../services/cliente";
import Navbar from "./Navbar";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");

  async function carregar() {
    setClientes(await listarClientes());
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await criarCliente({ nome });
    setNome("");
    carregar();
  }

  return (
    <div>
      <Navbar />

      <h2>Clientes</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome do cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <ul>
        {clientes.map(c => (
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;