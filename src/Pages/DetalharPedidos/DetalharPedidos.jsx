import { useEffect, useState } from 'react';
import './DetalharPedidos.css';
import { api } from '../../provider/apiInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import JSZip from 'jszip';
import { exibirAviso, exibirAvisoTokenExpirado } from '../../utils/exibirModalAviso'
import { tokenExpirou } from '../../utils/token'
import { DadosEndereco } from '../../components/DadosEndereco/DadosEndereco'
import { CardProdutoCarrinho } from '../../components/CardProdutoCarrinho/CardProdutoCarrinho';
import { formatarCPF, formatarRegistroGeral, formatarTelefone, formatarCNPJ, formatarIdPedido } from '../../utils/formatacoes'
import { ENDPOINTS } from '../../routers/endpoints';

const statusLabel = {
    'EM_ANALISE': 'Em Análise',
    'EM ANÁLISE': 'Em Análise',
    'APROVADO': 'Aprovado',
    'EM_EVENTO': 'Em Evento',
    'EM EVENTO': 'Em Evento',
    'FINALIZADO': 'Finalizado',
    'CANCELADO': 'Cancelado',
};

const statusClassMap = {
    'EM_ANALISE': 'status-btn status-cinza',
    'EM EVENTO': 'status-btn status-azul',
    'EM_EVENTO': 'status-btn status-azul',
    'FINALIZADO': 'status-btn status-vermelho',
    'CANCELADO': 'status-btn status-vermelho',
    'APROVADO': 'status-btn status-verde',
};

let statusOptions = [
    { value: 'EM_ANALISE', label: 'Em Análise' },
    { value: 'APROVADO', label: 'Aprovado' },
    { value: 'EM_EVENTO', label: 'Em Evento' },
    { value: 'FINALIZADO', label: 'Finalizado' },
    { value: 'CANCELADO', label: 'Cancelado' },
];

const exibirStatus = (status) => {
    if (statusLabel[status]) return statusLabel[status];
    return status
        ? status.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase())
        : '';
};

const getStatusClass = (status) => {
    if (statusClassMap[status]) return statusClassMap[status];
    const normalizado = status
        ? status.normalize('NFD').replace(/[^\w\s]/g, '').replace(/\s+/g, '_').toUpperCase()
        : '';
    return statusClassMap[normalizado];
};

