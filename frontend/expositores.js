import { api } from './api.js';
const e = React.createElement;

export default function Expositores({ feiraId, onSelect }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    if (feiraId) {
      api(`/feiras/${feiraId}/expositores`).then(setLista);
    }
  }, [feiraId]);

  return e('ul', null,
    lista.map(exp =>
      e('li', { key: exp.id, onClick: () => onSelect && onSelect(exp) }, exp.nome)
    )
  );
}
