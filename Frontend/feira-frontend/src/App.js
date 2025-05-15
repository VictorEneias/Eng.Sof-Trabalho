import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import api from './services/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');

  // Requisição para descobrir o nome do usuário com base no token
  useEffect(() => {
    if (token) {
      api.get('user/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => setUsername(res.data.username))
      .catch(() => {
        setToken(null);
        localStorage.removeItem('token');
      });
    }
  }, [token]);

  const handleLogin = (novoToken) => {
    localStorage.setItem('token', novoToken);
    setToken(novoToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername('');
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Bem-vindo, {username || 'usuário'}!</h2>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default App;
