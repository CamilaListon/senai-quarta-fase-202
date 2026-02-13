import { useEffect, useState } from "react";
import api from "../services/api";

export default function RelatorioEficiencia() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get("/relatorio-eficiencia").then((res) => setDados(res.data));
  }, []);

  return (
    <div>
      <h2>Relatório de Eficiência</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Entregador</th>
            <th>Consumo Bateria</th>
            <th>Distância</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((r, index) => (
            <tr key={index}>
              <td>{r.placa}</td>
              <td>{r.entregador}</td>
              <td>{r.consumo_bateria}%</td>
              <td>{r.distancia_percorrida} km</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
