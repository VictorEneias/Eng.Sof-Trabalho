import { setToken, getToken, logout } from './api.js';
import Login from './login.js';
import Feiras from './feiras.js';

const e = React.createElement;

function App() {
  const [token, setTokenState] = React.useState(getToken());
  const [showLogin, setShowLogin] = React.useState(false);
  const [currentView, setCurrentView] = React.useState('feiras');

  function handleLogin(t) {
    setToken(t);
    setTokenState(t);
    setShowLogin(false);
  }

  function handleLogout() {
    logout();
    setTokenState(null);
    setCurrentView('feiras');
  }

  // Modal de login
  if (showLogin) {
    return e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal' },
        e('div', { className: 'modal-header' },
          e('h3', { className: 'modal-title' }, 'Acesso ao Sistema'),
          e('button', { 
            className: 'modal-close',
            onClick: () => setShowLogin(false)
          }, '×')
        ),
        e('div', { className: 'modal-body' },
          e(Login, { onLogin: handleLogin, onCancel: () => setShowLogin(false) })
        )
      )
    );
  }

  return e('div', { className: 'app' },
    // Header
    e('header', { className: 'app-header' },
      e('div', { className: 'container' },
        e('a', { className: 'app-logo', href: '#' },
          e('div', { className: 'app-logo-icon' }, '🎪'),
          'Sistema de Feiras'
        ),
        e('nav', { className: 'app-nav' },
          token ? e('div', { className: 'user-menu' },
            e('div', { className: 'user-avatar' }, 'U'),
            e('button', { 
              className: 'btn btn-secondary btn-sm',
              onClick: handleLogout 
            }, 'Sair')
          ) : e('button', { 
            className: 'btn btn-secondary btn-sm',
            onClick: () => setShowLogin(true) 
          }, 'Entrar')
        )
      )
    ),

    // Main content
    e('main', { className: 'app-main' },
      // Sidebar
      e('aside', { className: 'app-sidebar' },
        e('nav', { className: 'sidebar-nav' },
          e('div', { className: 'sidebar-section' },
            e('h4', { className: 'sidebar-title' }, 'Navegação'),
            e('ul', { className: 'sidebar-menu' },
              e('li', { className: 'sidebar-item' },
                e('a', { 
                  className: `sidebar-link ${currentView === 'feiras' ? 'active' : ''}`,
                  href: '#',
                  onClick: (evt) => { evt.preventDefault(); setCurrentView('feiras'); }
                },
                  e('span', { className: 'sidebar-icon' }, '🎪'),
                  'Feiras'
                )
              ),
              token && e('li', { className: 'sidebar-item' },
                e('a', { 
                  className: `sidebar-link ${currentView === 'dashboard' ? 'active' : ''}`,
                  href: '#',
                  onClick: (evt) => { evt.preventDefault(); setCurrentView('dashboard'); }
                },
                  e('span', { className: 'sidebar-icon' }, '📊'),
                  'Dashboard'
                )
              )
            )
          )
        )
      ),

      // Content area
      e('div', { className: 'app-content' },
        currentView === 'feiras' && e(Feiras, { token }),
        currentView === 'dashboard' && token && e(Dashboard, { token })
      )
    )
  );
}

// Componente Dashboard simples
function Dashboard({ token }) {
  const [stats, setStats] = React.useState({
    feiras: 0,
    expositores: 0,
    produtos: 0,
    ingressos: 0
  });

  React.useEffect(() => {
    if (!token) return;
    
    // Buscar estatísticas básicas
    Promise.all([
      fetch('http://localhost:8000/feiras').then(r => r.json()),
      fetch('http://localhost:8000/expositores').then(r => r.json()),
      fetch('http://localhost:8000/produtos').then(r => r.json()),
      fetch('http://localhost:8000/ingressos').then(r => r.json())
    ]).then(([feiras, expositores, produtos, ingressos]) => {
      setStats({
        feiras: feiras.length,
        expositores: expositores.length,
        produtos: produtos.length,
        ingressos: ingressos.length
      });
    }).catch(console.error);
  }, [token]);

  return e('div', null,
    e('div', { className: 'content-header' },
      e('div', null,
        e('h1', { className: 'content-title' }, 'Dashboard'),
        e('p', { className: 'content-subtitle' }, 'Visão geral do sistema')
      )
    ),

    e('div', { className: 'dashboard-grid' },
      e('div', { className: 'dashboard-card' },
        e('div', { className: 'dashboard-card-header' },
          e('h3', { className: 'dashboard-card-title' }, 'Feiras'),
          e('div', { className: 'dashboard-card-icon primary' }, '🎪')
        ),
        e('div', { className: 'dashboard-stat' }, stats.feiras),
        e('div', { className: 'dashboard-label' }, 'Total de feiras cadastradas')
      ),

      e('div', { className: 'dashboard-card' },
        e('div', { className: 'dashboard-card-header' },
          e('h3', { className: 'dashboard-card-title' }, 'Expositores'),
          e('div', { className: 'dashboard-card-icon success' }, '🏢')
        ),
        e('div', { className: 'dashboard-stat' }, stats.expositores),
        e('div', { className: 'dashboard-label' }, 'Expositores registrados')
      ),

      e('div', { className: 'dashboard-card' },
        e('div', { className: 'dashboard-card-header' },
          e('h3', { className: 'dashboard-card-title' }, 'Produtos'),
          e('div', { className: 'dashboard-card-icon warning' }, '📦')
        ),
        e('div', { className: 'dashboard-stat' }, stats.produtos),
        e('div', { className: 'dashboard-label' }, 'Produtos em catálogo')
      ),

      e('div', { className: 'dashboard-card' },
        e('div', { className: 'dashboard-card-header' },
          e('h3', { className: 'dashboard-card-title' }, 'Ingressos'),
          e('div', { className: 'dashboard-card-icon info' }, '🎫')
        ),
        e('div', { className: 'dashboard-stat' }, stats.ingressos),
        e('div', { className: 'dashboard-label' }, 'Ingressos emitidos')
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));
