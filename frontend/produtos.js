import { api } from './api.js?v=2';
const e = React.createElement;

export default function Produtos() {
  const [produtos, setProdutos] = React.useState([]);
  const [expositores, setExpositores] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingProduto, setEditingProduto] = React.useState(null);
  const [form, setForm] = React.useState({
    nome: '',
    descricao: '',
    preco: '',
    expositor_id: ''
  });

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [produtosData, expositoresData] = await Promise.all([
        api('/produtos'),
        api('/expositores')
      ]);
      setProdutos(produtosData);
      setExpositores(expositoresData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  function resetForm() {
    setForm({
      nome: '',
      descricao: '',
      preco: '',
      expositor_id: ''
    });
    setEditingProduto(null);
    setShowForm(false);
  }

  function handleEdit(produto) {
    setForm({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      expositor_id: produto.expositor_id
    });
    setEditingProduto(produto);
    setShowForm(true);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = {
        ...form,
        preco: parseFloat(form.preco)
      };

      if (editingProduto) {
        const updated = await api(`/produtos/${editingProduto.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
        setProdutos(produtos.map(p => p.id === editingProduto.id ? updated : p));
      } else {
        const novo = await api('/produtos', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        setProdutos([...produtos, novo]);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  }

  async function handleDelete(produto) {
    if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
      try {
        await api(`/produtos/${produto.id}`, { method: 'DELETE' });
        setProdutos(produtos.filter(p => p.id !== produto.id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
      }
    }
  }

  function handleInputChange(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function getExpositorName(expositorId) {
    const expositor = expositores.find(e => e.id === expositorId);
    return expositor ? expositor.nome : 'Expositor não encontrado';
  }

  return e('div', { className: 'section' },
    e('div', { className: 'section-header' },
      e('h2', null, 'Gestão de Produtos'),
      e('button', {
        className: 'btn btn-primary',
        onClick: () => setShowForm(!showForm)
      }, showForm ? 'Cancelar' : 'Novo Produto')
    ),

    showForm && e('div', { className: 'form-container' },
      e('h3', null, editingProduto ? 'Editar Produto' : 'Novo Produto'),
      e('form', { onSubmit: handleSubmit, className: 'form' },
        e('div', { className: 'form-row' },
          e('div', { className: 'form-group' },
            e('label', null, 'Nome do Produto'),
            e('input', {
              type: 'text',
              value: form.nome,
              onChange: e => handleInputChange('nome', e.target.value),
              required: true
            })
          ),
          e('div', { className: 'form-group' },
            e('label', null, 'Preço (R$)'),
            e('input', {
              type: 'number',
              step: '0.01',
              min: '0',
              value: form.preco,
              onChange: e => handleInputChange('preco', e.target.value),
              required: true
            })
          )
        ),

        e('div', { className: 'form-group' },
          e('label', null, 'Expositor'),
          e('select', {
            value: form.expositor_id,
            onChange: e => handleInputChange('expositor_id', e.target.value),
            required: true
          },
            e('option', { value: '' }, 'Selecione um expositor'),
            expositores.map(expositor =>
              e('option', { key: expositor.id, value: expositor.id }, expositor.nome)
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

        e('div', { className: 'form-actions' },
          e('button', {
            type: 'button',
            className: 'btn btn-secondary',
            onClick: resetForm
          }, 'Cancelar'),
          e('button', {
            type: 'submit',
            className: 'btn btn-primary'
          }, editingProduto ? 'Atualizar' : 'Criar')
        )
      )
    ),

    e('div', { className: 'items-container' },
      produtos.length === 0 ? 
        e('p', { className: 'empty-message' }, 'Nenhum produto cadastrado') :
        e('div', { className: 'items-grid' },
          produtos.map(produto =>
            e('div', { key: produto.id, className: 'item-card' },
              e('div', { className: 'item-header' },
                e('h3', null, produto.nome),
                e('div', { className: 'item-actions' },
                  e('button', {
                    className: 'btn btn-sm btn-secondary',
                    onClick: () => handleEdit(produto)
                  }, 'Editar'),
                  e('button', {
                    className: 'btn btn-sm btn-danger',
                    onClick: () => handleDelete(produto)
                  }, 'Excluir')
                )
              ),
              e('div', { className: 'item-content' },
                e('p', null, e('strong', null, 'Preço: '), 'R$ ', produto.preco.toFixed(2)),
                e('p', null, e('strong', null, 'Expositor: '), getExpositorName(produto.expositor_id)),
                produto.descricao && e('p', null, e('strong', null, 'Descrição: '), produto.descricao)
              )
            )
          )
        )
    )
  );
}
