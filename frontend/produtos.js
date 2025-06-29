import { api } from './api.js';
const e = React.createElement;

export default function Produtos({ expositorId }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    if (expositorId) {
      api(`/expositores/${expositorId}/produtos`).then(setLista);
    }
  }, [expositorId]);

  return e('ul', null,
    lista.map(prod => e('li', { key: prod.id }, prod.nome + ' - R$ ' + prod.preco))
  );
}
