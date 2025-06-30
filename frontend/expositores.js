import { api } from './api.js';
const e = React.createElement;

export default function Expositores({ feiraId, onSelect, token, compact = false }) {
  const [lista, setLista] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: '', descricao: '', contato: '' });
  const [edit, setEdit] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    if (feiraId) {
      api(`/feiras/${feiraId}/expositores`).then(setLista);
    }
  }, [feiraId]);

  async function criar(evt) {
    evt.preventDefault();
    const criado = await api('/expositores/', {
      method: 'POST',
      body: JSON.stringify({ ...novo, feira_id: feiraId })
    });
    setLista([...lista, criado]);
    setNovo({ nome: '', descricao: '', contato: '' });
  }

  async function excluir(id) {
    await api(`/expositores/${id}`, { method: 'DELETE' });
    setLista(lista.filter(e => e.id !== id));
    if (edit && edit.id === id) setEdit(null);
  }

  async function salvar(evt) {
    evt.preventDefault();
    await api(`/expositores/${edit.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...edit, feira_id: feiraId })
    });
    setLista(lista.map(e => e.id === edit.id ? edit : e));
    setEdit(null);
  }

  if (compact) {
    return e('div', { className: 'compact-list' },
      token && e('button', { 
        className: 'btn btn-primary btn-sm mb-3',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : '+ Novo Expositor'),
      
      // Formulário compacto
      token && showForm && e('form', { 
        className: 'form-compact mb-3',
        onSubmit: criar 
      },
        e('div', { className: 'form-group' },
          e('input', {
            className: 'form-input form-input-sm',
            placeholder: 'Nome do expositor',
            value: novo.nome,
            onChange: e => setNovo({ ...novo, nome: e.target.value }),
            required: true
          })
        ),
        e('div', { className: 'form-group' },
          e('input', {
            className: 'form-input form-input-sm',
            placeholder: 'Descrição',
            value: novo.descricao,
            onChange: e => setNovo({ ...novo, descricao: e.target.value }),
            required: true
          })
        ),
        e('div', { className: 'form-group' },
          e('input', {
            className: 'form-input form-input-sm',
            placeholder: 'Contato',
            value: novo.contato,
            onChange: e => setNovo({ ...novo, contato: e.target.value }),
            required: true
          })
        ),
        e('button', { 
          type: 'submit',
          className: 'btn btn-primary btn-sm'
        }, 'Adicionar')
      ),

      // Lista compacta
      e('div', { className: 'compact-items' },
        lista.length === 0 
          ? e('p', { className: 'text-gray-500 text-sm' }, 'Nenhum expositor cadastrado')
          : lista.map(exp =>
              e('div', { 
                key: exp.id,
                className: 'compact-item'
              },
                e('div', { 
                  className: 'compact-item-content',
                  onClick: () => onSelect && onSelect(exp)
                },
                  e('span', { className: 'compact-item-name' }, exp.nome),
                  e('span', { className: 'compact-item-desc' }, exp.descricao)
                ),
                token && e('div', { className: 'compact-item-actions' },
                  e('button', { 
                    className: 'btn btn-secondary btn-xs',
                    onClick: () => setEdit(exp)
                  }, 'Editar'),
                  e('button', { 
                    className: 'btn btn-danger btn-xs',
                    onClick: () => {
                      if (confirm('Excluir expositor?')) excluir(exp.id);
                    }
                  }, 'Excluir')
                )
              )
            )
      ),

      // Modal de edição
      token && edit && e('div', { className: 'modal-overlay' },
        e('div', { className: 'modal modal-sm' },
          e('div', { className: 'modal-header' },
            e('h4', { className: 'modal-title' }, 'Editar Expositor'),
            e('button', { 
              className: 'modal-close',
              onClick: () => setEdit(null)
            }, '×')
          ),
          e('div', { className: 'modal-body' },
            e('form', { onSubmit: salvar },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Nome'),
                e('input', {
                  className: 'form-input',
                  value: edit.nome,
                  onChange: e => setEdit({ ...edit, nome: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Descrição'),
                e('input', {
                  className: 'form-input',
                  value: edit.descricao,
                  onChange: e => setEdit({ ...edit, descricao: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Contato'),
                e('input', {
                  className: 'form-input',
                  value: edit.contato,
                  onChange: e => setEdit({ ...edit, contato: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-actions' },
                e('button', { 
                  type: 'button',
                  className: 'btn btn-secondary',
                  onClick: () => setEdit(null)
                }, 'Cancelar'),
                e('button', { 
                  type: 'submit',
                  className: 'btn btn-primary'
                }, 'Salvar')
              )
            )
          )
        )
      )
    );
  }

  // Versão completa (não compacta)
  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h3', { className: 'section-title' }, '🏢 Expositores'),
      token && e('button', { 
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Novo Expositor')
    ),

    // Formulário de criação
    token && showForm && e('div', { className: 'card mb-4' },
      e('div', { className: 'card-body' },
        e('form', { onSubmit: criar },
          e('div', { className: 'form-row' },
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Nome do Expositor'),
              e('input', {
                className: 'form-input',
                value: novo.nome,
                onChange: e => setNovo({ ...novo, nome: e.target.value }),
                required: true
              })
            ),
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Contato'),
              e('input', {
                className: 'form-input',
                value: novo.contato,
                onChange: e => setNovo({ ...novo, contato: e.target.value }),
                required: true
              })
            )
          ),
          e('div', { className: 'form-group' },
            e('label', { className: 'form-label' }, 'Descrição'),
            e('textarea', {
              className: 'form-textarea',
              value: novo.descricao,
              onChange: e => setNovo({ ...novo, descricao: e.target.value }),
              required: true
            })
          ),
          e('div', { className: 'form-actions' },
            e('button', { 
              type: 'submit',
              className: 'btn btn-primary'
            }, 'Adicionar Expositor')
          )
        )
      )
    ),

    // Lista de expositores
    e('div', { className: 'grid' },
      lista.length === 0 
        ? e('div', { className: 'card' },
            e('div', { className: 'card-body text-center' },
              e('p', { className: 'text-gray-500' }, 'Nenhum expositor cadastrado ainda.')
            )
          )
        : lista.map(exp =>
            e('div', { 
              key: exp.id,
              className: 'card'
            },
              e('div', { className: 'card-body' },
                e('h4', { className: 'card-title' }, exp.nome),
                e('p', { className: 'text-gray-600 mb-2' }, exp.descricao),
                e('p', { className: 'text-sm text-gray-500 mb-4' }, `Contato: ${exp.contato}`),
                e('div', { className: 'card-actions' },
                  onSelect && e('button', { 
                    className: 'btn btn-primary btn-sm',
                    onClick: () => onSelect(exp)
                  }, 'Ver Produtos'),
                  token && e('button', { 
                    className: 'btn btn-secondary btn-sm',
                    onClick: () => setEdit(exp)
                  }, 'Editar'),
                  token && e('button', { 
                    className: 'btn btn-danger btn-sm',
                    onClick: () => {
                      if (confirm('Tem certeza que deseja excluir este expositor?')) {
                        excluir(exp.id);
                      }
                    }
                  }, 'Excluir')
                )
              )
            )
          )
    ),

    // Modal de edição
    token && edit && e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal' },
        e('div', { className: 'modal-header' },
          e('h3', { className: 'modal-title' }, 'Editar Expositor'),
          e('button', { 
            className: 'modal-close',
            onClick: () => setEdit(null)
          }, '×')
        ),
        e('div', { className: 'modal-body' },
          e('form', { onSubmit: salvar },
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Nome'),
                e('input', {
                  className: 'form-input',
                  value: edit.nome,
                  onChange: e => setEdit({ ...edit, nome: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Contato'),
                e('input', {
                  className: 'form-input',
                  value: edit.contato,
                  onChange: e => setEdit({ ...edit, contato: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Descrição'),
              e('textarea', {
                className: 'form-textarea',
                value: edit.descricao,
                onChange: e => setEdit({ ...edit, descricao: e.target.value }),
                required: true
              })
            ),
            e('div', { className: 'form-actions' },
              e('button', { 
                type: 'button',
                className: 'btn btn-secondary',
                onClick: () => setEdit(null)
              }, 'Cancelar'),
              e('button', { 
                type: 'submit',
                className: 'btn btn-primary'
              }, 'Salvar Alterações')
            )
          )
        )
      )
    )
  );
}
