import { useEffect, useState } from "react";
import api from "../services/api";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    api.get("/veiculos").then((res) => setVeiculos(res.data));
  }, []);

  return (
    <div>
      <h2>Lista de Veículos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Bateria</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((v) => (
            <tr key={v.id_veiculo}>
              <td>{v.placa}</td>
              <td>{v.modelo}</td>
              <td>{v.tipo}</td>
              <td>{v.bateria_atual}%</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
