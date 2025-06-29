import { api } from './api.js';
const e = React.createElement;

export default function Produtos({ expositorId }) {
  const [lista, setLista] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: '', descricao: '', preco: '' });
  const [edit, setEdit] = React.useState(null);

  React.useEffect(() => {
    if (expositorId) {
      api(`/expositores/${expositorId}/produtos`).then(setLista);
    }
  }, [expositorId]);

  async function criar(evt) {
    evt.preventDefault();
    const criado = await api('/produtos/', {
      method: 'POST',
      body: JSON.stringify({ ...novo, expositor_id: expositorId, preco: parseFloat(novo.preco) })
    });
    setLista([...lista, criado]);
    setNovo({ nome: '', descricao: '', preco: '' });
  }

  async function excluir(id) {
    await api(`/produtos/${id}`, { method: 'DELETE' });
    setLista(lista.filter(p => p.id !== id));
    if (edit && edit.id === id) setEdit(null);
  }

  async function salvar(evt) {
    evt.preventDefault();
    await api(`/produtos/${edit.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...edit, expositor_id: expositorId, preco: parseFloat(edit.preco) })
    });
    setLista(lista.map(p => p.id === edit.id ? edit : p));
    setEdit(null);
  }

  return e('div', null,
    e('h6', null, 'Produtos'),
    e('form', { onSubmit: criar },
      ['nome', 'descricao', 'preco'].map(c =>
        e('input', {
          key: c,
          placeholder: c,
          value: novo[c],
          onChange: e => setNovo({ ...novo, [c]: e.target.value })
        })
      ),
      e('button', { type: 'submit' }, 'Adicionar')
    ),
    e('ul', null,
      lista.map(prod =>
        e('li', { key: prod.id },
          prod.nome + ' - R$ ' + prod.preco,
          ' ',
          e('button', { onClick: () => setEdit({ ...prod, preco: prod.preco }) }, 'Editar'),
          e('button', { onClick: () => excluir(prod.id) }, 'Excluir')
        )
      )
    ),
    edit && e('form', { onSubmit: salvar },
      ['nome', 'descricao', 'preco'].map(c =>
        e('input', {
          key: c,
          value: edit[c],
          onChange: e => setEdit({ ...edit, [c]: e.target.value })
        })
      ),
      e('button', { type: 'submit' }, 'Salvar')
    )
  );
}
