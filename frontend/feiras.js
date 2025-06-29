import { api } from './api.js';
const e = React.createElement;

function FeiraItem({ feira, onSelect }) {
  return e('li', { onClick: () => onSelect(feira) }, feira.nome);
}

import Expositores from './expositores.js';
import Produtos from './produtos.js';
import Ingressos from './ingressos.js';

export default function Feiras() {
  const [feiras, setFeiras] = React.useState([]);
  const [selecionada, setSelecionada] = React.useState(null);
  const [expositorSel, setExpositorSel] = React.useState(null);
  const [editForm, setEditForm] = React.useState(null);
  const [form, setForm] = React.useState({ nome: '', descricao: '', data_inicio: '', data_fim: '', local: '', cidade: '', estado: '' });

  React.useEffect(() => {
    api('/feiras').then(setFeiras).catch(console.error);
  }, []);

  async function criar(evt) {
    evt.preventDefault();
    const nova = await api('/feiras', { method: 'POST', body: JSON.stringify(form) });
    setFeiras([...feiras, nova]);
  }

  async function selecionar(feira) {
    const detalhes = await api(`/feiras/${feira.id}`);
    setSelecionada(detalhes);
    setExpositorSel(null);
    setEditForm(null);
  }

  async function excluir(feiraId) {
    await api(`/feiras/${feiraId}`, { method: 'DELETE' });
    setFeiras(feiras.filter(f => f.id !== feiraId));
    setSelecionada(null);
  }

  async function salvarEdicao(evt) {
    evt.preventDefault();
    const atualizada = await api(`/feiras/${editForm.id}`, {
      method: 'PUT',
      body: JSON.stringify(editForm)
    });
    setFeiras(feiras.map(f => f.id === editForm.id ? { ...f, ...editForm } : f));
    setSelecionada({ ...selecionada, ...editForm });
    setEditForm(null);
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
    e('ul', null, feiras.map(f => e(FeiraItem, { key: f.id, feira: f, onSelect: selecionar }))),
    selecionada && e('div', null,
      e('h4', null, selecionada.nome),
      e('pre', null, JSON.stringify(selecionada, null, 2)),
      e('button', { onClick: () => excluir(selecionada.id) }, 'Excluir'),
      !editForm && e('button', { onClick: () => setEditForm(selecionada) }, 'Editar'),
      editForm && e('form', { onSubmit: salvarEdicao },
        Object.keys(editForm).filter(k => k !== 'id' && k !== 'id_criador').map(campo =>
          e('input', {
            key: campo,
            value: editForm[campo],
            onChange: e => setEditForm({ ...editForm, [campo]: e.target.value })
          })
        ),
        e('button', { type: 'submit' }, 'Salvar')
      ),
      e(Ingressos, { feiraId: selecionada.id }),
      e(Expositores, { feiraId: selecionada.id, onSelect: async exp => {
        const det = await api(`/expositores/${exp.id}`);
        setExpositorSel(det);
      } }),
      expositorSel && e('div', null,
        e('h5', null, expositorSel.nome),
        e('pre', null, JSON.stringify(expositorSel, null, 2)),
        e(Produtos, { expositorId: expositorSel.id })
      )
    )
  );
}
