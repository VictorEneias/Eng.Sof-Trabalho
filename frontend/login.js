import { api } from './api.js?v=2';
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


  return e('div', { className: 'login-container' },
    e('div', { className: 'login-card' },
      e('div', { className: 'logo' },
        e('h1', null, 'Sistema de Gestão de Feiras')
      ),
      
      e('div', { className: 'auth-tabs' },
        e('button', {
          className: `tab-btn ${!registrar ? 'active' : ''}`,
          onClick: () => {
            setRegistrar(false);
            setErro('');
          }
        }, 'Entrar'),
        e('button', {
          className: `tab-btn ${registrar ? 'active' : ''}`,
          onClick: () => {
            setRegistrar(true);
            setErro('');
          }
        }, 'Registrar')
      ),
      
      e('form', { 
        className: `auth-form ${registrar ? 'hidden' : ''}`,
        onSubmit: handleSubmit 
      },
        e('div', { className: 'form-group' },
          e('input', {
            type: 'email',
            className: 'form-control',
            placeholder: 'Email',
            value: email,
            onChange: e => setEmail(e.target.value),
            required: true
          })
        ),
        e('div', { className: 'form-group' },
          e('input', {
            type: 'password',
            className: 'form-control',
            placeholder: 'Senha',
            value: senha,
            onChange: e => setSenha(e.target.value),
            required: true
          })
        ),
        e('button', { 
          type: 'submit', 
          className: 'btn btn-primary btn-full' 
        }, 'Entrar')
      ),
      
      e('form', { 
        className: `auth-form ${!registrar ? 'hidden' : ''}`,
        onSubmit: handleSubmit 
      },
        e('div', { className: 'form-group' },
          e('input', {
            type: 'text',
            className: 'form-control',
            placeholder: 'Nome completo',
            value: nome,
            onChange: e => setNome(e.target.value),
            required: true
          })
        ),
        e('div', { className: 'form-group' },
          e('input', {
            type: 'email',
            className: 'form-control',
            placeholder: 'Email',
            value: email,
            onChange: e => setEmail(e.target.value),
            required: true
          })
        ),
        e('div', { className: 'form-group' },
          e('input', {
            type: 'password',
            className: 'form-control',
            placeholder: 'Senha',
            value: senha,
            onChange: e => setSenha(e.target.value),
            required: true
          })
        ),
        e('button', { 
          type: 'submit', 
          className: 'btn btn-primary btn-full' 
        }, 'Registrar')
      ),
      
      erro ? e('div', { className: 'error-message' }, erro) : null
    )
  );
}