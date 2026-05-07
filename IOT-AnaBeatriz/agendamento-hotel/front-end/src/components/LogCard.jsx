import '../styles/cards.scss';

export default function LogCard({ log }) {

  return (
    <div className="card log-card">

      <h3>{log.tipo}</h3>

      <p>
        <strong>Usuário:</strong>
        {' '}
        {log.nome || 'Sistema'}
      </p>

      <p>
        <strong>Descrição:</strong>
        {' '}
        {log.descricao}
      </p>

      <p>
        <strong>Data:</strong>
        {' '}
        {new Date(log.data_operacao).toLocaleString()}
      </p>

    </div>
  );
}