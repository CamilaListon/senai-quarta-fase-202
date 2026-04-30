import { useEffect, useState } from "react";
import { listarProfissionais } from "../services/profissional";
import Navbar from "./Navbar";

const Profissionais = () => {
  const [profissionais, setProfissionais] = useState([]);

  async function carregar() {
    setProfissionais(await listarProfissionais());
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <Navbar />

      <h2>Profissionais</h2>

      <ul>
        {profissionais.map(p => (
          <li key={p.id}>{p.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profissionais;