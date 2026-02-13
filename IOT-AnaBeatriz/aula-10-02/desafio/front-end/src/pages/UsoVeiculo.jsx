import { useState } from "react";
import api from "../services/api";

export default function UsoVeiculo() {
  const [form, setForm] = useState({
    id_veiculo: "",
    id_entregador: "",
    bateria_saida: "",
    km_saida: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/uso-veiculo", form);
      alert("Uso registrado com sucesso!");
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao registrar uso");
    }
  };

  return (
    <div>
      <h2>Registrar Uso do Veículo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id_veiculo">ID Veículo</label>
        <input
          name="id_veiculo"
          placeholder="ID Veículo"
          onChange={handleChange}
        />
        <label htmlFor="id_entregador">ID Entregador</label>
        <input
          name="id_entregador"
          placeholder="ID Entregador"
          onChange={handleChange}
        />
        <label htmlFor="bateria_saida">Bateria Saída</label>
        <input
          name="bateria_saida"
          placeholder="Bateria Saída"
          onChange={handleChange}
        />
        <label htmlFor="km_saida">KM Saída</label>
        <input name="km_saida" placeholder="KM Saída" onChange={handleChange} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}


// placa VARCHAR(10) UNIQUE NOT NULL,
// modelo VARCHAR(50),
// tipo VARCHAR(30),
// capacidade_carga DECIMAL(6,2), -- em kg
// bateria_atual INT CHECK (bateria_atual BETWEEN 0 AND 100),
// quilometragem_total DECIMAL(10,2),
// status ENUM('DISPONIVEL', 'EM_USO', 'MANUTENCAO') DEFAULT 'DISPONIVEL'