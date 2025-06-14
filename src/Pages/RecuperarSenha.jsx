import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAutenticacao } from '../provider/apiInstance';
import { exibirAviso } from '../Utils/exibirModalAviso';
import { campoVazio, emailInvalido } from '../Utils/validarCampos';
import './RecuperarSenha.css';
import { Input } from '../components/Input';

export function RecuperarSenha() {
    const navigate = useNavigate();
    const [etapa, setEtapa] = useState(1);

    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState(Array(6).fill(''));
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const inputRefs = useRef([]);

    const handleCodigoChange = (e, index) => {
        const valor = e.target.value.toUpperCase();

        if (/^[A-Z0-9]?$/.test(valor)) {
            const novoCodigo = [...codigo];
            novoCodigo[index] = valor;
            setCodigo(novoCodigo);

            if (valor && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const enviarCodigo = async (e) => {
        e.preventDefault();

        if (campoVazio(email) || emailInvalido(email)) {
            exibirAviso("Por favor, preencha um e-mail válido.");
            return;
        }

        try {
            await apiAutenticacao.post('/reset-senha/solicitar', { email });
            localStorage.setItem('emailRecuperacao', email);
            exibirAviso("Código de confirmação enviado ao seu e-mail.");
            setEtapa(2);
        } catch (error) {
            console.error(error);
            exibirAviso("Erro ao solicitar o código.");
        }
    };

    const handleSubmitSenha = async () => {
        const emailRecuperado = localStorage.getItem('emailRecuperacao');
        const codigoFinal = codigo.join('');

        if (!emailRecuperado) {
            exibirAviso('Erro', 'E-mail de recuperação não encontrado.');
            return;
        }

        if (codigoFinal.length !== 6) {
            exibirAviso('Atenção', 'Preencha todos os 6 caracteres do código.');
            return;
        }

        if (!senha || !confirmarSenha) {
            exibirAviso('Atenção', 'Preencha os campos de senha.');
            return;
        }

        if (senha !== confirmarSenha) {
            exibirAviso('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            await apiAutenticacao.post('/reset-senha/confirmar', {
                email: emailRecuperado,
                codigo: codigoFinal,
                novaSenha: senha,
            });
            exibirAviso('Sucesso', 'Senha redefinida com sucesso.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            exibirAviso('Erro', error.response?.data?.mensagem || 'Falha ao redefinir senha.');
        }
    };

    if (etapa === 1) {
        return (
            <section className="container-recuperar-senha">
                <form onSubmit={enviarCodigo} className="formulario-recuperar-senha">
                    <h1>Esqueci minha senha</h1>
                    <div className="barra-divisoria"></div>

                    <p className="texto-informativo-senha">
                        Informe o e-mail associado à conta que você deseja alterar a senha.
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

    if (etapa === 2) {
        return (
            <div className='container-nova-senha'>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmitSenha(); }} className="formulario-nova-senha">
                    <h1>Confirmação de e-mail</h1>
                    <p className='font-medium'>Preencha abaixo o código de confirmação que enviamos ao seu e-mail.</p>
                    <div className='barra-divisoria'></div>

                    <div className="container-codigo-confirmacao">
                        {codigo.map((valor, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={valor}
                                onChange={(e) => handleCodigoChange(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="input-codigo"
                            />
                        ))}
                    </div>

                    <p className='font-semibold'>Informe a nova senha para sua conta.</p>

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
