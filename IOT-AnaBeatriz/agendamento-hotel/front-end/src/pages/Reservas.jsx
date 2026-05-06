import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getQuartosDisponiveis,
  criarReserva
} from '../services/reservaService';

import Toast from '../components/Toast';
import Loader from '../components/Loader';

import '../styles/reservas.scss';

export default function Reservas() {
  const { user } = useContext(AuthContext);

  const [datas, setDatas] = useState({
    inicio: '',
    fim: ''
  });

  const [quartos, setQuartos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const token = localStorage.getItem('token');

  async function buscarQuartos() {
    setLoading(true);

    const data = await getQuartosDisponiveis(
      token,
      datas.inicio,
      datas.fim
    );

    setQuartos(data);
    setLoading(false);
  }

  async function reservar(quarto_id) {
    const res = await criarReserva(token, {
      data_checkin: datas.inicio,
      data_checkout: datas.fim,
      quarto_id
    });

    setToast(res.message || 'Reserva realizada');
  }

  return (
    <div className="reservas">
      <h2>Reservar Quarto</h2>

      <input
        type="date"
        onChange={e => setDatas({ ...datas, inicio: e.target.value })}
      />

      <input
        type="date"
        onChange={e => setDatas({ ...datas, fim: e.target.value })}
      />

      <button onClick={buscarQuartos}>Buscar</button>

      {loading && <Loader />}

      <div className="quartos">
        {quartos.map(q => (
          <div key={q.id} className="card">
            <p>Quarto {q.numero}</p>
            <button onClick={() => reservar(q.id)}>
              Reservar
            </button>
          </div>
        ))}
      </div>

      <Toast message={toast} setMessage={setToast} />
    </div>
  );
}