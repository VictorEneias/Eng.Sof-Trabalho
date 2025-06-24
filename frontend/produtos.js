import { api } from './api.js';
const e = React.createElement;

export default function Produtos({ expositorId }) {
  const [lista, setLista] = React.useState([]);

  React.useEffect(() => {
    if (expositorId) {
      api('/produtos').then(data => setLista(data.filter(p => p.expositor_id === expositorId)));
    }
  }, [expositorId]);

  return e('ul', null,
    lista.map(prod => e('li', { key: prod.id }, prod.nome + ' - R$ ' + prod.preco))
  );
}
