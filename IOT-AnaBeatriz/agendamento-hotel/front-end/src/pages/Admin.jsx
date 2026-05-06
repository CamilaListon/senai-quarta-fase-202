import { useEffect, useState } from 'react';
import { cancelarReserva } from '../services/reservaService';
import '../styles/admin.scss';

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');

  async function fetchReservas() {
    const res = await fetch('http://localhost:3000/reservas', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setReservas(data);
  }

  async function cancelar(id) {
    await cancelarReserva(token, id);
    fetchReservas();
  }

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div className="admin">
      <h2>Painel Administrativo</h2>

      {reservas.map(r => (
        <div key={r.id} className="card">
          <p>Reserva #{r.id}</p>
          <button onClick={() => cancelar(r.id)}>
            Cancelar
          </button>
        </div>
      ))}
    </div>
  );
}