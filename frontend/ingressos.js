import { api } from './api.js';
const e = React.createElement;

export default function Ingressos({ feiraId }) {
  const [lista, setLista] = React.useState([]);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    api('/ingressos').then(data => {
      setLista(feiraId ? data.filter(i => i.feira_id === feiraId) : data);
    });
  }, [feiraId]);

  async function criar(evt) {
    evt.preventDefault();
    const novo = await api('/ingressos', {
      method: 'POST',
      body: JSON.stringify({ feira_id: feiraId, data_emissao: data, numero: 'tmp' })
    });
    setLista([...lista, novo]);
  }

  return e('div', null,
    e('h4', null, 'Ingressos'),
    e('form', { onSubmit: criar },
      e('input', {
        type: 'date',
        value: data,
        onChange: e => setData(e.target.value)
      }),
      e('button', { type: 'submit' }, 'Criar')
    ),
    e('ul', null, lista.map(i => e('li', { key: i.id }, i.numero)))
  );
}
