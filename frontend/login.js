import { api } from './api.js';
const e = React.createElement;

export default function Login({ onLogin, onCancel }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [erro, setErro] = React.useState('');
  const [registrar, setRegistrar] = React.useState(false);
  const [carregando, setCarregando] = React.useState(false);

async function handleSubmit(evt) {
  evt.preventDefault();
  setCarregando(true);
  setErro('');

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
    if (err.message && err.message.includes('Email já está em uso')) {
      setErro('Este email já está cadastrado. Tente fazer login ou use outro email.');
    } else if (err.message && err.message.includes('Credenciais inválidas')) {
      setErro('Email ou senha incorretos.');
    } else {
      setErro("Falha ao " + (registrar ? "registrar" : "fazer login"));
    }
  } finally {
    setCarregando(false);
  }
}

  return e('div', { className: 'login-container' },
    e('div', { className: 'login-card' },
      e('div', { className: 'login-header' },
        e('h2', { className: 'login-title' }, registrar ? 'Criar Conta' : 'Entrar'),
        e('p', { className: 'login-subtitle' }, 
          registrar 
            ? 'Crie sua conta para gerenciar feiras' 
            : 'Acesse sua conta para continuar'
        )
      ),

      erro && e('div', { className: 'alert alert-error' }, 
        erro,
        e('button', { 
          className: 'alert-close',
          onClick: () => setErro('')
        }, '×')
      ),
      
      e('form', { onSubmit: handleSubmit, className: 'login-form' },
        registrar && e('div', { className: 'form-group' },
          e('label', { className: 'form-label' }, 'Nome Completo'),
          e('input', {
            className: 'form-input',
            placeholder: 'Digite seu nome completo',
            value: nome,
            onChange: e => setNome(e.target.value),
            required: true,
            disabled: carregando
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
            required: true,
            disabled: carregando
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
            required: true,
            disabled: carregando
          })
        ),
        
        e('div', { className: 'form-actions' },
          e('button', { 
            type: 'submit',
            className: 'btn btn-primary btn-block',
            disabled: carregando
          }, carregando ? 'Aguarde...' : (registrar ? 'Criar Conta' : 'Entrar'))
        )
      ),
      
      e('div', { className: 'login-footer' },
        e('a', {
          href: '#',
          className: 'login-toggle',
          onClick: evt => {
            evt.preventDefault();
            setRegistrar(!registrar);
            setErro('');
          }
        }, registrar ? 'Já tenho uma conta' : 'Criar nova conta')
      )
    )
  );
}
