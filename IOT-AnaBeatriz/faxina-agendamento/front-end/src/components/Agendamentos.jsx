import { useEffect, useState } from "react";
import {
  listarAgendamentos,
  criarAgendamento,
  deletarAgendamento
} from "../services/agendamento";

import { listarClientes } from "../services/cliente";
import { listarProfissionais } from "../services/profissional";

import "../styles/tabela.scss";

const Agendamentos = () => {
  const [dados, setDados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  const [form, setForm] = useState({
    cliente_id: "",
    profissional_id: "",
    data_hora: "",
    tipo: "residencial"
  });

  async function carregar() {
    setDados(await listarAgendamentos());
    setClientes(await listarClientes());
    setProfissionais(await listarProfissionais());
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await criarAgendamento(form);
      alert("Criado!");
      carregar();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  return (
    <div className="tabela">
      <h2>Agendamentos</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Cliente</label>
        <select onChange={(e) => setForm({ ...form, cliente_id: e.target.value })}>
          <option>Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <label htmlFor="">Profissional</label>
        <select onChange={(e) => setForm({ ...form, profissional_id: e.target.value })}>
          <option>Profissional</option>
          {profissionais.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>

        <label htmlFor="">Data de Atendimento</label>
        <input type="datetime-local"
          onChange={(e) => setForm({ ...form, data_hora: e.target.value })}
        />
        <label htmlFor="">Local do trabalho</label>
        <select onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
        </select>

        <button>Criar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Profissional</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((a) => (
            <tr key={a.id}>
              <td>{a.cliente}</td>
              <td>{a.profissional}</td>
              <td>{a.data_hora}</td>
              <td>{a.tipo}</td>
              <td>
                <button onClick={() => {
                  deletarAgendamento(a.id);
                  carregar();
                }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agendamentos;