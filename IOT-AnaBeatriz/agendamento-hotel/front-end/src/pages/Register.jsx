import { useState } from 'react';
import { registerRequest } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/register.scss';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'CLIENTE'
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await registerRequest(form);

    if (!res.error) {
      alert('Usuário criado!');
      navigate('/');
    } else {
      alert('Erro');
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <input placeholder="Nome"
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />

        <input placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" placeholder="Senha"
          onChange={e => setForm({ ...form, senha: e.target.value })}
        />

        <select
          onChange={e => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="FUNCIONARIO">Funcionário</option>
        </select>

        <button>Cadastrar</button>
      </form>
    </div>
  );
}