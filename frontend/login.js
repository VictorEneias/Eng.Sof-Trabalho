import { api } from './api.js';
const e = React.createElement;

export default function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const data = await api('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });
      onLogin(data.access_token);
    } catch (err) {
      setErro('Falha no login');
    }
  }

  return e('form', { onSubmit: handleSubmit },
    e('h3', null, 'Login'),
    erro ? e('div', { style: { color: 'red' } }, erro) : null,
    e('input', {
      placeholder: 'Email',
      value: email,
      onChange: e => setEmail(e.target.value)
    }),
    e('input', {
      type: 'password',
      placeholder: 'Senha',
      value: senha,
      onChange: e => setSenha(e.target.value)
    }),
    e('button', { type: 'submit' }, 'Entrar')
  );
}
