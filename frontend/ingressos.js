import { api } from './api.js?v=2';
const e = React.createElement;

export default function Ingressos() {
  const [ingressos, setIngressos] = React.useState([]);
  const [feiras, setFeiras] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingIngresso, setEditingIngresso] = React.useState(null);
  const [form, setForm] = React.useState({
    feira_id: '',
    data_emissao: '',
    numero: ''
  });

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [ingressosData, feirasData] = await Promise.all([
        api('/ingressos'),
        api('/feiras')
      ]);
      setIngressos(ingressosData);
      setFeiras(feirasData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  function resetForm() {
    setForm({
      feira_id: '',
      data_emissao: '',
      numero: ''
    });
    setEditingIngresso(null);
    setShowForm(false);
  }

  function handleEdit(ingresso) {
    setForm({
      feira_id: ingresso.feira_id,
      data_emissao: ingresso.data_emissao,
      numero: ingresso.numero
    });
    setEditingIngresso(ingresso);
    setShowForm(true);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (editingIngresso) {
        const updated = await api(`/ingressos/${editingIngresso.id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setIngressos(ingressos.map(i => i.id === editingIngresso.id ? updated : i));
      } else {
        const novo = await api('/ingressos', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setIngressos([...ingressos, novo]);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar ingresso:', error);
      alert('Erro ao salvar ingresso');
    }
  }

  async function handleDelete(ingresso) {
    if (confirm(`Tem certeza que deseja excluir o ingresso "${ingresso.numero}"?`)) {
      try {
        await api(`/ingressos/${ingresso.id}`, { method: 'DELETE' });
        setIngressos(ingressos.filter(i => i.id !== ingresso.id));
      } catch (error) {
        console.error('Erro ao excluir ingresso:', error);
        alert('Erro ao excluir ingresso');
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

  function generateTicketNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `T${timestamp}${random}`;
  }

  function handleGenerateNumber() {
    setForm({ ...form, numero: generateTicketNumber() });
  }

  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h2', null, 'Gestão de Ingressos'),
      e('button', {
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Novo Ingresso')
    ),

    showForm && e('div', { className: 'form-container' },
      e('h3', null, editingIngresso ? 'Editar Ingresso' : 'Novo Ingresso'),
      e('form', { onSubmit: handleSubmit, className: 'form' },
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
        ),

        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Data de Emissão'),
            e('input', {
              type: 'date',
              value: form.data_emissao,
              onChange: e => handleInputChange('data_emissao', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Número do Ingresso'),
            e('div', { className: 'input-group' },
              e('input', {
                type: 'text',
                value: form.numero,
                onChange: e => handleInputChange('numero', e.target.value),
                placeholder: 'Número do ingresso',
                required: true
              }),
              e('button', {
                type: 'button',
                className: 'btn btn-secondary',
                onClick: handleGenerateNumber
              }, 'Gerar')
            )
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
          }, editingIngresso ? 'Atualizar' : 'Criar')
        )
      )
    ),

    e('div', { className: 'items-container' },
      ingressos.length === 0 ? 
        e('p', { className: 'empty-message' }, 'Nenhum ingresso cadastrado') :
        e('div', { className: 'items-grid' },
          ingressos.map(ingresso =>
            e('div', { key: ingresso.id, className: 'item-card' },
              e('div', { className: 'item-header' },
                e('h3', null, 'Ingresso ', ingresso.numero),
                e('div', { className: 'item-actions' },
                  e('button', {
                    className: 'btn btn-sm btn-secondary',
                    onClick: () => handleEdit(ingresso)
                  }, 'Editar'),
                  e('button', {
                    className: 'btn btn-sm btn-danger',
                    onClick: () => handleDelete(ingresso)
                  }, 'Excluir')
                )
              ),
              e('div', { className: 'item-content' },
                e('p', null, e('strong', null, 'Feira: '), getFeiraName(ingresso.feira_id)),
                e('p', null, e('strong', null, 'Data de Emissão: '), 
                  new Date(ingresso.data_emissao).toLocaleDateString()
                ),
                e('p', null, e('strong', null, 'Número: '), ingresso.numero)
              )
            )
          )
        )
    )
  );
}
