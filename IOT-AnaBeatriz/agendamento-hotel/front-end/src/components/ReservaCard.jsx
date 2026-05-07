import '../styles/cards.scss';

export default function ReservaCard({
  reserva,
  onCancelar,
  onEditar
}) {

  return (
    <div className="card reserva-card">

      <h3>Reserva #{reserva.id}</h3>

      <p>
        <strong>Quarto:</strong>
        {' '}
        {reserva.quarto_numero || reserva.quarto_id}
      </p>

      <p>
        <strong>Check-in:</strong>
        {' '}
        {reserva.data_checkin}
      </p>

      <p>
        <strong>Check-out:</strong>
        {' '}
        {reserva.data_checkout}
      </p>

      <p>
        <strong>Status:</strong>
        {' '}
        {reserva.status}
      </p>

      <div className="actions">

        <button
          className="edit-btn"
          onClick={() => onEditar(reserva)}
        >
          Alterar
        </button>

        <button
          className="cancel-btn"
          onClick={() => onCancelar(reserva.id)}
        >
          Cancelar
        </button>

      </div>

    </div>
  );
}