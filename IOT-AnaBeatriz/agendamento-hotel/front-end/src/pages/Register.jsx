import { useState } from 'react';
import { registerRequest } from '../services/authService.js';
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
      <form className='form-cadastro' onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <input className='form-input-cadastro' placeholder="Nome"
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />

        <input className='form-input-cadastro' placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className='form-input-cadastro' type="password" placeholder="Senha"
          onChange={e => setForm({ ...form, senha: e.target.value })}
        />

        <select className='form-input-cadastro'
          onChange={e => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="FUNCIONARIO">Funcionário</option>
        </select>
        <div className="btn-geral">
          <button className='btn-cadastrar'>Cadastrar</button>
          <a className='btn-login'>Ja tem cadastro? Faça seu login</a>
        </div>
      </form>
    </div>
  );
}