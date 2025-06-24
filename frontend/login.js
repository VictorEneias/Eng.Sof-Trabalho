import { api } from './api.js';
const e = React.createElement;

export default function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [registrar, setRegistrar] = React.useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (registrar) {
        await api('/usuarios/registrar', {
          method: 'POST',
          body: JSON.stringify({ nome, email, senha })
        });
      }
      const data = await api('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });
      onLogin(data.access_token);
    } catch (err) {
      setErro('Falha ao ' + (registrar ? 'registrar' : 'logar'));
    }
  }

  return e('form', { onSubmit: handleSubmit },
    e('h3', null, registrar ? 'Registrar' : 'Login'),
    erro ? e('div', { style: { color: 'red' } }, erro) : null,
    registrar && e('input', {
      placeholder: 'Nome',
      value: nome,
      onChange: e => setNome(e.target.value)
    }),
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
    e('button', { type: 'submit' }, registrar ? 'Registrar' : 'Entrar'),
    e('div', null,
      e('a', {
        href: '#',
        onClick: evt => {
          evt.preventDefault();
          setRegistrar(!registrar);
          setErro('');
        }
      }, registrar ? 'Já tenho conta' : 'Criar conta')
    )
  );
}
