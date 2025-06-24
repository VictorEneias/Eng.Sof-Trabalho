import { api, setToken, getToken, logout } from './api.js';
import Login from './login.js';
import Feiras from './feiras.js';

const e = React.createElement;

function App() {
  const [token, setTokenState] = React.useState(getToken());

  function handleLogin(t) {
    setToken(t);
    setTokenState(t);
  }

  function handleLogout() {
    logout();
    setTokenState(null);
  }

  return e('div', null,
    token ? e('button', { onClick: handleLogout }, 'Sair') : null,
    token ? e(Feiras, { token }) : e(Login, { onLogin: handleLogin })
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));
