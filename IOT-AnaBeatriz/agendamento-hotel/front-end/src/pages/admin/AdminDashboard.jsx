import { useEffect, useState } from 'react';

import {
  listarReservas
} from '../../services/adminService';

import '../../styles/admin.scss';

export default function AdminDashboard() {

  const [reservas, setReservas] = useState([]);

  async function carregar() {
    const data = await listarReservas();
    setReservas(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="admin-dashboard">

      <h1>Painel Administrativo</h1>

      <div className="grid">

        {reservas.map(r => (

          <div className="card" key={r.id}>

            <h3>Reserva #{r.id}</h3>

            <p>Cliente: {r.nome}</p>

            <p>Quarto: {r.quarto_id}</p>

            <p>Check-in: {r.data_checkin}</p>

            <p>Check-out: {r.data_checkout}</p>

            <p>Status: {r.status}</p>

          </div>

        ))}

      </div>

    </div>
  );
}