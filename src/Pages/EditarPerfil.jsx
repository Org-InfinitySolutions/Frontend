import { useState, useEffect } from 'react';
import './EditarPerfil.css';
import iconeEditar from '../assets/iconeEditar.png';
import iconePesquisar from '../assets/iconePesquisar.png';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { formatarCEP, formatarTelefone, formatarTelefoneFixo } from '../Utils/formatacoes';
import axios from 'axios';
import { api } from '../provider/apiInstance';
import { campoNaoAtendeTamanho, campoVazio } from '../utils/validarCampos';
import { exibirAviso, exibirAvisoTokenExpirado, exibirAvisoTimer } from '../Utils/exibirModalAviso' 
import LoadingBar from 'react-top-loading-bar';

function EditarPerfil() {

    const [usuario, setUsuario] = useState(JSON.parse(sessionStorage.DADOS_USUARIO));
    const [endereco, setEndereco] = useState(usuario.endereco);
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

        if(
            campoVazio(formulario.nome) || campoVazio(formulario.telefone_celular) || 
            campoVazio(formulario.endereco.logradouro) || campoVazio(formulario.endereco.bairro) || 
            campoVazio(formulario.endereco.cidade) || campoVazio(formulario.endereco.estado)|| 
            campoVazio(formulario.endereco.cep)
        ) {
            exibirAviso("Preencher todos os campos obrigatórios", 'error');
        }
        if (dadosBase.tipo == "PJ"){
            
            if(campoVazio(formulario.razao_social) || campoVazio(formulario.telefone_residencial)){
                exibirAviso("Preencher todos os campos obrigatórios", 'error')
            } else if(campoNaoAtendeTamanho(formulario.telefone_residencial, 14)){
                exibirAviso("O campo Telefone é inválido", 'error')
            }
        } 
        if(campoNaoAtendeTamanho(formulario.endereco.cep, 8)){
            exibirAviso("O campo CEP é inválido", 'error')
        } 
        if(campoNaoAtendeTamanho(formulario.telefone_celular, 15)){
            exibirAviso("O campo Celular é inválido", 'error')
        } else{
            editarPerfil(formulario);
        }
    }

    const editarPerfil = (formulario) => {

        setBarraCarregamento(30)
        api.put(`/usuarios/${sessionStorage.ID_USUARIO}`, formulario,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.TOKEN}`
            }
        }
        ).then(() => {

            /* atualiza os dados retornados, evitando uma nova consulta na API quando o usuario voltar para tela perfil*/
            const dadosEspeciais = dadosBase.tipo == "PF" ? {
                cpf: usuario.cpf,
                rg: usuario.rg
            } : {
                cnpj: usuario.cnpj,
            }
            sessionStorage.DADOS_USUARIO = JSON.stringify({
                ...formulario,
                ...dadosEspeciais,
                data_criacao: usuario.data_criacao,
                data_atualizacao: usuario.data_atualizacao,
                email: usuario.email
            });

            setBarraCarregamento(70);
            setTimeout(() => {
                setBarraCarregamento(100);
                exibirAvisoTimer("Operação realizado com sucesso!", 'success');
            }, 1000);

            setTimeout(() => {
                navegar('/perfil');
            }, 3500);
        }).catch((err) => {

            setBarraCarregamento(100);
            if(err.status == 401){
                exibirAvisoTokenExpirado();
            }
            console.log(err);
        })
    }

    const abrirModalEmail = () => {
        setMostrarModalEmail(true);
    }

    const fecharModalEmail = () => {
        setMostrarModalEmail(false);
    }

    const continuarModalEmail = () => {
        setMostrarModalEmail(false); 
        setMostrarModalConfirmacao(true); 
    }

    const fecharModalConfirmacao = () => {
        setMostrarModalConfirmacao(false);
    }

    const abrirModalAlterarSenha = () => {
        setMostrarModalAlterarSenha(true);
    }
    
    const fecharModalAlterarSenha = () => {
        setMostrarModalAlterarSenha(false);
    }
    return (
    <div className="container">
        <LoadingBar
            progress={barraCarregamento}
            height={3}
            color="#f11946"
        />
        {!mostrarModalEmail && !mostrarModalConfirmacao && !mostrarModalAlterarSenha && (
            <div className="container-formulario">
                
                <section className="container-titulo">
                    <h2>Editar conta</h2>
                    <div className="barra"></div>
                </section>

                {sessionStorage.CARGO === "ROLE_USUARIO_PF" ? (
                    <section className="container-dados-pessoais">
                        <h3>Dados pessoais:</h3>
                        
                        <section>
                            <label>Nome Completo:</label>
                            <input type="text" placeholder='Nome completo' defaultValue={usuario.nome} 
                            onChange={(e) => {
                                setDadosBase((dados) => ({
                                    ...dados,
                                    nome: e.target.value
                                }))
                            }}/>
                        </section>
                        <section>
                            <label>Celular:</label>
                            <input type="text" placeholder='Ex: (11) 98754-8798' value={dadosBase.telefone_celular} 
                            onChange={(e) => (
                                setDadosBase((dados) => ({
                                    ...dados,
                                    telefone_celular: formatarTelefone(e.target.value)
                                }))
                            )}/>
                        </section>
                        <section>
                            <label>Email:</label>
                            <div>
                                <input type="text" placeholder='email@email.com' defaultValue={usuario.email} disabled/>
                                <img src={iconeEditar} alt="icone editar" height="23em" onClick={abrirModalEmail} />
                            </div>
                        </section>
                        <button onClick={abrirModalAlterarSenha}>Alterar Senha</button>
                    </section>
                ) : (
                    <section className="container-dados-pessoais">
                        <h3>Dados da empresa:</h3>
                        <section>
                            <label>Nome Fantasia:</label>
                            <input type="text" placeholder='Nome fantasia' defaultValue={usuario.nome} 
                            onChange={(e) => (
                                setDadosBase((dados) => ({
                                    ...dados,
                                    nome: e.target.value
                                }))
                            )}/>
                        </section>
                        <section>
                            <label>Razão Social:</label>
                            <input type="text" placeholder='Razão social' defaultValue={formularioCNPJ.razao_social} 
                            onChange={(e) => (
                                setFormularioCNPJ((dados) => ({
                                    ...dados,
                                    razao_social: e.target.value
                                }))
                            )}/>
                        </section>
                        <section>
                            <label>Celular:</label>
                            <input type="text" maxLength={15} placeholder='Ex: (99) 99999-9999' value={dadosBase.telefone_celular} 
                            onChange={(e) => (
                                setDadosBase((dados) => ({
                                    ...dados,
                                    telefone_celular: formatarTelefone(e.target.value)
                                }))
                            )}/>
                        </section>
                        <section>
                            <label>Telefone:</label>
                            <input type="text" maxLength={14} placeholder='Ex: (99) 9999-9999' value={formularioCNPJ.telefone_residencial}
                            onChange={(e) => (
                                setFormularioCNPJ((dados) => ({
                                    ...dados,
                                    telefone_residencial: formatarTelefoneFixo(e.target.value)
                                }))
                            )}/>
                        </section>
                        <section>
                            <label>Email:</label>
                            <div>
                                <input type="text" placeholder='email@email.com' disabled defaultValue={usuario.email}/>
                                <img src={iconeEditar} className='botao-editar' alt="icone editar" height="23em" onClick={abrirModalEmail} />
                            </div>
                        </section>
                        <button onClick={abrirModalAlterarSenha}>Alterar Senha</button>
                    </section>
                )}

                {/* Region Endereço */}
                <section className="container-dados-endereco">
                    <h3>Endereço:</h3>
                    <section>
                        <label>CEP:</label>
                        <div className='box-cep'>
                            <img src={iconePesquisar} alt="" height="20em" />
                            <input 
                                type="text" 
                                placeholder='12345-258' 
                                className='input-cep' 
                                maxLength={9}
                                value={formatarCEP(dadosBase.endereco.cep)} 
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        endereco: {
                                            ...dados.endereco,
                                            cep: formatarCEP(e.target.value)
                                        }
                                    }))
                                }}/>
                        </div>
                    </section>
                    <section>
                        <label>Rua:</label>
                        <input type="text" placeholder='Ex.: Rua são joaquim' value={dadosBase.endereco.logradouro} disabled={desabilitar}
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                endereco: {
                                    ...dados.endereco,
                                    logradouro: e.target.value
                                }
                            }))
                        }}/>
                    </section>
                    <section>
                        <label>Número:</label>
                        <input type="text" placeholder='Ex.: 123' defaultValue={endereco.numero} 
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                endereco: {
                                    ...dados.endereco,
                                    numero: e.target.value
                                }
                            }))
                        }}/>
                    </section>
                    <section>
                        <label>Bairro:</label>
                        <input type="text" placeholder='Ex.: Centro' value={dadosBase.endereco.bairro} disabled={desabilitar}
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                endereco: {
                                    ...dados.endereco,
                                    bairro: e.target.value
                                }
                            }))
                        }}/>
                    </section>
                    <section>
                        <div className='box-cidade'>
                            <label>Cidade:</label>
                            <input type="text" placeholder='São Paulo' value={dadosBase.endereco.cidade} disabled={desabilitar}
                            onChange={(e) => {
                                setDadosBase((dados) => ({
                                    ...dados,
                                    endereco: {
                                        ...dados.endereco,
                                        cidade: e.target.value
                                    }
                                }))
                            }}/>
                        </div>
                        <div className='box-estado'>
                            <label>Estado:</label>
                            <input type="text" maxLength={2} placeholder='SP' value={dadosBase.endereco.estado} disabled={desabilitar}
                            onChange={(e) => {
                                setDadosBase((dados) => ({
                                    ...dados,
                                    endereco: {
                                        ...dados.endereco,
                                        estado: e.target.value
                                    }
                                }))
                            }}/>
                        </div>
                    </section>
                    <section>
                        <label>Complemento:</label>
                        <input type="text" placeholder='Complemento' defaultValue={endereco.complemento}
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                endereco: {
                                    ...dados.endereco,
                                    complemento: e.target.value
                                }
                            }))
                        }}/>
                    </section>
                </section>

                <section className="container-eventos">
                    <a onClick={() => { navegar("/perfil")}}>Cancelar</a>
                    <button onClick={validarFormulario}>Confirmar</button>
                </section>
            </div>
        )}

    
        {mostrarModalEmail && (
            <div className="modal-content">
                <h1>Preencha o novo e-mail</h1>
                <Input type="text" placeholder="E-mail" />
                <div className="botoes">
                    <button className="botao-cancelar" onClick={fecharModalEmail}>Cancelar</button>
                    <button className="botao-continuar" onClick={continuarModalEmail}>Continuar</button>
                </div>
            </div>
        )}
        
        {mostrarModalConfirmacao && (
            <div className="modal-content">
                <h1 className='confirmar-alteracao-email'>Deseja confirmar as alterações?</h1>
                <p>Preencha a senha para continuar</p>
                <Input type="text" placeholder="Senha" />
                <div className="botoes">
                    <button className="botao-confirmar" onClick={fecharModalConfirmacao}>Confirmar</button>
                </div>
            </div>
        )}

        {mostrarModalAlterarSenha && (
        <div className="modal-content">
            <h1>Alterar senha</h1>
            <p className= "input-alteracao-senha">* Senha atual:</p> 
            <Input type="text" placeholder="Senha atual" />
            <p className= "input-alteracao-senha">* Nova senha:</p>
            <Input type="text" placeholder="Nova senha" />
            <p className= "input-alteracao-senha">* Confirmar nova senha:</p>
            <Input type="text" placeholder="Confirmar nova senha" />
            <div className="botoes-e-aviso-etapa-3">
            <div className="botoes">
                <button className="botao-cancelar" onClick={() => { navegar("/perfil") }}>Cancelar</button>
                <button className="botao-confirmar" onClick={() => { navegar("/perfil") }}>Confirmar</button>
            </div>
            <p className="aviso-obrigatorio-etapa-3">* Preenchimento obrigatório</p>
            </div>
        </div>
        )}
    </div>
    );
}

export { EditarPerfil };
