import { useEffect, useState } from 'react';

import { listarLogs } from '../../services/adminService';

export default function Logs() {

  const [logs, setLogs] = useState([]);

  async function carregarLogs() {
    const data = await listarLogs();
    setLogs(data);
  }

  useEffect(() => {
    carregarLogs();
  }, []);

  return (
    <div>

      <h1>Logs do Sistema</h1>

      {logs.map(log => (

        <div key={log.id} className="card">

          <p>Tipo: {log.tipo}</p>

          <p>Descrição: {log.descricao}</p>

          <p>Data: {log.data_operacao}</p>

        </div>

      ))}

    </div>
  );
}