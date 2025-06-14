import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAutenticacao } from '../provider/apiInstance';
import { exibirAviso } from '../Utils/exibirModalAviso';
import { campoVazio, emailInvalido } from '../Utils/validarCampos';

import './RecuperarSenha.css';
import { Input } from '../components/Input';
import { ConfirmacaoEmail } from '../components/ConfirmacaoEmail';

export function RecuperarSenha() {
    const navigate = useNavigate();
    const [etapa, setEtapa] = useState(1);

    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Etapa 1: Enviar código
    const enviarCodigo = async (e) => {
        e.preventDefault();

        // Validação de campo vazio e e-mail inválido
        if (campoVazio(email) || emailInvalido(email)) {
            exibirAviso("Por favor, preencha um e-mail válido.");
            return;
        }
        try {
            await apiAutenticacao.post('/reset-senha/solicitar', { email });
            exibirAviso("Código de confirmação enviado ao seu e-mail.");
            setEtapa(2);
        } catch (error) {
            console.error(error);
            exibirAviso("Erro ao solicitar o código.");
        }
    };
    
    // Etapa 2: Confirmar código
    const confirmarCodigo = (codigoDigitado) => {
        setCodigo(codigoDigitado);
        console.log('Código informado:', codigoDigitado);
        setEtapa(3);
    };

    // Etapa 3: Salvar nova senha
    const handleSubmitSenha = () => {
        if (senha !== confirmarSenha) {
            exibirAviso("As senhas não coincidem.");
            return;
        }

        try {
            // Exemplo de chamada à API:
            // await apiAutenticacao.post('/redefinir-senha', { email, codigo, novaSenha: senha });

            console.log('Nova senha salva com sucesso:', senha);
            navigate('/login'); // Redireciona para login, por exemplo
        } catch (error) {
            console.error(error);
            exibirAviso("Erro ao redefinir a senha.");
        }
    };

    // ETAPA 1
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
                        <button type="submit" className="botao-enviar-recuperar">
                            Enviar
                        </button>
                    </div>
                </form>
            </section>
        );
    }

    // ETAPA 2
    if (etapa === 2) {
        return (
            <div className='bg-black p-32'>
                <ConfirmacaoEmail
                    onSubmit={confirmarCodigo}
                    setEtapa={() => setEtapa(1)}
                    etapa={1}
                />
            </div>
        );
    }

    // ETAPA 3
    if (etapa === 3) {
        return (
            <div className='bg-black p-12'>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmitSenha(); }} className="formulario-nova-senha">
                    <h1>Cadastro</h1>
                    <div className='barra-divisoria'></div>
                    <p className='from-neutral-400'>Informe a nova senha para sua conta.</p>

                    <Input
                        tipo="password"
                        id="novaSenha"
                        label="* Senha"
                        placeholder="Nova senha"
                        valor={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="input-recuperar"
                    />

                    <Input
                        tipo="password"
                        id="confirmarSenha"
                        label="* Confirmar Senha"
                        placeholder="Confirmar senha"
                        valor={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        className="input-recuperar"
                    />

                    <div className="container-botao-salvar-nova-senha">
                        <button type="submit" className="botao-salvar-nova-senha">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return null;
}
