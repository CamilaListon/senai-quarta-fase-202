import { useState, useContext } from 'react';
import { loginRequest } from '../services/authService.js';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.scss';

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await loginRequest(form);

    if (data.token) {
      login(data);
      navigate('/dashboard');
    } else {
      alert(data.message || 'Erro ao logar');
    }
  }

  return (
    <div className="login-container">
      <form className='form-login' onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input className='input-form-login'
          type="email"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className='input-form-login'
          type="password"
          placeholder="Senha"
          onChange={e => setForm({ ...form, senha: e.target.value })}
        />

        <button className='btn-entrar'>Entrar</button>

        <p className='btn-criar-conta' onClick={() => navigate('/register')}>
          Criar conta
        </p>
      </form>
    </div>
  );
}