import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../styles/dashboard.scss';

export default function Dashboard() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔀 Redirecionamento automático
  useEffect(() => {

    if (!user) {
      navigate('/');
      return;
    }

    // 👤 CLIENTE
    if (user.tipo === 'CLIENTE') {
      navigate('/reservas');
    }

    // 🧑‍💼 FUNCIONARIO
    if (user.tipo === 'FUNCIONARIO') {
      navigate('/admin');
    }

  }, [user, navigate]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="dashboard">

      <h1>Carregando dashboard...</h1>

      <p>Usuário: {user?.tipo}</p>

      <button onClick={handleLogout}>
        Sair
      </button>

    </div>
  );
}