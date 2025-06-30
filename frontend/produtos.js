import { api } from './api.js';
const e = React.createElement;

export default function Produtos({ expositorId, token, compact = false }) {
  const [lista, setLista] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: '', descricao: '', preco: '' });
  const [edit, setEdit] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    if (expositorId) {
      api(`/expositores/${expositorId}/produtos`).then(setLista);
    }
  }, [expositorId]);

  async function criar(evt) {
    evt.preventDefault();
    try {
      const criado = await api('/produtos/', {
        method: 'POST',
        body: JSON.stringify({ ...novo, expositor_id: expositorId, preco: parseFloat(novo.preco) })
      });
      setLista([...lista, criado]);
      setNovo({ nome: '', descricao: '', preco: '' });
      setShowForm(false);
    } catch (err) {
      if (err.message && err.message.includes('403')) {
        alert('Você não tem permissão para criar este produto');
      } else {
        alert('Erro ao criar produto: ' + (err.message || 'Tente novamente'));
      }
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir produto?')) return;
    try {
      await api(`/produtos/${id}`, { method: 'DELETE' });
      setLista(lista.filter(p => p.id !== id));
    } catch (err) {
      if (err.message && err.message.includes('403')) {
        alert('Você não tem permissão para excluir este produto');
      } else {
        alert('Erro ao excluir produto: ' + (err.message || 'Tente novamente'));
      }
    }
  }

  async function salvar(evt) {
    evt.preventDefault();
    try {
      if (edit) {
        const atualizado = await api(`/produtos/${edit.id}`, {
          method: 'PUT',
          body: JSON.stringify({ ...edit, expositor_id: expositorId, preco: parseFloat(edit.preco) })
        });
        setLista(lista.map(p => p.id === edit.id ? atualizado : p));
        setEdit(null);
      } else {
        const novo = await api('/produtos', {
          method: 'POST',
          body: JSON.stringify({ ...novo, expositor_id: expositorId })
        });
        setLista([...lista, novo]);
      }
      setNovo({ nome: '', descricao: '', preco: '' });
    } catch (err) {
      if (err.message && err.message.includes('403')) {
        alert('Você não tem permissão para ' + (edit ? 'editar' : 'criar') + ' este produto');
      } else {
        alert('Erro ao ' + (edit ? 'atualizar' : 'criar') + ' produto: ' + (err.message || 'Tente novamente'));
      }
    }
  }

  if (compact) {
    return e('div', { className: 'compact-list' },
      token && e('button', { 
        className: 'btn btn-primary btn-sm mb-3',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : '+ Novo Produto'),
      
      // Formulário compacto
      token && showForm && e('form', { 
        className: 'form-compact mb-3',
        onSubmit: criar 
      },
        e('div', { className: 'form-group' },
          e('input', {
            className: 'form-input form-input-sm',
            placeholder: 'Nome do produto',
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
            type: 'number',
            step: '0.01',
            placeholder: 'Preço (R$)',
            value: novo.preco,
            onChange: e => setNovo({ ...novo, preco: e.target.value }),
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
          ? e('p', { className: 'text-gray-500 text-sm' }, 'Nenhum produto cadastrado')
          : lista.map(prod =>
              e('div', { 
                key: prod.id,
                className: 'compact-item'
              },
                e('div', { className: 'compact-item-content' },
                  e('span', { className: 'compact-item-name' }, prod.nome),
                  e('span', { className: 'compact-item-desc' }, prod.descricao),
                  e('span', { className: 'compact-item-price' }, `R$ ${parseFloat(prod.preco).toFixed(2)}`)
                ),
                token && e('div', { className: 'compact-item-actions' },
                  e('button', { 
                    className: 'btn btn-secondary btn-xs',
                    onClick: () => setEdit({ ...prod, preco: prod.preco.toString() })
                  }, 'Editar'),
                  e('button', { 
                    className: 'btn btn-danger btn-xs',
                    onClick: () => {
                      if (confirm('Excluir produto?')) excluir(prod.id);
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
            e('h4', { className: 'modal-title' }, 'Editar Produto'),
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
                e('label', { className: 'form-label' }, 'Preço (R$)'),
                e('input', {
                  className: 'form-input',
                  type: 'number',
                  step: '0.01',
                  value: edit.preco,
                  onChange: e => setEdit({ ...edit, preco: e.target.value }),
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
      e('h3', { className: 'section-title' }, '📦 Produtos'),
      token && e('button', { 
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Novo Produto')
    ),

    // Formulário de criação
    token && showForm && e('div', { className: 'card mb-4' },
      e('div', { className: 'card-body' },
        e('form', { onSubmit: criar },
          e('div', { className: 'form-row' },
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Nome do Produto'),
              e('input', {
                className: 'form-input',
                value: novo.nome,
                onChange: e => setNovo({ ...novo, nome: e.target.value }),
                required: true
              })
            ),
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Preço (R$)'),
              e('input', {
                className: 'form-input',
                type: 'number',
                step: '0.01',
                value: novo.preco,
                onChange: e => setNovo({ ...novo, preco: e.target.value }),
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
            }, 'Adicionar Produto')
          )
        )
      )
    ),

    // Lista de produtos
    e('div', { className: 'grid' },
      lista.length === 0 
        ? e('div', { className: 'card' },
            e('div', { className: 'card-body text-center' },
              e('p', { className: 'text-gray-500' }, 'Nenhum produto cadastrado ainda.')
            )
          )
        : lista.map(prod =>
            e('div', { 
              key: prod.id,
              className: 'card'
            },
              e('div', { className: 'card-body' },
                e('h4', { className: 'card-title' }, prod.nome),
                e('p', { className: 'text-gray-600 mb-2' }, prod.descricao),
                e('p', { className: 'text-lg font-semibold text-primary mb-4' }, `R$ ${parseFloat(prod.preco).toFixed(2)}`),
                e('div', { className: 'card-actions' },
                  token && e('button', { 
                    className: 'btn btn-secondary btn-sm',
                    onClick: () => setEdit({ ...prod, preco: prod.preco.toString() })
                  }, 'Editar'),
                  token && e('button', { 
                    className: 'btn btn-danger btn-sm',
                    onClick: () => {
                      if (confirm('Tem certeza que deseja excluir este produto?')) {
                        excluir(prod.id);
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
          e('h3', { className: 'modal-title' }, 'Editar Produto'),
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
                e('label', { className: 'form-label' }, 'Preço (R$)'),
                e('input', {
                  className: 'form-input',
                  type: 'number',
                  step: '0.01',
                  value: edit.preco,
                  onChange: e => setEdit({ ...edit, preco: e.target.value }),
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
