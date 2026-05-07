import { useEffect, useState } from 'react';

import {
  minhasReservas,
  cancelarReserva,
  alterarReserva
} from '../../services/reservaService';

import ReservaCard from '../../components/ReservaCard';

import '../../styles/cliente.scss';

export default function MinhasReservas() {

  const [reservas, setReservas] = useState([]);

  async function carregarReservas() {

    const data = await minhasReservas();

    setReservas(data);

  }

  async function cancelar(id) {

    const confirmar = confirm(
      'Deseja realmente cancelar a reserva?'
    );

    if (!confirmar) return;

    await cancelarReserva(id);

    carregarReservas();

  }

  async function editar(reserva) {

    const novoCheckin = prompt(
      'Novo check-in:',
      reserva.data_checkin
    );

    if (!novoCheckin) return;

    const novoCheckout = prompt(
      'Novo check-out:',
      reserva.data_checkout
    );

    if (!novoCheckout) return;

    await alterarReserva(reserva.id, {
      data_checkin: novoCheckin,
      data_checkout: novoCheckout
    });

    carregarReservas();

  }

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <div className="cliente-dashboard">

      <h1>Minhas Reservas</h1>

      <div className="reservas-grid">

        {reservas.length === 0 && (
          <p>Nenhuma reserva encontrada.</p>
        )}

        {reservas.map(reserva => (

          <ReservaCard
            key={reserva.id}
            reserva={reserva}
            onCancelar={cancelar}
            onEditar={editar}
          />

        ))}

      </div>

    </div>
  );
}