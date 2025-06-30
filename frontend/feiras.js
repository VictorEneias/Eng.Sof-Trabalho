import { api } from './api.js';
const e = React.createElement;

function FeiraCard({ feira, onSelect, token }) {
  return e('div', { 
    className: 'feira-card',
    onClick: () => onSelect(feira)
  },
    e('div', { className: 'feira-card-image' }, '🎪'),
    e('div', { className: 'feira-card-content' },
      e('h3', { className: 'feira-card-title' }, feira.nome),
      e('p', { className: 'feira-card-description' }, feira.descricao),
      e('div', { className: 'feira-card-meta' },
        e('div', { className: 'feira-card-date' },
          e('span', null, '📅'),
          `${feira.data_inicio} a ${feira.data_fim}`
        ),
        e('div', { className: 'feira-card-location' },
          e('span', null, '📍'),
          `${feira.local}, ${feira.cidade}/${feira.estado}`
        )
      ),
      e('div', { className: 'feira-card-footer' },
        e('div', { className: 'feira-card-stats' },
          e('div', { className: 'feira-card-stat' },
            e('span', null, '🏢'),
            'Expositores'
          ),
          e('div', { className: 'feira-card-stat' },
            e('span', null, '🎫'),
            'Ingressos'
          )
        ),
        token && e('span', { className: 'badge badge-primary' }, 'Gerenciar')
      )
    )
  );
}

import Expositores from './expositores.js';
import Produtos from './produtos.js';
import Ingressos from './ingressos.js';

