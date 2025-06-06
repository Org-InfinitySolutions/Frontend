import { use, useEffect, useState } from 'react';
import { Navegabilidade } from '../components/Navegabilidade';
import './FinalizarPedido.css';
import { useNavigate } from 'react-router-dom';
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho';
import { formatarCEP, formatarIdPedido } from '../Utils/formatacoes'
import { api } from '../provider/apiInstance'
import { exibirAviso, exibirAvisoTimer, exibirAvisoTokenExpirado } from '../Utils/exibirModalAviso'
import { tokenExpirou } from '../Utils/token'
import LoadingBar from 'react-top-loading-bar';

function FinalizarPedido() {

    const navegar = useNavigate();
    const [barraCarregamento, setBarraCarregamento] = useState(0);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false)
    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.CARRINHO));
    const [cadastroCompleto, setCadastroCompleto] = useState(sessionStorage.CADASTRO_COMPLETO == "true");
    const [cargo, setCargo] = useState(sessionStorage.CARGO);
    const [usuarioLogado, setUsuarioLogado] = useState(sessionStorage.USUARIO_LOGADO == "True");

    const [numeroPedido, setNumeroPedido] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [documentoAuxiliar, setDocumentoAuxiliar] = useState('');
    const [documentoEndereco, setDocumentoEndereco] = useState('');
    const [documentoRG, setDocumentoRG] = useState('');
    const [documentoCNPJ, setDocumentoCNPJ] = useState('');
    const [documentoContratoSocial, setDocumentoContratoSocial] = useState('');

    const realizarPedido = async () => {

        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar);
        } else {

            setBarraCarregamento(10);
            const form = carrinho;
            form.produtos = form.produtos.map((i) => { return { produtoId: i.produtoId, quantidade: i.quantidade } });
            form.descricao = descricao;
    
            const formData = new FormData();
            formData.append('pedido', new Blob([JSON.stringify(form)], { type: 'application/json' }));
            formData.append('documento_auxiliar', documentoAuxiliar)

            setBarraCarregamento(30);
            
            setTimeout(() => {
                api.post('/pedidos', formData, {
                    headers: {
                        'Authorization': `bearer ${sessionStorage.TOKEN}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(async (res) => {

                    setBarraCarregamento(67);
                    await gerenciarUploads();

                    setBarraCarregamento(100);
                    const carrinho = { produtos: [] };
                    sessionStorage.CARRINHO = JSON.stringify(carrinho);

                    setNumeroPedido(formatarIdPedido(res.data.id));
                    setMostrarModal(false);
                    setMostrarModalConfirmacao(true);
                }).catch((err) => {
                    setBarraCarregamento(100);
                    if(err.status == 400){
                        exibirAviso(err.response.data.message, 'error')
                    } else if(err.status == 404){
                        exibirAviso(err.response.data.error, 'error')
                    }
                })
            }, 1000);
        }
    }

    const validarForm = () => {

        let houveErro = false;

        if(!documentoEndereco && !cadastroCompleto){
            exibirAviso("É obrigatório informar o comprovante de endereço", 'error');
            houveErro = true;
        }
        if(cargo === "ROLE_USUARIO_PF"){
            if(!documentoRG && !cadastroCompleto){
                exibirAviso("É obrigatório informar o documento de RG", 'error')
                houveErro = true;
            }
        } 
        if(cargo === "ROLE_USUARIO_PJ"){
            if((!documentoCNPJ || !documentoContratoSocial) && !cadastroCompleto){
                exibirAviso("Informe todos os documentos obrigatórios", 'error')
                houveErro = true;
            }
        }

        if(!usuarioLogado){
            exibirAvisoTimer('Faça login para finalizar o pedido.', 'info');
            setTimeout(() => { navegar('/login'); }, 3200);
            houveErro = true;
        }

        if(!houveErro){
            setMostrarModal(true);
        }
    }

    const [desativarBotao, setDesativarBotao] = useState(true);
    useEffect(() => {
        if(usuarioLogado) {
            if(cadastroCompleto){
                if(cargo == "ROLE_USUARIO_PF"){
                    if(documentoRG && documentoEndereco){
                        setDesativarBotao(false);
                    }
                } 
                if(cargo == "ROLE_USUARIO_PJ"){
                    if(documentoCNPJ && documentoContratoSocial && documentoEndereco){
                        setDesativarBotao(false);
                    }
                }
            }
        } else if(documentoCNPJ && documentoContratoSocial && documentoEndereco){
            setDesativarBotao(false);
        }
    }, [documentoCNPJ, documentoContratoSocial, documentoEndereco, documentoRG])

    const [documentosPessoais, setDocumentosPessoais] = useState(['COMPROVANTE_ENDERECO', 'COPIA_CNPJ', 'COPIA_CONTRATO_SOCIAL', 'COPIA_RG'])
    const subirDocumento = (indiceDocumento, arquivo) => {

        const form = { tipoAnexo: documentosPessoais[indiceDocumento]};

        const formData = new FormData();
        formData.append('dados', new Blob([JSON.stringify(form)], { type: 'application/json' }));
        formData.append('documento', arquivo)

        api.post(`/usuarios/documentos/${sessionStorage.ID_USUARIO}`, formData, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.TOKEN}`,
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    const gerenciarUploads = async () => {
        await subirDocumento(0, documentoEndereco); // 0 -> enum do endereço 
        if(cargo == "ROLE_USUARIO_PF"){
            await subirDocumento(3, documentoRG); // 3 -> enum do rg
        } else if (cargo == "ROLE_USUARIO_PJ"){
            await subirDocumento(1, documentoCNPJ); // 1 -> enum do cnpj
            await subirDocumento(2, documentoContratoSocial); // 2 -> enum do contrato social
        }
    }

    return (
        <div className="finalizar-pedido">
            <LoadingBar
                progress={barraCarregamento}
                height={3}
                color="#f11946"
            />
            {mostrarModal ? (
                <div className="modal-content">
                    <h2 className='titulo-finalizar-pedido'>Você deseja finalizar o pedido?</h2>
                    <p>Ao confirmar, o seu pedido será enviado à nossa equipe para análise. Você não poderá fazer nenhuma alteração nos equipamentos escolhidos. Deseja continuar?</p>
                    <div className="botoes-modal">
                        <button className='botao-voltar' onClick={() => setMostrarModal(false)}>Voltar</button>
                        <button className='botao-confirmar' onClick={() => {
                            realizarPedido();
                        }}>Confirmar</button>
                    </div>
                </div>
            ) : mostrarModalConfirmacao ? (
                <div className="modal-content-pedido-confirmado">
                    <h2 className='titulo-finalizar-pedido'>Seu pedido foi finalizado!</h2>
                    <h3 className='numero-serie-pedido'>Número do pedido #{numeroPedido}</h3>
                    <p className='aviso-pedido-confirmado'>Fique atento ao seu email e celular cadastrado, entraremos em contato para mais detalhes.
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
                        {carrinho.produtos.map((item) => (
                            <CardProdutoCarrinho key={item.produtoId} id={item.id} nome={item.nome} imagem={""} quantidade={item.quantidade} apenasLeitura={true}/>
                        ))}
                    </section>

                    <section className='container-endereco'>
                        <h2>ENDEREÇO</h2>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>CEP:</label>
                                <input type="text" value={formatarCEP(carrinho.endereco.cep)} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>RUA:</label>
                                <input type="text" value={carrinho.endereco.logradouro} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>NÚMERO:</label>
                                <input type="text" value={carrinho.endereco.numero} readOnly />
                            </div>
                        </section>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>BAIRRO:</label>
                                <input type="text" value={carrinho.endereco.bairro} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>CIDADE:</label>
                                <input type="text" value={carrinho.endereco.cidade} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>ESTADO:</label>
                                <input type="text" value={carrinho.endereco.estado} readOnly />
                            </div>
                        </section>
                        <section className='box-complemento'>
                            <label>COMPLEMENTO:</label>
                            <input type="text" value={carrinho.endereco.complemento} readOnly />
                        </section>
                        <section className='box-informacoes'>
                            <div className='secao-informacoes'>
                                <label>DATA E HORA ENTREGA:</label>
                                <input type="datetime-local" value={carrinho.dataEntrega} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>DATA E HORA DEVOLUÇÃO:</label>
                                <input type="datetime-local" value={carrinho.dataRetirada} readOnly />
                            </div>
                            <div className='secao-informacoes'>
                                <label>TIPO DE EVENTO:</label>
                                <input type="text" value={carrinho.tipo} readOnly />
                            </div>
                        </section>
                    </section>

                    <section className='container-observacao'>
                        <label htmlFor="txt_observacao">Observação (opcional):</label>
                        <textarea id="txt_observacao" value={descricao} onChange={(e) => { setDescricao(e.target.value)}} placeholder='Breve descrição do projeto...'></textarea>
                    </section>

                    <section className='container-documentos'>
                        <span>Se desejar, você pode anexar um documento que nos ajude a visualizar o seu projeto de forma mais clara, agilizando nossa análise e te oferecendo uma resposta o mais breve possível.</span>
                        <div className='box-documento'>
                            <span>DOCUMENTO DO PROJETO</span>
                            <label htmlFor="inp_documentoProjeto" className="custom-file-upload">
                                SUBIR ARQUIVO
                            </label>
                                <input id="inp_documentoProjeto" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => { setDocumentoAuxiliar(e.target.files[0])}} style={{ display: "none" }} />
                        </div>
                        {!cadastroCompleto && (
                            <>
                                <span>Forneça os documentos abaixo para agilizar a geração de contrato. Não será necessário um segundo envio após o primeiro pedido.</span>
                                <div className='box-documento'>
                                    <span>* COMPROVANTE DE ENDEREÇO</span>
                                    <label htmlFor="inp_documentoEndereco" className="custom-file-upload">SUBIR ARQUIVO</label>
                                    <input id="inp_documentoEndereco" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoEndereco(e.target.files[0])}} style={{ display: "none" }} />
                                </div>
                                {cargo === "ROLE_USUARIO_PF" ? (
                                    <div className='box-documento'>
                                        <span>* CÓPIA DO RG</span>
                                        <label htmlFor="inp_documentoRg" className="custom-file-upload">SUBIR ARQUIVO</label>
                                        <input id="inp_documentoRg" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoRG(e.target.files[0])}} style={{ display: "none" }} />
                                    </div>
                                ) : (
                                    <>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CARTÃO CNPJ</span>
                                            <label htmlFor="inp_documentoCartaoCnpj" className="custom-file-upload">SUBIR ARQUIVO</label>
                                            <input id="inp_documentoCartaoCnpj" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoCNPJ(e.target.files[0])}} style={{ display: "none" }} />
                                        </div>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CONTRATO SOCIAL</span>
                                            <label htmlFor="inp_documentoContratoSocial" className="custom-file-upload">SUBIR ARQUIVO</label>
                                            <input id="inp_documentoContratoSocial" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoContratoSocial(e.target.files[0])}} style={{ display: "none" }} />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </section>

                    {!cadastroCompleto && (
                        <div className='box-preenchimento-obrigatorio'>
                            <span>* Preenchimento obrigatório</span>
                        </div>
                    )}

                    <Navegabilidade
                        linkVoltar={"/carrinho/endereco"}
                        textoAvancar={"Finalizar"}
                        desabilitar={desativarBotao}
                        funcaoAvancar={validarForm}
                    />
                </>
            )}
        </div>
    );
}

export { FinalizarPedido };
