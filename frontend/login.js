import { api } from './api.js';
const e = React.createElement;

export default function Login({ onLogin, onCancel }) {
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
      await api('/usuarios/registrar', {
        method: 'POST',
        body: JSON.stringify(payloadRegistro)
      });
    }

    const res = await api('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(payloadLogin)
    });
    onLogin(res.access_token);

  } catch (err) {
    console.error(err);
    setErro("Falha ao " + (registrar ? "registrar" : "logar"));
  }
}


  return e('div', null,
    erro && e('div', { className: 'alert alert-error' }, erro),
    
    e('form', { onSubmit: handleSubmit },
      registrar && e('div', { className: 'form-group' },
        e('label', { className: 'form-label' }, 'Nome Completo'),
        e('input', {
          className: 'form-input',
          placeholder: 'Digite seu nome completo',
          value: nome,
          onChange: e => setNome(e.target.value),
          required: true
        })
      ),
      
      e('div', { className: 'form-group' },
        e('label', { className: 'form-label' }, 'Email'),
        e('input', {
          className: 'form-input',
          type: 'email',
          placeholder: 'Digite seu email',
          value: email,
          onChange: e => setEmail(e.target.value),
          required: true
        })
      ),
      
      e('div', { className: 'form-group' },
        e('label', { className: 'form-label' }, 'Senha'),
        e('input', {
          className: 'form-input',
          type: 'password',
          placeholder: 'Digite sua senha',
          value: senha,
          onChange: e => setSenha(e.target.value),
          required: true
        })
      ),
      
      e('div', { className: 'form-actions' },
        e('button', { 
          type: 'submit',
          className: 'btn btn-primary'
        }, registrar ? 'Criar Conta' : 'Entrar')
      )
    ),
    
    e('div', { className: 'text-center mt-4' },
      e('a', {
        href: '#',
        onClick: evt => {
          evt.preventDefault();
          setRegistrar(!registrar);
          setErro('');
        }
      }, registrar ? 'Já tenho uma conta' : 'Criar nova conta')
    )
  );
}
