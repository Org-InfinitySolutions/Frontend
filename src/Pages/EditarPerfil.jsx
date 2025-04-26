import { useState } from 'react';
import './EditarPerfil.css';
import iconeEditar from '../assets/iconeEditar.png';
import iconePesquisar from '../assets/iconePesquisar.png';
import { Input } from '../components/Input';

function EditarPerfil() {
    const [mostrarModalEmail, setMostrarModalEmail] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);
    const [mostrarModalAlterarSenha, setMostrarModalAlterarSenha] = useState(false);

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
            {!mostrarModalEmail && !mostrarModalConfirmacao &&  !mostrarModalAlterarSenha && (
                <div className="container-formulario">
                    
                    <section className="container-titulo">
                        <h2>Editar conta</h2>
                        <div className="barra"></div>
                    </section>

                    {localStorage.TIPO_USUARIO === "PF" ? (
                        <section className="container-dados-pessoais">
                            <h3>Dados pessoais:</h3>
                            
                            <section>
                                <label>Nome Completo:</label>
                                <input type="text" placeholder='Nome completo' />
                            </section>
                            <section>
                                <label>Celular:</label>
                                <input type="text" placeholder='Ex: (11) 98754-8798' />
                            </section>
                            <section>
                                <label>Email:</label>
                                <div>
                                    <input type="text" placeholder='email@email.com' disabled />
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
                                <input type="text" placeholder='Nome fantasia' />
                            </section>
                            <section>
                                <label>Razão Social:</label>
                                <input type="text" placeholder='Razão social' />
                            </section>
                            <section>
                                <label>Celular:</label>
                                <input type="text" placeholder='Ex: (11) 98754-8798' />
                            </section>
                            <section>
                                <label>Telefone:</label>
                                <input type="text" placeholder='Ex: (11) 5887-8585' />
                            </section>
                            <section>
                                <label>Email:</label>
                                <div>
                                    <input type="text" placeholder='email@email.com' disabled />
                                    <img src={iconeEditar} className='botao-editar' alt="icone editar" height="23em" onClick={abrirModalEmail} />
                                </div>
                            </section>
                            <button onClick={abrirModalAlterarSenha}>Alterar Senha</button>
                        </section>
                    )}

                    <section className="container-dados-endereco">
                        <h3>Endereço:</h3>
                        <section>
                            <label>CEP:</label>
                            <div className='box-cep'>
                                <img src={iconePesquisar} alt="" height="20em" />
                                <input type="text" placeholder='12345-258' className='input-cep' />
                            </div>
                        </section>
                        <section>
                            <label>Rua:</label>
                            <input type="text" placeholder='Ex.: Rua são joaquim' />
                        </section>
                        <section>
                            <label>Número:</label>
                            <input type="text" placeholder='Ex.: 123' />
                        </section>
                        <section>
                            <label>Bairro:</label>
                            <input type="text" placeholder='Ex.: Centro' />
                        </section>
                        <section>
                            <div className='box-cidade'>
                                <label>Cidade:</label>
                                <input type="text" placeholder='São Paulo' />
                            </div>
                            <div className='box-estado'>
                                <label>Estado:</label>
                                <input type="text" placeholder='SP' />
                            </div>
                        </section>
                        <section>
                            <label>Complemento:</label>
                            <input type="text" placeholder='Complemento' />
                        </section>
                    </section>

                    <section className="container-eventos">
                        <a href='/perfil'>Cancelar</a>
                        <button>Confirmar</button>
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
                    <h3 className='confirmar-alteracao-email'>Deseja confirmar as alterações?</h3>
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
                <button className="botao-cancelar" >Cancelar</button>
                <button className="botao-confirmar" >Confirmar</button>
            </div>
                            <p className="aviso-obrigatorio-etapa-3">* Preenchimento obrigatório</p>
                        </div>
    </div>
)}
        </div>
    );
}

export { EditarPerfil };
