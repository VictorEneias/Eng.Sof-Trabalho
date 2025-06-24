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

  const payloadLogin = { email, senha };
  const payloadRegistro = { nome, email, senha };

  try {
    if (registrar) {
      const r = await fetch("http://localhost:8000/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadRegistro)
      });

      if (!r.ok) {
        throw new Error("Falha no registro");
      }
    }

    const res = await fetch("http://localhost:8000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadLogin)
    });

    if (!res.ok) {
      throw new Error("Falha no login");
    }

    const data = await res.json();
    onLogin(data.access_token);

  } catch (err) {
    console.error(err);
    setErro("Falha ao " + (registrar ? "registrar" : "logar"));
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