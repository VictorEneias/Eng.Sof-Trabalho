import { api, setToken, getToken, logout } from './api.js?v=2';
import Login from './login.js?v=2';
import Feiras from './feiras.js?v=2';
import Expositores from './expositores.js?v=2';
import Produtos from './produtos.js?v=2';
import Ingressos from './ingressos.js?v=2';

const e = React.createElement;

function App() {
  const [token, setTokenState] = React.useState(getToken());
  const [currentSection, setCurrentSection] = React.useState('feiras');

  function handleLogin(t) {
    setToken(t);
    setTokenState(t);
  }

  function handleLogout() {
    logout();
    setTokenState(null);
  }

  function renderSection() {
    switch(currentSection) {
      case 'feiras':
        return e(Feiras, { token });
      case 'expositores':
        return e(Expositores, { token });
      case 'produtos':
        return e(Produtos, { token });
      case 'ingressos':
        return e(Ingressos, { token });
      default:
        return e(Feiras, { token });
    }
  }

  if (!token) {
    return e(Login, { onLogin: handleLogin });
  }

  return e('div', { className: 'app-layout' },
    e('header', { className: 'header' },
      e('div', { className: 'container' },
        e('div', { className: 'header-content' },
          e('h1', null, 'Sistema de Gestão de Feiras'),
          e('div', { className: 'user-menu' },
            e('span', null, 'Olá, Usuário'),
            e('button', { 
              className: 'btn btn-secondary',
              onClick: handleLogout 
            }, 'Sair')
          )
        )
      )
    ),
    
    e('div', { className: 'main-layout' },
      e('nav', { className: 'sidebar' },
        e('ul', { className: 'nav-menu' },
          e('li', null,
            e('button', { 
              className: `nav-link ${currentSection === 'feiras' ? 'active' : ''}`,
              onClick: () => setCurrentSection('feiras')
            }, '📅 Feiras')
          ),
          e('li', null,
            e('button', { 
              className: `nav-link ${currentSection === 'expositores' ? 'active' : ''}`,
              onClick: () => setCurrentSection('expositores')
            }, '👥 Expositores')
          ),
          e('li', null,
            e('button', { 
              className: `nav-link ${currentSection === 'produtos' ? 'active' : ''}`,
              onClick: () => setCurrentSection('produtos')
            }, '📦 Produtos')
          ),
          e('li', null,
            e('button', { 
              className: `nav-link ${currentSection === 'ingressos' ? 'active' : ''}`,
              onClick: () => setCurrentSection('ingressos')
            }, '🎫 Ingressos')
          )
        )
      ),
      
      e('main', { className: 'main-content' },
        e('div', { className: 'container' },
          renderSection()
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));
