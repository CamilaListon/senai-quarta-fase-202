import { useEffect, useState } from 'react';

import {
  minhasReservas,
  cancelarReserva
} from '../../services/reservaService';

import ReservaForm from '../../components/ReservaForm';

import '../../styles/cliente.scss';

export default function ClienteDashboard() {

  const [reservas, setReservas] = useState([]);

  async function carregarReservas() {
    const data = await minhasReservas();
    setReservas(data);
  }

  async function cancelar(id) {
    await cancelarReserva(id);
    carregarReservas();
  }

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <div className="cliente-dashboard">

      <h1>Minhas Reservas</h1>

      <ReservaForm atualizar={carregarReservas} />

      <div className="reservas-grid">

        {reservas.map(reserva => (

          <div className="card" key={reserva.id}>

            <h3>Reserva #{reserva.id}</h3>

            <p>Check-in: {reserva.data_checkin}</p>

            <p>Check-out: {reserva.data_checkout}</p>

            <p>Status: {reserva.status}</p>

            <button onClick={() => cancelar(reserva.id)}>
              Cancelar
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}