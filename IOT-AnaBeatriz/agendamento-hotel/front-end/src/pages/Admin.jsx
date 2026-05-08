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

    <div className="container-admin">

      <div className="admin">
        <h2 className='titulo-painel'>Painel Administrativo</h2>
      </div>

      <div className="topo-site">

        <p className='categorias'>Data Check-in</p>
        <p className='categorias'>Data Chekout</p>
        <p className='categorias'>Quartos</p>
        <p className='categorias'>Relatórios</p>
      </div>
    </div>

  );
}