import { api } from './api.js';
const e = React.createElement;

export default function Ingressos({ feiraId, token }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    api('/ingressos').then(data => {
      setLista(feiraId ? data.filter(i => i.feira_id === feiraId) : data);
    });
  }, [feiraId]);

  async function criar(evt) {
    evt.preventDefault();
    const novo = await api('/ingressos', {
      method: 'POST',
      body: JSON.stringify({ feira_id: feiraId })
    });
    setLista([...lista, novo]);
  }

  async function excluir(id) {
    await api(`/ingressos/${id}`, { method: 'DELETE' });
    setLista(lista.filter(i => i.id !== id));
  }

  return e('div', null,
    e('h4', null, 'Ingressos'),
    token && e('form', { onSubmit: criar },
      e('button', { type: 'submit' }, 'Criar')
    ),
    e('ul', null, lista.map(i =>
      e('li', { key: i.id },
        i.numero + ' - Feira ' + i.feira_id,
        token && e('button', { onClick: () => excluir(i.id) }, 'Excluir')
      )
    ))
  );
}