export default function Feiras({ token }) {
  const [feiras, setFeiras] = React.useState([]);
  const [selecionada, setSelecionada] = React.useState(null);
  const [expositorSel, setExpositorSel] = React.useState(null);
  const [editForm, setEditForm] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const [form, setForm] = React.useState({ nome: '', descricao: '', data_inicio: '', data_fim: '', local: '', cidade: '', estado: '' });

  React.useEffect(() => {
    api('/feiras').then(setFeiras).catch(console.error);
  }, []);

  async function criar(evt) {
    evt.preventDefault();
    const nova = await api('/feiras', { method: 'POST', body: JSON.stringify(editForm) });
    setFeiras([...feiras, nova]);
    setEditForm(null);
  }

  async function selecionar(feira) {
    const detalhes = await api(`/feiras/${feira.id}`);
    setSelecionada(detalhes);
    setShowDetails(true);
    setExpositorSel(null);
    setEditForm(null);
  }

  async function excluir(feiraId) {
    await api(`/feiras/${feiraId}`, { method: 'DELETE' });
    setFeiras(feiras.filter(f => f.id !== feiraId));
    setSelecionada(null);
  }

  async function salvarEdicao(evt) {
    evt.preventDefault();
    const atualizada = await api(`/feiras/${editForm.id}`, {
      method: 'PUT',
      body: JSON.stringify(editForm)
    });
    setFeiras(feiras.map(f => f.id === editForm.id ? { ...f, ...editForm } : f));
    setSelecionada({ ...selecionada, ...editForm });
    setEditForm(null);
  }

  return e('div', null,
    // Header da seção
    e('div', { className: 'content-header' },
      e('div', null,
        e('h1', { className: 'content-title' }, 'Feiras'),
        e('p', { className: 'content-subtitle' }, 'Gerencie e explore feiras de artesanato')
      ),
      token && e('div', { className: 'content-actions' },
        e('button', { 
          className: 'btn btn-primary',
          onClick: () => setEditForm({ nome: '', descricao: '', data_inicio: '', data_fim: '', local: '', cidade: '', estado: '' })
        }, '+ Nova Feira')
      )
    ),

    // Modal de criação/edição
    (editForm && !editForm.id) && e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal' },
        e('div', { className: 'modal-header' },
          e('h3', { className: 'modal-title' }, 'Nova Feira'),
          e('button', { 
            className: 'modal-close',
            onClick: () => setEditForm(null)
          }, '×')
        ),
        e('div', { className: 'modal-body' },
          e('form', { onSubmit: criar },
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Nome da Feira'),
                e('input', {
                  className: 'form-input',
                  placeholder: 'Ex: Feira de Artesanato 2025',
                  value: editForm.nome,
                  onChange: e => setEditForm({ ...editForm, nome: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Local'),
                e('input', {
                  className: 'form-input',
                  placeholder: 'Ex: Praça Central',
                  value: editForm.local,
                  onChange: e => setEditForm({ ...editForm, local: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Descrição'),
              e('textarea', {
                className: 'form-textarea',
                placeholder: 'Descreva a feira...',
                value: editForm.descricao,
                onChange: e => setEditForm({ ...editForm, descricao: e.target.value }),
                required: true
              })
            ),
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Data de Início'),
                e('input', {
                  className: 'form-input',
                  type: 'date',
                  value: editForm.data_inicio,
                  onChange: e => setEditForm({ ...editForm, data_inicio: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Data de Término'),
                e('input', {
                  className: 'form-input',
                  type: 'date',
                  value: editForm.data_fim,
                  onChange: e => setEditForm({ ...editForm, data_fim: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Cidade'),
                e('input', {
                  className: 'form-input',
                  placeholder: 'Ex: São Paulo',
                  value: editForm.cidade,
                  onChange: e => setEditForm({ ...editForm, cidade: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Estado'),
                e('input', {
                  className: 'form-input',
                  placeholder: 'Ex: SP',
                  value: editForm.estado,
                  onChange: e => setEditForm({ ...editForm, estado: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-actions' },
              e('button', { 
                type: 'button',
                className: 'btn btn-secondary',
                onClick: () => setEditForm(null)
              }, 'Cancelar'),
              e('button', { 
                type: 'submit',
                className: 'btn btn-primary'
              }, 'Criar Feira')
            )
          )
        )
      )
    ),

    // Grid de feiras
    feiras.length === 0 
      ? e('div', { className: 'empty-state' },
          e('div', { className: 'empty-state-icon' }, '🎪'),
          e('h3', { className: 'empty-state-title' }, 'Nenhuma feira encontrada'),
          e('p', { className: 'empty-state-description' }, 'Seja o primeiro a criar uma feira!'),
          token && e('button', { 
            className: 'btn btn-primary',
            onClick: () => setEditForm({ nome: '', descricao: '', data_inicio: '', data_fim: '', local: '', cidade: '', estado: '' })
          }, 'Criar Primeira Feira')
        )
      : e('div', { className: 'feira-grid' },
          feiras.map(f => e(FeiraCard, { key: f.id, feira: f, onSelect: selecionar, token }))
        ),
    // Modal de detalhes da feira
    showDetails && selecionada && e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal', style: { maxWidth: '800px' } },
        e('div', { className: 'modal-header' },
          e('h3', { className: 'modal-title' }, selecionada.nome),
          e('button', { 
            className: 'modal-close',
            onClick: () => setShowDetails(false)
          }, '×')
        ),
        e('div', { className: 'modal-body' },
          // Informações da feira
          e('div', { className: 'card mb-4' },
            e('div', { className: 'card-body' },
              e('div', { className: 'feira-card-meta mb-4' },
                e('div', { className: 'feira-card-date' },
                  e('span', null, '📅'),
                  `${selecionada.data_inicio} a ${selecionada.data_fim}`
                ),
                e('div', { className: 'feira-card-location' },
                  e('span', null, '📍'),
                  `${selecionada.local}, ${selecionada.cidade}/${selecionada.estado}`
                )
              ),
              e('p', { className: 'text-gray-700' }, selecionada.descricao),
              
              // Botões de ação (apenas para criador)
              token && e('div', { className: 'mt-4' },
                e('button', { 
                  className: 'btn btn-primary btn-sm mr-2',
                  onClick: () => setEditForm(selecionada)
                }, 'Editar'),
                e('button', { 
                  className: 'btn btn-danger btn-sm',
                  onClick: () => {
                    if (confirm('Tem certeza que deseja excluir esta feira?')) {
                      excluir(selecionada.id);
                      setShowDetails(false);
                    }
                  }
                }, 'Excluir')
              )
            )
          ),

          // Seções de gestão
          e('div', { className: 'grid', style: { gridTemplateColumns: '1fr 1fr', gap: '1rem' } },
            // Expositores
            e('div', { className: 'card' },
              e('div', { className: 'card-header' },
                e('h4', { className: 'card-title' }, '🏢 Expositores')
              ),
              e('div', { className: 'card-body' },
                e(Expositores, { 
                  feiraId: selecionada.id, 
                  token, 
                  compact: true,
                  onSelect: async exp => {
                    const det = await api(`/expositores/${exp.id}`);
                    setExpositorSel(det);
                  }
                })
              )
            ),

            // Ingressos
            e('div', { className: 'card' },
              e('div', { className: 'card-header' },
                e('h4', { className: 'card-title' }, '🎫 Ingressos')
              ),
              e('div', { className: 'card-body' },
                e(Ingressos, { feiraId: selecionada.id, token, compact: true })
              )
            )
          ),

          // Modal de produtos do expositor selecionado
          expositorSel && e('div', { className: 'card mt-4' },
            e('div', { className: 'card-header' },
              e('h4', { className: 'card-title' }, `📦 Produtos - ${expositorSel.nome}`),
              e('button', { 
                className: 'btn btn-secondary btn-sm',
                onClick: () => setExpositorSel(null)
              }, 'Fechar')
            ),
            e('div', { className: 'card-body' },
              e(Produtos, { expositorId: expositorSel.id, token, compact: true })
            )
          )
        )
      )
    ),

    // Modal de edição de feira
    (editForm && editForm.id) && e('div', { className: 'modal-overlay' },
      e('div', { className: 'modal' },
        e('div', { className: 'modal-header' },
          e('h3', { className: 'modal-title' }, 'Editar Feira'),
          e('button', { 
            className: 'modal-close',
            onClick: () => setEditForm(null)
          }, '×')
        ),
        e('div', { className: 'modal-body' },
          e('form', { onSubmit: salvarEdicao },
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Nome da Feira'),
                e('input', {
                  className: 'form-input',
                  value: editForm.nome,
                  onChange: e => setEditForm({ ...editForm, nome: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Local'),
                e('input', {
                  className: 'form-input',
                  value: editForm.local,
                  onChange: e => setEditForm({ ...editForm, local: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-group' },
              e('label', { className: 'form-label' }, 'Descrição'),
              e('textarea', {
                className: 'form-textarea',
                value: editForm.descricao,
                onChange: e => setEditForm({ ...editForm, descricao: e.target.value }),
                required: true
              })
            ),
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Data de Início'),
                e('input', {
                  className: 'form-input',
                  type: 'date',
                  value: editForm.data_inicio,
                  onChange: e => setEditForm({ ...editForm, data_inicio: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Data de Término'),
                e('input', {
                  className: 'form-input',
                  type: 'date',
                  value: editForm.data_fim,
                  onChange: e => setEditForm({ ...editForm, data_fim: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-row' },
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Cidade'),
                e('input', {
                  className: 'form-input',
                  value: editForm.cidade,
                  onChange: e => setEditForm({ ...editForm, cidade: e.target.value }),
                  required: true
                })
              ),
              e('div', { className: 'form-group' },
                e('label', { className: 'form-label' }, 'Estado'),
                e('input', {
                  className: 'form-input',
                  value: editForm.estado,
                  onChange: e => setEditForm({ ...editForm, estado: e.target.value }),
                  required: true
                })
              )
            ),
            e('div', { className: 'form-actions' },
              e('button', { 
                type: 'button',
                className: 'btn btn-secondary',
                onClick: () => setEditForm(null)
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