export function DetalharPedidos() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [pedido, setPedido] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [mudandoStatus, setMudandoStatus] = useState(false);
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    const navegar = useNavigate();

    useEffect(() => {
        if (!id) return;
        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar)
        } else {
            setBarraCarregamento(30);
            setLoading(true);
            api.get(ENDPOINTS.PEDIDOID.replace(':id', id), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.TOKEN}`
                }
            }).then(res => {
                setBarraCarregamento(100);
                setPedido(res.data);

                const situacao = res.data.situacao;
                if(situacao == 'FINALIZADO' || situacao == 'CANCELADO'){
                    statusOptions = statusOptions.filter(x => x.value != 'APROVADO' && x.value != 'EM_ANALISE' && x.value != 'EM_EVENTO');
                } else if(situacao == 'EM_EVENTO'){
                    statusOptions = statusOptions.filter(x => x.value != 'APROVADO' && x.value != 'EM_ANALISE' && x.value != 'CANCELADO');    
                }
                setStatus(situacao);
            })
            .catch(() => setPedido(null))
            .finally(() => setLoading(false));
        }
    }, [id]);

    const handleMudarSituacao = async () => {
        
        if (!id || !status) return;
        setBarraCarregamento(30);
        setMudandoStatus(true);

        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar);
        } else {
            await api.put(ENDPOINTS.PUTSITUACAOPEDIDO.replace(':id', id), { situacao: status }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.TOKEN}`
                }
            }).then((res) => {
                setBarraCarregamento(100);
                setPedido(p => ({ ...p, situacao: status }));
                exibirAviso('Operação realizada com sucesso', 'success');

                setTimeout(()=> {
                    navegar(0)
                }, 2000)
            }).catch((err) => {
                setBarraCarregamento(100);
                exibirAviso(err.response.data.message, 'error');
            })
            setMudandoStatus(false);
        }
    };

    const baixarArquivos = async (arquivos) => {

        const zip = new JSZip();
        
        for(let i = 0; i < arquivos.length; i++){
            const doc = arquivos[i];
            const response = await fetch(doc.downloadUrl);
            const blob = await response.blob();
            const nome = doc.originalFilename || `documento-${i}`;
            zip.file(nome, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);

        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = `documentos.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
    }

    const isAdmin = sessionStorage.CARGO === 'ROLE_ADMIN' || sessionStorage.CARGO === 'ROLE_FUNCIONARIO';

    if (loading) return <div>gando...</div>;
    if (!pedido) return <div>PedidCarreo não encontrado.</div>;

    const usuario = pedido.usuario || {};
    const endereco = pedido.endereco || usuario.endereco || {};
    const produtos = pedido.produtos || [];

    return (
        <div className="detalhar-pedidos-adm">
            <LoadingBar
                progress={barraCarregamento}
                height={3}
                color="#f11946"
            />
            <div className="numero-serie-pedido">
                <div className="informacoes-pedido">
                    <p className="numero-pedido">Pedido #{formatarIdPedido(pedido.id)}</p>
                    <p className="data-pedido">Pedido feito em: {pedido.dataCriacao ? new Date(pedido.dataCriacao).toLocaleDateString('pt-BR') : '-'}</p>
                </div>
                <div className="condicoes-pedido">
                    <span className={`${statusClassMap[status]}`}>{exibirStatus(status)}</span>
                    {isAdmin && (
                        <>
                            <select
                                className="select-filtro"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                                style={{ marginLeft: 8, marginRight: 8 }}
                            >
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <button className="btn-mudar-situacao" onClick={handleMudarSituacao} disabled={mudandoStatus}>
                                {mudandoStatus ? 'Salvando...' : 'Mudar Situação'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="dados-cliente">
                <div className='dados'>
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    {usuario.cnpj && <p><strong>CNPJ:</strong> {formatarCNPJ(usuario.cnpj)}</p>}
                    {usuario.cpf && <p><strong>CPF:</strong> {formatarCPF(usuario.cpf)}</p>}
                    {usuario.rg && <p><strong>RG:</strong> {formatarRegistroGeral(usuario.rg)}</p>}
                    <p><strong>Celular:</strong> {formatarTelefone(usuario.telefone_celular)}</p>
                    <p><strong>E-mail:</strong> {usuario.email}</p>
                </div>
                <div className='documentos-baixar'>
                    <p>Documentos:</p>
                    
                    <button className="btn-baixar-dados" onClick={() => { baixarArquivos(pedido.usuario.documentos) }}>BAIXAR</button>
                </div>
            </div>

            <div className='grid-itens'>
                {produtos.map((item, i) => 
                (
                    <CardProdutoCarrinho key={i} id={item.produto.id} nome={item.produto.modelo} imagem={item.produto.imagens[0]} quantidade={item.qtdAlugada} apenasLeitura={true}/>
                )
                
                
                )}
            </div>

            <DadosEndereco endereco={endereco} dataEntrega={pedido.dataEntrega} dataRetirada={pedido.dataRetirada} tipo={pedido.tipoPedido}/>

            <div className="descricao-projeto">
                <h3 className="titulo-descricao">Descrição do Projeto</h3>
                <p className="texto-descricao">
                    {pedido.descricao || 'Sem descrição.'}
                </p>
            </div>

            {pedido.documentos && pedido.documentos.length > 0 && (
                <div className="documento-auxiliar">
                    <p className="titulo-documento">Documento auxiliar:</p>
                    <button className="btn-baixar-dados" onClick={() => {baixarArquivos(pedido.documentos)}}>BAIXAR</button>
                </div>
            )}
        </div>
    );
}