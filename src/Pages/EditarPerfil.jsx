import { useState, useEffect } from 'react';
import './EditarPerfil.css';
import iconeEditar from '../assets/iconeEditar.png';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { formatarCEP, formatarTelefone, formatarTelefoneFixo } from '../utils/formatacoes';
import axios from 'axios';
import { api, apiAutenticacao } from '../provider/apiInstance';
import { exibirAviso, exibirAvisoTokenExpirado } from '../utils/exibirModalAviso'
import LoadingBar from 'react-top-loading-bar';
import { limparSession } from '../utils/limpar';
import { ToastContainer, toast } from 'react-toastify';
import { ROUTERS } from '../routers/routers';

import {  
    campoNaoAtendeTamanho, 
    campoVazio, 
    validarNome,
    validarTelefone, 
    validarTelefoneFixo,
    validarCEP,
    validarNumero,
    validarRazaoSocial,
    validarConfirmacaoSenha,
    validarEmail,
    validarSenha
} from '../utils/validarCampos';
import { tokenExpirou } from '../utils/token';
import { ENDPOINTS } from '../routers/endpoints';

function EditarPerfil() {

    const [usuario] = useState(JSON.parse(sessionStorage.DADOS_USUARIO));
    const [endereco] = useState(usuario.endereco);
    const [barraCarregamento, setBarraCarregamento] = useState(0);

    const [dadosBase, setDadosBase] = useState({
        endereco,   
        tipo: sessionStorage.CARGO === "ROLE_USUARIO_PF" ? "PF" : "PJ",
        nome: usuario.nome,
        telefone_celular: usuario.telefone_celular,
    })
    const [formularioCNPJ, setFormularioCNPJ] = useState({
        dadosBase,
        razao_social: usuario.razao_social,
        telefone_residencial: usuario.telefone_residencial
    });

    const [mostrarModalEmail, setMostrarModalEmail] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);
    const [mostrarModalAlterarSenha, setMostrarModalAlterarSenha] = useState(false);
    const [novoEmail, setNovoEmail] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    const navegar = useNavigate();

    const [desabilitar, setDesabilitar] = useState(false);
    useEffect(() => {

        const cep = dadosBase.endereco.cep.replace('-', '');
        if (cep.length == 8) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    if (res.data.erro !== "true") {
                        const caixote = res.data;

                        setDesabilitar(true);
                        setDadosBase((dados) => ({
                            ...dados,
                            endereco: {
                                ...dados.endereco,
                                logradouro: caixote.logradouro,
                                bairro: caixote.bairro,
                                cidade: caixote.localidade,
                                estado: caixote.uf
                            }
                        }))
                    }
                })
        } else {
            setDesabilitar(false)
        }
    }, [dadosBase.endereco.cep])

    const validarFormulario = () => {

        const corpoRequisicaoCNPJ = {
            ...dadosBase,
            ...formularioCNPJ
        }
        const formulario = dadosBase.tipo == "PF" ? dadosBase : corpoRequisicaoCNPJ;
        let houveErro = false;
        
        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar);
            houveErro = true;
        } else if(
            campoVazio(formulario.nome) || campoVazio(formulario.telefone_celular) || 
            campoVazio(formulario.endereco.logradouro) || campoVazio(formulario.endereco.bairro) || 
            campoVazio(formulario.endereco.cidade) || campoVazio(formulario.endereco.estado)|| 
            campoVazio(formulario.endereco.cep)
        ) {
            exibirAviso("Preencher todos os campos obrigatórios", 'error');
            houveErro = true;
        } else if(campoNaoAtendeTamanho(formulario.endereco.cep, 9)){
            exibirAviso("O campo CEP é inválido", 'error')
            houveErro = true;
        } else if(campoNaoAtendeTamanho(formulario.telefone_celular, 15)){
            exibirAviso("O campo Celular é inválido", 'error')
            houveErro = true;
        } else if (dadosBase.tipo == "PJ"){
            if(campoVazio(formulario.razao_social) || campoVazio(formulario.telefone_residencial)){
                exibirAviso("Preencher todos os campos obrigatórios", 'error')
                houveErro = true;
            } else if(campoNaoAtendeTamanho(formulario.telefone_residencial, 14)){
                exibirAviso("O campo Telefone é inválido", 'error')
                houveErro = true;
            }
        }

        if(!houveErro){
            editarPerfil(formulario);
        }
    }

    const editarPerfil = (formulario) => {

        setBarraCarregamento(30)
        api.put(ENDPOINTS.USUARIOID.replace(':id', sessionStorage.ID_USUARIO), formulario,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.TOKEN}`
            }
        }).then(() => {

            setBarraCarregamento(70);
            setTimeout(() => {
                setBarraCarregamento(100);
                toast.success("Perfil alterado com sucesso!");

                setTimeout(() => {
                    navegar(ROUTERS.PERFIL);
                }, 2000);
            }, 1000);
        }).catch((err) => {

            setBarraCarregamento(100);
            if(err.status == 401){
                exibirAvisoTokenExpirado();
            }
        })
    }

    const abrirModalEmail = () => {
        setMostrarModalEmail(true);
    }
      const fecharModalEmail = () => {
        setMostrarModalEmail(false);
        setNovoEmail('');
    }

    const continuarModalEmail = () => {
        if (!validarEmail(novoEmail).valido) {
            toast.error("Por favor, insira um e-mail válido");
            return;
        }
        if (tokenExpirou()) {
            exibirAvisoTokenExpirado(navegar);
            return;
        }
        if (novoEmail === usuario.email) {
            toast.error("O novo email deve ser diferente do atual");
            return;
        }

        setBarraCarregamento(20);
        apiAutenticacao.get(`${ENDPOINTS.EMAILVERIFICAR}?email=${novoEmail}`)
            .then((res) => {
                setBarraCarregamento(100);                
                if (res.data.disponivel) {
                    setMostrarModalEmail(false);
                    setMostrarModalConfirmacao(true);
                } 
            })
            .catch((err) => {
                setBarraCarregamento(100);
                if (err.status === 401) {
                    exibirAvisoTokenExpirado(navegar);
                } else if (err.status === 409) {
                    toast.error("Este email já está sendo usado por outra conta");
                }else {
                    toast.error("Erro ao verificar disponibilidade do email. Tente novamente.");
                }
            });
    }
      const finalizarAlteracaoEmail = () => {
        if (!senhaConfirmacao) {
            toast.error("Digite sua senha para confirmar a alteração");
            return;
        }

        if (tokenExpirou()) {
            exibirAvisoTokenExpirado(navegar);
            return;
        }

        setBarraCarregamento(30);
        
        apiAutenticacao.patch(ENDPOINTS.CREDENCIAISEMAIL, {
            senha: senhaConfirmacao,
            novoEmail: novoEmail
        }).then(() => {
            setBarraCarregamento(70);
            setTimeout(() => {
                setBarraCarregamento(100);
                setMostrarModalConfirmacao(false);
                toast.success("Email alterado com sucesso!");
                
                setTimeout(() => {
                    limparSession();
                    navegar(ROUTERS.LOGIN);
                }, 2000);
            }, 1000);
        }).catch((err) => {
            setBarraCarregamento(100);
            
            if (err.status === 401) {
                   if(err.response.data.error === "Credenciais incorretas"){
                    toast.error("Credenciais incorretas")
                }else {
                    exibirAvisoTokenExpirado(navegar);
                }
            } else if (err.status === 400) {
                const dataErro = err.response.data;
                if (dataErro.validationErrors != null) {
                    toast.error(dataErro.validationErrors[0].message);
                } else {
                    toast.error(dataErro.error || "Erro ao alterar email");
                }
            } else if (err.status === 409) {
                    toast.error("Email já está em uso.");
            } else {
                toast.error("Erro interno do servidor. Tente novamente mais tarde.");
            }
        });
    }

    const fecharModalConfirmacao = () => {
        setMostrarModalConfirmacao(false);
        setSenhaConfirmacao('');
    }

    const abrirModalAlterarSenha = () => {
        setMostrarModalAlterarSenha(true);
    }
    
    const fecharModalAlterarSenha = () => {
        setMostrarModalAlterarSenha(false);
        setSenhaAtual('');
        setNovaSenha('');        setConfirmarNovaSenha('');
    }

    const confirmarAlteracaoSenha = () => {
        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            toast.error("Preencha todos os campos obrigatórios");
            return;
        }

        const senhaValida = validarSenha(novaSenha);
        if (!senhaValida.valido) {
            toast.error(senhaValida.mensagem);
            return;
        }

        const confirmacaoValida = validarConfirmacaoSenha(confirmarNovaSenha, novaSenha);
        if (!confirmacaoValida.valido) {
            toast.error(confirmacaoValida.mensagem);
            return;
        }

        if (tokenExpirou()) {
            exibirAvisoTokenExpirado(navegar);
            return;
        }

        setBarraCarregamento(30);

        apiAutenticacao.patch(ENDPOINTS.CREDENCIAISSENHA, {
            senhaAtual: senhaAtual,
            novaSenha: novaSenha
        }).then(() => {
            setBarraCarregamento(70);
            setTimeout(() => {
                setBarraCarregamento(100);
                toast.success("Senha alterada com sucesso!");
                fecharModalAlterarSenha();
                
                setTimeout(() => {
                    limparSession();
                    navegar(ROUTERS.LOGIN);
                }, 2000);
            }, 1000);
        }).catch((err) => {
            setBarraCarregamento(100);
            
            if (err.status === 401) {
                if(err.response.data.error === "Credenciais incorretas"){
                    toast.error("Credenciais incorretas")
                }else {
                    exibirAvisoTokenExpirado(navegar);
                }
            } else if (err.status === 400) {
                const dataErro = err.response.data;
                if (dataErro.validationErrors != null) {
                    toast.error(dataErro.validationErrors[0].message);
                } else {
                    toast.error(dataErro.error || "Erro ao alterar senha");
                }
            } else {
                toast.error("Erro interno do servidor. Tente novamente mais tarde.");
            }
        });
    }
    return (
        <div className="editar-conta">
            <LoadingBar progress={barraCarregamento} height={3} color="#f11946" />

            {!mostrarModalEmail && !mostrarModalConfirmacao && !mostrarModalAlterarSenha && (
                <div className="container-formulario">

                    <section className="container-titulo">
                        <h2>Editar conta</h2>
                        <div className="barra"></div>
                    </section>

                    <section className="container-dados-pessoais">
                        {sessionStorage.CARGO === "ROLE_USUARIO_PF" ? (
                            <>
                                <h3>Dados pessoais</h3>
                                <section>
                                    <Input
                                        label={"* Nome Completo:"}
                                        placeholder={"Nome completo"}
                                        valor={dadosBase.nome}
                                        maxLength={60}
                                        validacao={validarNome}
                                        onChange={(e) => {
                                            setDadosBase((dados) => ({
                                                ...dados,
                                                nome: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>
                                    <Input
                                        label={"* Celular:"}
                                        placeholder={"Ex: (11) 98754-8798"}
                                        valor={dadosBase.telefone_celular}
                                        maxLength={15}
                                        validacao={validarTelefone}
                                        onChange={(e) => {
                                            setDadosBase((dados) => ({
                                                ...dados,
                                                telefone_celular: formatarTelefone(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                            </>
                        ) : (
                            <>
                                <h3>Dados da empresa</h3>
                                <section>
                                    <Input
                                        label={"* Nome Fantasia:"}
                                        placeholder={"Nome fantasia"}
                                        valor={dadosBase.nome}
                                        maxLength={60}
                                        validacao={validarNome}
                                        onChange={(e) => {
                                            setDadosBase((dados) => ({
                                                ...dados,
                                                nome: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>
                                    <Input
                                        label={"* Razão Social:"}
                                        placeholder={"Razão social"}
                                        valor={formularioCNPJ.razao_social}
                                        maxLength={60}
                                        validacao={validarRazaoSocial}
                                        onChange={(e) => {
                                            setFormularioCNPJ((dados) => ({
                                                ...dados,
                                                razao_social: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>
                                    <Input
                                        label={"* Celular:"}
                                        placeholder={"Ex: (99) 99999-9999"}
                                        valor={dadosBase.telefone_celular}
                                        maxLength={15}
                                        validacao={validarTelefone}
                                        onChange={(e) => {
                                            setDadosBase((dados) => ({
                                                ...dados,
                                                telefone_celular: formatarTelefone(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                                <section>
                                    <Input
                                        label={"* Telefone:"}
                                        placeholder={"Ex: (99) 99999-9999"}
                                        valor={formularioCNPJ.telefone_residencial}
                                        maxLength={14}
                                        validacao={validarTelefoneFixo}
                                        onChange={(e) => {
                                            setFormularioCNPJ((dados) => ({
                                                ...dados,
                                                telefone_residencial: formatarTelefoneFixo(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                            </>
                        )}
                        <section>
                            <Input
                                label={"Email:"}
                                placeholder={"email@email.com"}
                                valor={usuario.email}
                                desabilitar={true}
                            />
                            <img src={iconeEditar} alt="icone editar" height="30em" onClick={abrirModalEmail} />
                        </section>
                        <button className="botao-alterar-senha" onClick={abrirModalAlterarSenha}>Alterar Senha</button>
                    </section>

                    {/* Region Endereço */}
                    <section className="container-dados-endereco">
                        <h3>Endereço</h3>
                        <section>
                            <Input 
                                label={"* CEP:"} 
                                valor={formatarCEP(dadosBase.endereco.cep)} 
                                maxLength={9}
                                placeholder={"Ex: 01234-789"}
                                validacao={validarCEP}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            cep: formatarCEP(e.target.value)
                                        }
                                    }))
                                }}/>
                        </section>
                        <section>
                            <Input
                                label={"* Rua:"}
                                valor={dadosBase.endereco.logradouro}
                                placeholder={"Ex.: Rua são joaquim"}
                                desabilitar={desabilitar}
                                tipo={"text"}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            logradouro: e.target.value
                                        }
                                    }))
                                }}
                            />
                        </section>
                        <section>
                            <Input
                                label={"* Número:"}
                                valor={dadosBase.endereco.numero}
                                validacao={validarNumero}
                                placeholder={"Ex.: 1234"}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            numero: e.target.value
                                        }
                                    }))
                                }}
                            />
                        </section>
                        <section>
                            <Input
                                label={"* Bairro:"}
                                valor={dadosBase.endereco.bairro}
                                placeholder={"Ex.: Centro"}
                                tipo={"text"}
                                desabilitar={desabilitar}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            bairro: e.target.value
                                        }
                                    }))
                                }}
                            />
                        </section>
                        <section className="box-cidade">
                            <div className="box">
                                <Input
                                    label={"* Cidade:"}
                                    valor={dadosBase.endereco.cidade}
                                    placeholder={"Ex.: São Paulo"}
                                    desabilitar={desabilitar}
                                    tipo={"text"}
                                    onChange={(e) => {
                                        setDadosBase((dados) => ({
                                            ...dados,
                                            endereco: {
                                                ...dados.endereco,
                                                cidade: e.target.value
                                            }
                                        }))
                                    }}
                                />
                            </div>
                            <Input
                                label={"* Estado:"}
                                valor={dadosBase.endereco.estado}
                                placeholder={"Ex.: SP"}
                                desabilitar={desabilitar}
                                tipo={"text"}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            estado: e.target.value
                                        }
                                    }))
                                }}
                            />
                        </section>
                        <section>
                            <Input
                                label={"Complemento:"}
                                valor={dadosBase.endereco.complemento}
                                placeholder={"Ex.: Próximo do metrô"}
                                tipo={"text"}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            complemento: e.target.value
                                        }
                                    }))
                                }}
                            />
                        </section>
                    </section>
                    <section className="container-eventos">
                        <a className='botao-cancelar-edicao' onClick={() => { navegar("/perfil")}}>Cancelar</a>
                        <button className='botao-confirmar-edicao' onClick={validarFormulario}>Confirmar</button>
                    </section>
                </div>
            )}            {mostrarModalEmail && (
                <div className="modal-content">
                    <h1>Preencha o novo e-mail</h1>
                    <Input 
                        tipo={"text"} 
                        label={"* E-mail:"} 
                        placeholder={"Ex.: email@email.com"} 
                        valor={novoEmail}
                        validacao={validarEmail}
                        onChange={(e) => setNovoEmail(e.target.value)}
                    />
                    <div className="botoes">
                        <button className="botao-cancelar" onClick={fecharModalEmail}>Cancelar</button>
                        <button className="botao-continuar" onClick={continuarModalEmail}>Continuar</button>
                    </div>
                </div>
            )}            {mostrarModalConfirmacao && (
                <div className="modal-content">
                    <h1 className="confirmar-alteracao-email">Deseja confirmar as alterações?</h1>
                    <p>Preencha a senha para continuar</p>
                    <Input 
                        tipo={"password"} 
                        placeholder={"Senha"} 
                        valor={senhaConfirmacao}
                        onChange={(e) => setSenhaConfirmacao(e.target.value)}
                    />                    <div className="botoes">
                        <button className="botao-cancelar" onClick={fecharModalConfirmacao}>Cancelar</button>
                        <button className="botao-confirmar" onClick={finalizarAlteracaoEmail}>Confirmar</button>
                    </div>
                </div>
            )}            {mostrarModalAlterarSenha && (
                <div className="modal-content">
                    <h1 className='input-alteracao-senha'>Alterar senha</h1>
                    <Input 
                        tipo={"password"} 
                        label={"* Senha atual:"} 
                        placeholder="Senha atual" 
                        valor={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                    <Input 
                        tipo={"password"} 
                        label={"* Nova senha:"} 
                        placeholder={"Nova senha"} 
                        valor={novaSenha}
                        validacao={validarSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />
                    <Input 
                        tipo={"password"} 
                        label={"* Confirmar nova senha:"} 
                        placeholder={"Confirmar nova senha"} 
                        valor={confirmarNovaSenha}
                        validacao={validarConfirmacaoSenha}
                        valorAdicional={novaSenha}
                        onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                    />
                    <div className="botoes-e-aviso-etapa-3">
                        <div className="botoes">
                            <button className="botao-cancelar" onClick={fecharModalAlterarSenha}>Cancelar</button>
                            <button className="botao-confirmar" onClick={confirmarAlteracaoSenha}>C onfirmar</button>
                        </div>
                        <span className="aviso-obrigatorio-etapa-3">* Preenchimento obrigatório</span>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export { EditarPerfil };
