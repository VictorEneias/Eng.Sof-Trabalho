import { api } from './api.js?v=2';
const e = React.createElement;

export default function Feiras() {
  const [feiras, setFeiras] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingFeira, setEditingFeira] = React.useState(null);
  const [form, setForm] = React.useState({
    nome: '',
    descricao: '',
    data_inicio: '',
    data_fim: '',
    local: '',
    cidade: '',
    estado: ''
  });

  React.useEffect(() => {
    loadFeiras();
  }, []);

  async function loadFeiras() {
    try {
      const data = await api('/feiras');
      setFeiras(data);
    } catch (error) {
      console.error('Erro ao carregar feiras:', error);
    }
  }

  function resetForm() {
    setForm({
      nome: '',
      descricao: '',
      data_inicio: '',
      data_fim: '',
      local: '',
      cidade: '',
      estado: ''
    });
    setEditingFeira(null);
    setShowForm(false);
  }

  function handleEdit(feira) {
    setForm({
      nome: feira.nome,
      descricao: feira.descricao,
      data_inicio: feira.data_inicio,
      data_fim: feira.data_fim,
      local: feira.local,
      cidade: feira.cidade,
      estado: feira.estado
    });
    setEditingFeira(feira);
    setShowForm(true);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (editingFeira) {
        const updated = await api(`/feiras/${editingFeira.id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setFeiras(feiras.map(f => f.id === editingFeira.id ? updated : f));
      } else {
        const nova = await api('/feiras', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setFeiras([...feiras, nova]);
      }
      resetForm();
      loadFeiras();
    } catch (error) {
      console.error('Erro ao salvar feira:', error);
      alert('Erro ao salvar feira');
    }
  }

  async function handleDelete(feira) {
    if (confirm(`Tem certeza que deseja excluir a feira "${feira.nome}"?`)) {
      try {
        await api(`/feiras/${feira.id}`, { method: 'DELETE' });
        setFeiras(feiras.filter(f => f.id !== feira.id));
      } catch (error) {
        console.error('Erro ao excluir feira:', error);
        alert('Erro ao excluir feira');
      }
    }
  }

  function handleInputChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h2', null, 'Gestão de Feiras'),
      e('button', {
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Nova Feira')
    ),

    showForm && e('div', { className: 'form-container' },
      e('h3', null, editingFeira ? 'Editar Feira' : 'Nova Feira'),
      e('form', { onSubmit: handleSubmit, className: 'form' },
        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Nome da Feira'),
            e('input', {
              type: 'text',
              value: form.nome,
              onChange: e => handleInputChange('nome', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Local'),
            e('input', {
              type: 'text',
              value: form.local,
              onChange: e => handleInputChange('local', e.target.value),
              required: true
            })
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

        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Data de Início'),
            e('input', {
              type: 'date',
              value: form.data_inicio,
              onChange: e => handleInputChange('data_inicio', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Data de Término'),
            e('input', {
              type: 'date',
              value: form.data_fim,
              onChange: e => handleInputChange('data_fim', e.target.value),
              required: true
            })
          )
        ),

        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Cidade'),
            e('input', {
              type: 'text',
              value: form.cidade,
              onChange: e => handleInputChange('cidade', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Estado'),
            e('input', {
              type: 'text',
              value: form.estado,
              onChange: e => handleInputChange('estado', e.target.value),
              required: true
            })
          )
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
          }, editingFeira ? 'Atualizar' : 'Criar')
        )
      )
    ),

    e('div', { className: 'items-container' },
      feiras.length === 0 ? 
        e('p', { className: 'empty-message' }, 'Nenhuma feira cadastrada') :
        e('div', { className: 'items-grid' },
          feiras.map(feira =>
            e('div', { key: feira.id, className: 'item-card' },
              e('div', { className: 'item-header' },
                e('h3', null, feira.nome),
                e('div', { className: 'item-actions' },
                  e('button', {
                    className: 'btn btn-sm btn-secondary',
                    onClick: () => handleEdit(feira)
                  }, 'Editar'),
                  e('button', {
                    className: 'btn btn-sm btn-danger',
                    onClick: () => handleDelete(feira)
                  }, 'Excluir')
                )
              ),
              e('div', { className: 'item-content' },
                e('p', null, e('strong', null, 'Local: '), feira.local),
                e('p', null, e('strong', null, 'Cidade: '), feira.cidade, ', ', feira.estado),
                e('p', null, e('strong', null, 'Período: '), 
                  new Date(feira.data_inicio).toLocaleDateString(), ' - ',
                  new Date(feira.data_fim).toLocaleDateString()
                ),
                feira.descricao && e('p', null, e('strong', null, 'Descrição: '), feira.descricao)
              )
            )
          )
        )
    )
  );
}
