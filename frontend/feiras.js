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
    selecionada && e('div', null,
      e('h4', null, selecionada.nome),
      e('pre', null, JSON.stringify(selecionada, null, 2)),
      token && e('button', { onClick: () => excluir(selecionada.id) }, 'Excluir'),
      token && !editForm && e('button', { onClick: () => setEditForm(selecionada) }, 'Editar'),
      token && editForm && e('form', { onSubmit: salvarEdicao },
        Object.keys(editForm).filter(k => k !== 'id' && k !== 'id_criador').map(campo =>
          e('input', {
            key: campo,
            value: editForm[campo],
            onChange: e => setEditForm({ ...editForm, [campo]: e.target.value })
          })
        ),
        e('button', { type: 'submit' }, 'Salvar')
      ),
      e(Ingressos, { feiraId: selecionada.id, token }),
      e(Expositores, { feiraId: selecionada.id, token, onSelect: async exp => {
        const det = await api(`/expositores/${exp.id}`);
        setExpositorSel(det);
      } }),
      expositorSel && e('div', null,
        e('h5', null, expositorSel.nome),
        e('pre', null, JSON.stringify(expositorSel, null, 2)),
        e(Produtos, { expositorId: expositorSel.id, token })
      )
    )
  );
}
