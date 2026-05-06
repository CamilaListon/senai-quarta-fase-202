import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/dashboard.scss';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <p>Tipo: {user?.tipo}</p>

      {user?.tipo === 'FUNCIONARIO' && (
        <p>Você pode gerenciar reservas</p>
      )}

      {user?.tipo === 'CLIENTE' && (
        <p>Você pode fazer reservas</p>
      )}

      <button onClick={logout}>Sair</button>
    </div>
  );
}