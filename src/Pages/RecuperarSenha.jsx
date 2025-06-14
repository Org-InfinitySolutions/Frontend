import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAutenticacao } from '../provider/apiInstance';
import { exibirAviso } from '../Utils/exibirModalAviso';
import { campoVazio, emailInvalido } from '../Utils/validarCampos';

import './RecuperarSenha.css';
import { Input } from '../components/Input';
import { ConfirmacaoEmail } from '../components/ConfirmacaoEmail';

export function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [etapa, setEtapa] = useState(1);

  const enviarCodigo = async (e) => {
    e.preventDefault();

  };

  const confirmarCodigo = (codigo) => {
    console.log('Código informado:', codigo);
  };



  if (etapa === 1) {
  return (
    <section className="container-recuperar-senha">
      <form onSubmit={enviarCodigo} className="formulario-recuperar-senha">
        <h1>Esqueci minha senha</h1>
        <div className="barra-divisoria"></div>

        <p className="texto-informativo-senha">
          Informe o email associado à conta que você deseja alterar a senha.
        </p>

        <section className="entrada-recuperar-senha">
          <label htmlFor="email">* E-mail:</label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-recuperar"
          />
        </section>

        <div className="botoes-recuperar-senha">
          <button type="button" className="botao-voltar-recuperar" onClick={() => navigate('/')}>
            Voltar
          </button>
          <button type="submit" onClick={() => setEtapa(2)} className="botao-enviar-recuperar">
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}

  if (etapa === 2) {
    return (
      <ConfirmacaoEmail
        onSubmit={confirmarCodigo}
        setEtapa={() => setEtapa(1)}
        etapa={1}
      />
    );
  }
}
