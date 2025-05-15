import React, { useState } from 'react';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api-token-auth/', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      if (onLogin) onLogin(token);
    } catch (error) {
      console.error(error);
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Entrar</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </form>
  );
};

export default Login;