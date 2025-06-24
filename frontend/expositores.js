import { api } from './api.js';
const e = React.createElement;

export default function Expositores({ feiraId }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    if (feiraId) {
      api('/expositores').then(data => setLista(data.filter(e => e.feira_id === feiraId))); 
    }
  }, [feiraId]);

  return e('ul', null,
    lista.map(exp => e('li', { key: exp.id }, exp.nome))
  );
}
