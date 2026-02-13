import { useState } from "react";
import api from "../services/api";

export default function Manutencao() {
  const [form, setForm] = useState({
    id_veiculo: "",
    tipo: "PREVENTIVA",
    descricao: "",
    km_registrado: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/manutencao", form);
    alert("Manutenção registrada!");
  };

  return (
    <div>
      <h2>Registrar Manutenção</h2>
      <form onSubmit={handleSubmit}>
        <input name="id_veiculo" placeholder="ID Veículo" onChange={handleChange} />
        <select name="tipo" onChange={handleChange}>
          <option value="PREVENTIVA">Preventiva</option>
          <option value="CORRETIVA">Corretiva</option>
        </select>
        <textarea name="descricao" placeholder="Descrição" onChange={handleChange} />
        <input name="km_registrado" placeholder="KM" onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
