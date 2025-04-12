import { useNavigate } from 'react-router-dom';

import './FinalizarPedido.css'

function FinalizarPedido(){

    const navigate = useNavigate();

    return(
    <div className="finalizar-pedido">
        <h1>Finalizar Pedido</h1>
        <section className='container-equipamentos'>
            <section className="box-produto">
                <img src="/logoNova.jpg" height="100%" alt="" />
                <div className="box-informacoes">
                    <div className="box-nome-equipamento">
                        <span>Nova Locações</span>
                    </div>
                    <div className="box-alterar-quantidade">
                        <span>Quantidade de equipamentos:</span>
                        <div>999</div>
                    </div>
                </div>
            </section>
            <section className="box-produto">
                <img src="/logoNova.jpg" height="100%" alt="" />
                <div className="box-informacoes">
                    <div className="box-nome-equipamento">
                        <span>Nova Locações</span>
                    </div>
                    <div className="box-alterar-quantidade">
                        <span>Quantidade de equipamentos:</span>
                        <div>999</div>
                    </div>
                </div>
            </section>
        </section>
        <section className='container-endereco'>
            <h2>ENDEREÇO</h2>
            <section className='box-informacoes'>
                <div>
                    <label htmlFor="">CEP:</label>
                    <input type="text" value="01235-789" readOnly/>
                </div>
                <div>
                    <label htmlFor="">RUA:</label>
                    <input type="text" value="Rua Boa vista" readOnly/>
                </div>
                <div>
                    <label htmlFor="">NÚMERO:</label>
                    <input type="text" value="1234" readOnly/>
                </div>
            </section>
            <section className='box-informacoes'>
                <div>
                    <label htmlFor="">BAIRRO:</label>
                    <input type="text" value="Taboão da Serra" readOnly/>
                </div>
                <div>
                    <label htmlFor="">CIDADE:</label>
                    <input type="text" value="São Paulo" readOnly/>
                </div>
                <div>
                    <label htmlFor="">ESTADO:</label>
                    <input type="text" value="SP" readOnly/>
                </div>
            </section>
            <section className='box-complemento'>
                <label htmlFor="">COMPLEMENTO:</label>
                <input type="text" value="Perto do mêtro" readOnly/>
            </section>
            <section className='box-informacoes'>
                <div>
                    <label htmlFor="">DATA E HORA ENTREGA:</label>
                    <input type="datetime-local" readOnly/>
                </div>
                <div>
                    <label htmlFor="">DATA E HORA RETIRADA:</label>
                    <input type="datetime-local" readOnly/>
                </div>
                <div>
                    <label htmlFor="">TIPO DE EVENTO:</label>
                    <input type="text" value="Indoor" readOnly/>
                </div>
            </section>
        </section>
        <section className='container-observacao'>
            <label htmlFor="txt_observacao">Observação (opcional):</label>
            <textarea id="txt_observacao" placeholder='Breve descrição do projeto...'></textarea>
        </section>
        <section className='container-documentos'>
            <span>Se desejar, você pode anexar um documento que nos ajude a visualizar o seu projeto de forma mais clara, agilizando nossa análise e te oferecendo uma resposta o mais breve possivel.</span>
            <div className='box-documento'>
                <span>DOCUMENTO DO PROJETO</span>
                <label htmlFor="inp_documentoProjeto" className="custom-file-upload">
                SUBIR ARQUIVO
                </label>
                <input id="inp_documentoProjeto" type="file" style={{ display: "none" }}/>
            </div>
            <span>Forneça os documentos abaixo para agilizar a geração de contrato. Não será necessário um segundo envio após o primeiro pedido.</span>
            <div className='box-documento'>
                <span>* COMPROVANTE ENDEREÇO</span>
                <label htmlFor="inp_documentoEndereco" className="custom-file-upload">SUBIR ARQUIVO</label>
                <input id="inp_documentoEndereco" type="file" style={{ display: "none" }}/>
            </div>
            {localStorage.TIPO_USUARIO == "PJ" ? (
            <>
                <div className='box-documento'>
                    <span>* CÓPIA DO RG</span>
                    <label htmlFor="inp_documentoRg" className="custom-file-upload">SUBIR ARQUIVO</label>
                    <input id="inp_documentoRg" type="file" style={{ display: "none" }}/>
                </div>
            </>
            ) : (
            <>
                <div className='box-documento'>
                    <span>* CÓPIA DO CARTÃO CNPJ</span>
                    <label htmlFor="inp_documentoCartaoCnpj" className="custom-file-upload">SUBIR ARQUIVO</label>
                    <input id="inp_documentoCartaoCnpj" type="file" style={{ display: "none" }}/>
                </div>
                <div className='box-documento'>
                    <span>* CÓPIA DO CONTRATO SOCIAL</span>
                    <label htmlFor="inp_documentoContratoSocial" className="custom-file-upload">SUBIR ARQUIVO</label>
                    <input id="inp_documentoContratoSocial" type="file" style={{ display: "none" }}/>
                </div>
            </>
            )}
        </section>
        <div className='box-preenchimento-obrigatorio'>
            <span >* Preenchimento obrigatório</span>
        </div>
        <section className='container-eventos'>
            <a href="/carrinho/endereco">Voltar</a>
            <button>Finalizar</button>
        </section>
    </div>
    )
}

export { FinalizarPedido }