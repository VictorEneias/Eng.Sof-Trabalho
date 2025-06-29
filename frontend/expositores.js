import { api } from './api.js?v=2';
const e = React.createElement;

export default function Expositores() {
  const [expositores, setExpositores] = React.useState([]);
  const [feiras, setFeiras] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingExpositor, setEditingExpositor] = React.useState(null);
  const [form, setForm] = React.useState({
    nome: '',
    descricao: '',
    contato: '',
    feira_id: ''
  });

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [expositoresData, feirasData] = await Promise.all([
        api('/expositores'),
        api('/feiras')
      ]);
      setExpositores(expositoresData);
      setFeiras(feirasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  function resetForm() {
    setForm({
      nome: '',
      descricao: '',
      contato: '',
      feira_id: ''
    });
    setEditingExpositor(null);
    setShowForm(false);
  }

  function handleEdit(expositor) {
    setForm({
      nome: expositor.nome,
      descricao: expositor.descricao,
      contato: expositor.contato,
      feira_id: expositor.feira_id
    });
    setEditingExpositor(expositor);
    setShowForm(true);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (editingExpositor) {
        const updated = await api(`/expositores/${editingExpositor.id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setExpositores(expositores.map(e => e.id === editingExpositor.id ? updated : e));
      } else {
        const novo = await api('/expositores', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setExpositores([...expositores, novo]);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar expositor:', error);
      alert('Erro ao salvar expositor');
    }
  }

  async function handleDelete(expositor) {
    if (confirm(`Tem certeza que deseja excluir o expositor "${expositor.nome}"?`)) {
      try {
        await api(`/expositores/${expositor.id}`, { method: 'DELETE' });
        setExpositores(expositores.filter(e => e.id !== expositor.id));
      } catch (error) {
        console.error('Erro ao excluir expositor:', error);
        alert('Erro ao excluir expositor');
      }
    }
  }

  function handleInputChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function getFeiraName(feiraId) {
    const feira = feiras.find(f => f.id === feiraId);
    return feira ? feira.nome : 'Feira não encontrada';
  }

  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h2', null, 'Gestão de Expositores'),
      e('button', {
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Novo Expositor')
    ),

    showForm && e('div', { className: 'form-container' },
      e('h3', null, editingExpositor ? 'Editar Expositor' : 'Novo Expositor'),
      e('form', { onSubmit: handleSubmit, className: 'form' },
        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Nome do Expositor'),
            e('input', {
              type: 'text',
              value: form.nome,
              onChange: e => handleInputChange('nome', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Feira'),
            e('select', {
              value: form.feira_id,
              onChange: e => handleInputChange('feira_id', e.target.value),
              required: true
            },
              e('option', { value: '' }, 'Selecione uma feira'),
              feiras.map(feira =>
                e('option', { key: feira.id, value: feira.id }, feira.nome)
              )
            )
          )
        ),

        e('div', { className: 'form-group' },
          e('label', null, 'Descrição'),
          e('textarea', {
            value: form.descricao,
            onChange: e => handleInputChange('descricao', e.target.value),
            rows: 3
          })
        ),

        e('div', { className: 'form-group' },
          e('label', null, 'Contato'),
          e('input', {
            type: 'text',
            value: form.contato,
            onChange: e => handleInputChange('contato', e.target.value),
            placeholder: 'Email, telefone ou outro contato',
            required: true
          })
        ),

        e('div', { className: 'form-actions' },
          e('button', {
            type: 'button',
            className: 'btn btn-secondary',
            onClick: resetForm
          }, 'Cancelar'),
          e('button', {
            type: 'submit',
            className: 'btn btn-primary'
          }, editingExpositor ? 'Atualizar' : 'Criar')
        )
      )
    ),

    e('div', { className: 'items-container' },
      expositores.length === 0 ? 
        e('p', { className: 'empty-message' }, 'Nenhum expositor cadastrado') :
        e('div', { className: 'items-grid' },
          expositores.map(expositor =>
            e('div', { key: expositor.id, className: 'item-card' },
              e('div', { className: 'item-header' },
                e('h3', null, expositor.nome),
                e('div', { className: 'item-actions' },
                  e('button', {
                    className: 'btn btn-sm btn-secondary',
                    onClick: () => handleEdit(expositor)
                  }, 'Editar'),
                  e('button', {
                    className: 'btn btn-sm btn-danger',
                    onClick: () => handleDelete(expositor)
                  }, 'Excluir')
                )
              ),
              e('div', { className: 'item-content' },
                e('p', null, e('strong', null, 'Feira: '), getFeiraName(expositor.feira_id)),
                e('p', null, e('strong', null, 'Contato: '), expositor.contato),
                expositor.descricao && e('p', null, e('strong', null, 'Descrição: '), expositor.descricao)
              )
            )
          )
        )
    )
  );
}
