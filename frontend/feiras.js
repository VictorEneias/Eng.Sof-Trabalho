import { api } from './api.js';
const e = React.createElement;

function FeiraItem({ feira, onSelect }) {
  return e('li', { onClick: () => onSelect(feira) }, feira.nome);
}

export default function Feiras() {
  const [feiras, setFeiras] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [form, setForm] = React.useState({ nome: '', descricao: '', data_inicio: '', data_fim: '', local: '', cidade: '', estado: '' });

  React.useEffect(() => {
    api('/feiras').then(setFeiras).catch(console.error);
  }, []);

  async function criar(evt) {
    evt.preventDefault();
    const nova = await api('/feiras', { method: 'POST', body: JSON.stringify(form) });
    setFeiras([...feiras, nova]);
  }

  return e('div', null,
    e('h3', null, 'Feiras'),
    e('form', { onSubmit: criar },
      Object.keys(form).map(campo =>
        e('input', {
          key: campo,
          placeholder: campo,
          value: form[campo],
          onChange: e => setForm({ ...form, [campo]: e.target.value })
        })
      ),
      e('button', { type: 'submit' }, 'Criar')
    ),
    e('ul', null, feiras.map(f => e(FeiraItem, { key: f.id, feira: f, onSelect: setSelected }))),
    selected && e('div', null,
      e('h4', null, selected.nome),
      e('pre', null, JSON.stringify(selected, null, 2))
    )
  );
}
