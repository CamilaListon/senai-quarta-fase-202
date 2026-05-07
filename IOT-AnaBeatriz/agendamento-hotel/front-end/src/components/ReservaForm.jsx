import { useState, useEffect } from 'react';

import {
  quartosDisponiveis,
  criarReserva
} from '../services/reservaService';

export default function ReservaForm({ atualizar }) {

  const [datas, setDatas] = useState({
    inicio: '',
    fim: ''
  });

  const [quartos, setQuartos] = useState([]);
  const [quartoSelecionado, setQuartoSelecionado] = useState('');

  async function buscarQuartos() {

    if (!datas.inicio || !datas.fim) return;

    const data = await quartosDisponiveis(
      datas.inicio,
      datas.fim
    );

    setQuartos(data);
  }

  async function reservar() {

    await criarReserva({
      data_checkin: datas.inicio,
      data_checkout: datas.fim,
      quarto_id: quartoSelecionado
    });

    atualizar();
  }

  useEffect(() => {
    buscarQuartos();
  }, [datas]);

  return (
    <div className="form-reserva">

      <input
        type="date"
        onChange={e =>
          setDatas({
            ...datas,
            inicio: e.target.value
          })
        }
      />

      <input
        type="date"
        onChange={e =>
          setDatas({
            ...datas,
            fim: e.target.value
          })
        }
      />

      <select
        onChange={e => setQuartoSelecionado(e.target.value)}
      >

        <option>Escolha um quarto</option>

        {quartos.map(q => (
          <option key={q.id} value={q.id}>
            Quarto {q.numero}
          </option>
        ))}

      </select>

      <button onClick={reservar}>
        Reservar
      </button>

    </div>
  );
}