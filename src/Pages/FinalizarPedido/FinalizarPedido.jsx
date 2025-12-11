import { useEffect, useState } from 'react';
import { Navegabilidade } from '../../components/Navegabilidade/Navegabilidade';
import './FinalizarPedido.css';
import { useNavigate } from 'react-router-dom';
import { CardProdutoCarrinho } from '../../components/CardProdutoCarrinho/CardProdutoCarrinho';
import { formatarIdPedido } from '../../utils/formatacoes'
import { api } from '../../provider/apiInstance'
import { exibirAviso, exibirAvisoTokenExpirado, exibirAvisoLogin } from '../../utils/exibirModalAviso'
import { tokenExpirou } from '../../utils/token'
import LoadingBar from 'react-top-loading-bar';
import { FaCheck } from 'react-icons/fa';
import { DadosEndereco } from '../../components/DadosEndereco/DadosEndereco';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';
import { retornarCargos, isUsuarioPf, isUsuarioPj } from '../../utils/usuario';

function FinalizarPedido() {

    const navegar = useNavigate();
    const [barraCarregamento, setBarraCarregamento] = useState(0);

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false)
    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.CARRINHO));
    const [cadastroCompleto, setCadastroCompleto] = useState(sessionStorage.CADASTRO_COMPLETO == "true");
    const [cargo, setCargo] = useState(retornarCargos(sessionStorage.CARGO));
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
                api.post(ENDPOINTS.PEDIDOS, formData, {
                    headers: {
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

                    setTimeout(() => {
                        setMostrarModalConfirmacao(false);
                        navegar(ROUTERS.PEDIDOS)
                    }, 4000);
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
            exibirAvisoLogin(navegar);
            houveErro = true;
        }

        if(!houveErro){
            setMostrarModal(true);
        }
    }

    const [desativarBotao, setDesativarBotao] = useState(true);
    useEffect(() => {
        if(usuarioLogado) {
            if(!cadastroCompleto){
                if(isUsuarioPf(cargo)){
                    if(documentoRG && documentoEndereco){
                        setDesativarBotao(false);
                    }
                } 
                if(isUsuarioPj(cargo)){
                    if(documentoCNPJ && documentoContratoSocial && documentoEndereco){
                        setDesativarBotao(false);
                    }
                }
            } else{
                setDesativarBotao(false);
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

    // métodos para validar se arquivo foi enviado
    const [exibirDocAuxiliar, setExibirDocAuxiliar] = useState(false);
    const [exibirDocEndereco, setExibirDocEndereco] = useState(false);
    const [exibirDocRG, setExibirDocRG] = useState(false);
    const [exibirDocCNPJ, setExibirDocCNPJ] = useState(false);
    const [exibirDocContratoSocial, setExibirDocContratoSocial] = useState(false);    
    
    useEffect(() => {
        if(documentoAuxiliar){
            setExibirDocAuxiliar(true);
        } else {
            setExibirDocAuxiliar(false);
        }
    }, [documentoAuxiliar]);

    useEffect(() => {
        if(documentoEndereco){
            setExibirDocEndereco(true);
        } else {
            setExibirDocEndereco(false);
        }
    }, [documentoEndereco]);

    useEffect(() => {
        if(documentoRG){
            setExibirDocRG(true);
        } else {
            setExibirDocRG(false);
        }
    }, [documentoRG]);

    useEffect(() => {
        if(documentoCNPJ){
            setExibirDocCNPJ(true);
        } else {
            setExibirDocCNPJ(false);
        }
    }, [documentoCNPJ]);

    useEffect(() => {
        if(documentoContratoSocial){
            setExibirDocContratoSocial(true);
        } else {
            setExibirDocContratoSocial(false);
        }
    }, [documentoContratoSocial]);

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
                    <p className='aviso-pedido-confirmado'>Fique atento ao seu email e celular cadastrado, entraremos em contato para mais detalhes.</p>
                </div>
            ) : (
                <>
                    <h1>Finalizar Pedido</h1>
                    <section className='container-equipamentos'>
                        {carrinho.produtos.map((item) => (
                            <CardProdutoCarrinho key={item.produtoId} id={item.id} nome={item.nome} imagem={item.imagem} quantidade={item.quantidade} apenasLeitura={true}/>
                        ))}
                    </section>

                    <DadosEndereco endereco={carrinho.endereco} dataEntrega={carrinho.dataEntrega} dataRetirada={carrinho.dataRetirada} tipo={carrinho.tipo}/>

                    <section className='container-observacao'>
                        <label htmlFor="txt_observacao">Observação (opcional):</label>
                        <textarea id="txt_observacao" value={descricao} onChange={(e) => { setDescricao(e.target.value)}} placeholder='Breve descrição do projeto...'></textarea>
                    </section>

                    <section className='container-documentos'>
                        <span>Se desejar, você pode anexar um documento que nos ajude a visualizar o seu projeto de forma mais clara, agilizando nossa análise e te oferecendo uma resposta o mais breve possível.</span>
                        <div className='box-documento'>
                            <span>DOCUMENTO DO PROJETO (.png, .jpeg, .jpg, .pdf)</span>
                            <div className='icone-check'>
                                <label htmlFor="inp_documentoProjeto" className="custom-file-upload">
                                    SUBIR ARQUIVO
                                </label>
                                <input id="inp_documentoProjeto" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => { setDocumentoAuxiliar(e.target.files[0])}} style={{ display: "none" }} />
                                <FaCheck size={18} display={exibirDocAuxiliar ? 'flex' : 'none'} title='Enviado'/>
                            </div>
                        </div>
                        {!cadastroCompleto && (
                            <>
                                <span>Forneça os documentos abaixo para agilizar a geração de contrato. Não será necessário um segundo envio após o primeiro pedido.</span>
                                <div className='box-documento'>
                                    <span>* COMPROVANTE DE ENDEREÇO (.png, .jpeg, .jpg, .pdf)</span>
                                    <div className='icone-check'>
                                        <label htmlFor="inp_documentoEndereco" className="custom-file-upload">SUBIR ARQUIVO</label>
                                        <input id="inp_documentoEndereco" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoEndereco(e.target.files[0])}} style={{ display: "none" }} />
                                        <FaCheck size={18} display={exibirDocEndereco ? 'flex' : 'none'} title='Enviado'/>
                                    </div>
                                </div>
                                {isUsuarioPf(cargo) ? (
                                    <div className='box-documento'>
                                        <span>* CÓPIA DO RG (.png, .jpeg, .jpg, .pdf)</span>
                                        <div className='icone-check'>
                                            <label htmlFor="inp_documentoRg" className="custom-file-upload">SUBIR ARQUIVO</label>
                                            <input id="inp_documentoRg" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoRG(e.target.files[0])}} style={{ display: "none" }} />
                                            <FaCheck size={18} display={exibirDocRG ? 'flex' : 'none'} title='Enviado'/>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CARTÃO CNPJ (.png, .jpeg, .jpg, .pdf)</span>
                                            <div className='icone-check'>
                                                <label htmlFor="inp_documentoCartaoCnpj" className="custom-file-upload">SUBIR ARQUIVO</label>
                                                <input id="inp_documentoCartaoCnpj" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoCNPJ(e.target.files[0])}} style={{ display: "none" }} />
                                                <FaCheck size={18} display={exibirDocCNPJ ? 'flex' : 'none'} title='Enviado'/>
                                            </div>
                                        </div>
                                        <div className='box-documento'>
                                            <span>* CÓPIA DO CONTRATO SOCIAL (.png, .jpeg, .jpg, .pdf)</span>
                                            <div className='icone-check'>
                                                <label htmlFor="inp_documentoContratoSocial" className="custom-file-upload">SUBIR ARQUIVO</label>
                                                <input id="inp_documentoContratoSocial" type="file" accept='.png, .jpeg, .jpg, .pdf' onChange={(e) => {setDocumentoContratoSocial(e.target.files[0])}} style={{ display: "none" }} />
                                                <FaCheck size={18} display={exibirDocContratoSocial ? 'flex' : 'none'} title='Enviado'/>
                                            </div>
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
                        linkVoltar={`${ROUTERS.CARRINHOENDERECO}`}
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
