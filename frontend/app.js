import { setToken, getToken, logout } from './api.js';
import Login from './login.js';
import Feiras from './feiras.js';

const e = React.createElement;

function App() {
  const [token, setTokenState] = React.useState(getToken());
  const [showLogin, setShowLogin] = React.useState(false);

  function handleLogin(t) {
    setToken(t);
    setTokenState(t);
    setShowLogin(false);
  }

  function handleLogout() {
    logout();
    setTokenState(null);
  }

  return e('div', null,
    token
      ? e('button', { onClick: handleLogout }, 'Sair')
      : showLogin
        ? e(Login, { onLogin: handleLogin, onCancel: () => setShowLogin(false) })
        : e('button', { onClick: () => setShowLogin(true) }, 'Entrar / Registrar'),
    e(Feiras, { token })
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));
