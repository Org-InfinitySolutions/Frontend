import { use, useState } from 'react';
import { Navegabilidade } from '../components/Navegabilidade';
import './FinalizarPedido.css';
import { useNavigate } from 'react-router-dom';
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho';

function FinalizarPedido() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false)

    const navegar = useNavigate();
    return (
        <div className="finalizar-pedido">
            {mostrarModal ? (
                <div className="modal-content">
                    <h2 className='titulo-finalizar-pedido'>Você deseja finalizar o pedido?</h2>
                    <p>Ao confirmar, o seu pedido será enviado à nossa equipe para análise. Você não poderá fazer nenhuma alteração nos equipamentos escolhidos. Deseja continuar?</p>
                    <div className="botoes-modal">
                        <button className='botao-voltar' onClick={() => setMostrarModal(false)}>Voltar</button>
                        <button className='botao-confirmar' onClick={() => {
                            setMostrarModal(false);
                            setMostrarModalConfirmacao(true);
                        }}>Confirmar</button>
                    </div>
                </div>
            ) : mostrarModalConfirmacao ? (
                <div className="modal-content-pedido-confirmado">
                    <h2 className='titulo-finalizar-pedido'>Seu pedido foi finalizado!</h2>
                    <h3 className='numero-serie-pedido'>Número do pedido #00001</h3>
                    <p className='aviso-pedido-confirmado'>Fique atento ao seu email e celular cadastrado, entraremos em contato em breve para mais detalhes.
                    Para visualizar o seu pedido clique no botão abaixo para ser redirecionado aos seus orçamentos.</p>
                    <div className="botoes-modal">
                        <button className='botao-confirmar' onClick={() => {
                            setMostrarModalConfirmacao(false);
                            navegar("/pedidos")
                        }}>
                            Orçamentos
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h1>Finalizar Pedido</h1>
                    <section className='container-equipamentos'>
                        {/* Exemplo de produto */}
                        <CardProdutoCarrinho apenasLeitura={true}/>
                    </section>

                    <section className='container-endereco'>
                        <h2>ENDEREÇO</h2>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>CEP:</label>
                                <input type="text" value="01235-789" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>RUA:</label>
                                <input type="text" value="Rua Boa vista" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>NÚMERO:</label>
                                <input type="text" value="1234" readOnly />
                            </div>
                        </section>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>BAIRRO:</label>
                                <input type="text" value="Taboão da Serra" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>CIDADE:</label>
                                <input type="text" value="São Paulo" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>ESTADO:</label>
                                <input type="text" value="SP" readOnly />
                            </div>
                        </section>
                        <section className='box-complemento'>
                            <label>COMPLEMENTO:</label>
                            <input type="text" value="Perto do metrô" readOnly />
                        </section>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>DATA E HORA ENTREGA:</label>
                                <input type="datetime-local" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>DATA E HORA RETIRADA:</label>
                                <input type="datetime-local" readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>TIPO DE EVENTO:</label>
                                <input type="text" value="Indoor" readOnly />
                            </div>
                        </section>
                    </section>

                    <section className='container-observacao'>
                        <label htmlFor="txt_observacao">Observação (opcional):</label>
                        <textarea id="txt_observacao" placeholder='Breve descrição do projeto...'></textarea>
                    </section>

                    <section className='container-documentos'>
                        <span>Se desejar, você pode anexar um documento que nos ajude a visualizar o seu projeto de forma mais clara, agilizando nossa análise e te oferecendo uma resposta o mais breve possível.</span>
                        <div className='box-documento'>
                            <span>DOCUMENTO DO PROJETO</span>
                            <label htmlFor="inp_documentoProjeto" className="custom-file-upload">
                                SUBIR ARQUIVO
                            </label>
                            <input id="inp_documentoProjeto" type="file" style={{ display: "none" }} />
                        </div>
                        {sessionStorage.DOCUMENTOS_FORNECIDOS !== "True" && (
                            <>
                                <span>Forneça os documentos abaixo para agilizar a geração de contrato. Não será necessário um segundo envio após o primeiro pedido.</span>
                                <div className='box-documento'>
                                    <span>* COMPROVANTE DE ENDEREÇO</span>
                                    <label htmlFor="inp_documentoEndereco" className="custom-file-upload">SUBIR ARQUIVO</label>
                                    <input id="inp_documentoEndereco" type="file" style={{ display: "none" }} />
                                </div>
                                {sessionStorage.TIPO_USUARIO === "PF" ? (
                                    <div className='box-documento'>
                                        <span>* CÓPIA DO RG</span>
                                        <label htmlFor="inp_documentoRg" className="custom-file-upload">SUBIR ARQUIVO</label>
                                        <input id="inp_documentoRg" type="file" style={{ display: "none" }} />
                                    </div>
                                ) : (
                                    <>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CARTÃO CNPJ</span>
                                            <label htmlFor="inp_documentoCartaoCnpj" className="custom-file-upload">SUBIR ARQUIVO</label>
                                            <input id="inp_documentoCartaoCnpj" type="file" style={{ display: "none" }} />
                                        </div>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CONTRATO SOCIAL</span>
                                            <label htmlFor="inp_documentoContratoSocial" className="custom-file-upload">SUBIR ARQUIVO</label>
                                            <input id="inp_documentoContratoSocial" type="file" style={{ display: "none" }} />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </section>

                    {localStorage.DOCUMENTOS_FORNECIDOS !== "True" && (
                        <div className='box-preenchimento-obrigatorio'>
                            <span>* Preenchimento obrigatório</span>
                        </div>
                    )}

                    <Navegabilidade
                        linkVoltar={"/carrinho/endereco"}
                        textoAvancar={"Finalizar"}
                        funcaoAvancar={() => setMostrarModal(true)}
                    />
                </>
            )}
        </div>
    );
}

export { FinalizarPedido };
