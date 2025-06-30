import { api } from './api.js';
import Login from './login.js';
import Feiras from './feiras.js';

const e = React.createElement;

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = React.useState(false);

  function handleLogin(novoToken) {
    localStorage.setItem('token', novoToken);
    setToken(novoToken);
    setShowLogin(false);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return e('div', { className: 'app' },
    // Header
    e('header', { className: 'app-header' },
      e('div', { className: 'container' },
        e('div', { className: 'header-content' },
          e('div', { className: 'header-brand' },
            e('h1', { className: 'app-title' }, 'SGF'),
            e('p', { className: 'app-subtitle' }, 'Gestão de Feiras')
          ),
          e('div', { className: 'header-actions' },
            token 
              ? e('button', { 
                  className: 'btn btn-secondary',
                  onClick: handleLogout
                }, 'Sair')
              : e('button', { 
                  className: 'btn btn-primary',
                  onClick: () => setShowLogin(true)
                }, 'Entrar')
          )
        )
      )
    ),

    // Main Content
    e('main', { className: 'app-main' },
      e('div', { className: 'container' },
        showLogin 
          ? e(Login, { 
              onLogin: handleLogin,
              onCancel: () => setShowLogin(false)
            })
          : e(Feiras, { token })
      )
    )
  );
}

ReactDOM.render(e(App), document.getElementById('root'));
