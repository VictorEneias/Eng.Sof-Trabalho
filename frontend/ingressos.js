import { api } from './api.js';
const e = React.createElement;

export default function Ingressos({ feiraId, token, compact = false }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    api('/ingressos').then(data => {
      setLista(feiraId ? data.filter(i => i.feira_id === feiraId) : data);
    });
  }, [feiraId]);

  async function criar(evt) {
    evt.preventDefault();
    const novo = await api('/ingressos', {
      method: 'POST',
      body: JSON.stringify({ feira_id: feiraId })
    });
    setLista([...lista, novo]);
  }

  async function excluir(id) {
    await api(`/ingressos/${id}`, { method: 'DELETE' });
    setLista(lista.filter(i => i.id !== id));
  }

  if (compact) {
    return e('div', { className: 'compact-list' },
      token && e('button', { 
        className: 'btn btn-primary btn-sm mb-3',
        onClick: criar
      }, '+ Criar Ingresso'),
      
      // Lista compacta
      e('div', { className: 'compact-items' },
        lista.length === 0 
          ? e('p', { className: 'text-gray-500 text-sm' }, 'Nenhum ingresso criado')
          : lista.map(ingresso =>
              e('div', { 
                key: ingresso.id,
                className: 'compact-item'
              },
                e('div', { className: 'compact-item-content' },
                  e('span', { className: 'compact-item-name' }, `Ingresso #${ingresso.numero}`),
                  e('span', { className: 'compact-item-desc' }, `Data: ${ingresso.data}`)
                ),
                token && e('div', { className: 'compact-item-actions' },
                  e('button', { 
                    className: 'btn btn-danger btn-xs',
                    onClick: () => {
                      if (confirm('Excluir ingresso?')) excluir(ingresso.id);
                    }
                  }, 'Excluir')
                )
              )
            )
      )
    );
  }

  // Versão completa (não compacta)
  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h3', { className: 'section-title' }, '🎫 Ingressos'),
      token && e('button', { 
        className: 'btn btn-primary',
        onClick: criar
      }, 'Criar Ingresso')
    ),

    // Lista de ingressos
    e('div', { className: 'grid' },
      lista.length === 0 
        ? e('div', { className: 'card' },
            e('div', { className: 'card-body text-center' },
              e('p', { className: 'text-gray-500' }, 'Nenhum ingresso criado ainda.'),
              token && e('p', { className: 'text-sm text-gray-400' }, 'Clique em "Criar Ingresso" para começar.')
            )
          )
        : lista.map(ingresso =>
            e('div', { 
              key: ingresso.id,
              className: 'card'
            },
              e('div', { className: 'card-body' },
                e('div', { className: 'ingresso-ticket' },
                  e('div', { className: 'ingresso-header' },
                    e('h4', { className: 'ingresso-numero' }, `#${ingresso.numero}`)
                  ),
                  e('div', { className: 'ingresso-info' },
                    e('p', { className: 'ingresso-data' }, `📅 ${ingresso.data}`),
                    e('p', { className: 'text-sm text-gray-500' }, `Feira ID: ${ingresso.feira_id}`)
                  )
                ),
                token && e('div', { className: 'card-actions mt-4' },
                  e('button', { 
                    className: 'btn btn-danger btn-sm',
                    onClick: () => {
                      if (confirm('Tem certeza que deseja excluir este ingresso?')) {
                        excluir(ingresso.id);
                      }
                    }
                  }, 'Excluir Ingresso')
                )
              )
            )
          )
    )
  );
}
