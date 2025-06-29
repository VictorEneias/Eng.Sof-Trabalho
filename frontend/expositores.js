import { api } from './api.js';
const e = React.createElement;

export default function Expositores({ feiraId, onSelect, token }) {
  const [lista, setLista] = React.useState([]);
  const [novo, setNovo] = React.useState({ nome: '', descricao: '', contato: '' });
  const [edit, setEdit] = React.useState(null);

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

  return e('div', null,
    e('h5', null, 'Expositores'),
    token && e('form', { onSubmit: criar },
      ['nome', 'descricao', 'contato'].map(c =>
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
      lista.map(exp =>
        e('li', { key: exp.id },
          e('span', { onClick: () => onSelect && onSelect(exp) }, exp.nome),
          ' ',
          token && e('button', { onClick: () => setEdit(exp) }, 'Editar'),
          token && e('button', { onClick: () => excluir(exp.id) }, 'Excluir')
        )
      )
    ),
    token && edit && e('form', { onSubmit: salvar },
      ['nome', 'descricao', 'contato'].map(c =>
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
