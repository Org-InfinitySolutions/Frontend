import React, { useEffect, useState } from 'react';
import './DetalharPedidos.css';
import IconeNotebook from '../assets/notebook.png';
import { CardProduto } from '../components/CardProduto';
import { api } from '../provider/apiInstance';
import { useSearchParams } from 'react-router-dom';

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
    'EM ANÁLISE': 'status-btn status-cinza',
    'EM_ANALISE': 'status-btn status-cinza',
    'EM EVENTO': 'status-btn status-azul',
    'EM_EVENTO': 'status-btn status-azul',
    'FINALIZADO': 'status-btn status-vermelho',
    'CANCELADO': 'status-btn status-vermelho',
    'APROVADO': 'status-btn status-verde',
};

const statusOptions = [
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
    return statusClassMap[normalizado] || 'status-btn status-cinza';
};

export function DetalharPedidos() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [pedido, setPedido] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [mudandoStatus, setMudandoStatus] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const token = sessionStorage.TOKEN;
        api.get(`/pedidos/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined
            }
        })
            .then(res => {
                setPedido(res.data);
                setStatus(res.data.situacao);
            })
            .catch(() => setPedido(null))
            .finally(() => setLoading(false));
    }, [id]);

    const handleMudarSituacao = async () => {
        if (!id || !status) return;
        setMudandoStatus(true);
        const token = sessionStorage.TOKEN;
        try {
            await api.put(`/pedidos/${id}/situacao`, { situacao: status }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined
                }
            });
            setPedido(p => ({ ...p, situacao: status }));
            alert('Situação atualizada com sucesso!');
        } catch (e) {
            alert('Erro ao atualizar situação.');
        }
        setMudandoStatus(false);
    };

    const isAdmin = sessionStorage.CARGO === 'ROLE_ADMIN';

    if (loading) return <div>Carregando...</div>;
    if (!pedido) return <div>Pedido não encontrado.</div>;

    const usuario = pedido.usuario || {};
    const endereco = pedido.endereco || usuario.endereco || {};
    const documentos = (pedido.documentos || []).concat(usuario.documentos || []);
    const produtos = pedido.produtos || [];

    return (
        <div className="detalhar-pedidos-adm">
            <div className="numero-serie-pedido">
                <div className="informacoes-pedido">
                    <p className="numero-pedido">Pedido #{pedido.id}</p>
                    <p className="data-pedido">Pedido feito em: {pedido.dataCriacao ? new Date(pedido.dataCriacao).toLocaleDateString('pt-BR') : '-'}</p>
                </div>
                <div className="condicoes-pedido">
                    <span className={`situacao-pedido ${getStatusClass(status)}`}>{exibirStatus(status)}</span>
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
                    {usuario.cnpj && <p><strong>CNPJ:</strong> {usuario.cnpj}</p>}
                    {usuario.cpf && <p><strong>CPF:</strong> {usuario.cpf}</p>}
                    {usuario.rg && <p><strong>RG:</strong> {usuario.rg}</p>}
                    <p><strong>Celular:</strong> {usuario.telefone_celular}</p>
                    <p><strong>E-mail:</strong> {usuario.email}</p>
                </div>
                <div className='documentos-baixar'>
                    <p>Documentos:</p>
                    {documentos.length > 0 ? (
                        documentos.map((doc, i) => (
                            <a key={i} href={doc.downloadUrl || '#'} download target="_blank" rel="noopener noreferrer">
                                <button className="btn-baixar-dados">{doc.originalFilename || 'BAIXAR'}</button>
                            </a>
                        ))
                    ) : (
                        <span>Nenhum documento</span>
                    )}
                </div>
            </div>

            <div className='grid-itens'>
                <div className="lista-itens-vertical">
                    {produtos.length > 0 ? produtos.map((item, index) => (
                        <CardProduto
                            key={index}
                            image={item.produto?.imagem || IconeNotebook}
                            name={item.produto?.modelo || 'Produto'}
                            quantidade={item.qtdAlugada}
                        />
                    )) : <span>Nenhum produto</span>}
                </div>
            </div>

            <div className="endereco-pedido">
                <h3>Endereço</h3>
                <div className="grid-linha">
                    <p><strong>CEP:</strong> {endereco.cep}</p>
                    <p><strong>Rua:</strong> {endereco.logradouro}</p>
                    <p><strong>Número:</strong> {endereco.numero}</p>
                </div>
                <div className="grid-linha">
                    <p><strong>Bairro:</strong> {endereco.bairro}</p>
                    <p><strong>Estado:</strong> {endereco.estado}</p>
                    <p><strong>Cidade:</strong> {endereco.cidade}</p>
                </div>
                {endereco.complemento && (
                    <div className="grid-linha grid-1">
                        <p><strong>Complemento:</strong> {endereco.complemento}</p>
                    </div>
                )}
                <div className="grid-linha">
                    <p><strong>Data e hora de entrega:</strong> {pedido.dataEntrega ? new Date(pedido.dataEntrega).toLocaleString('pt-BR') : '-'}</p>
                    <p><strong>Data e hora de retirada:</strong> {pedido.dataRetirada ? new Date(pedido.dataRetirada).toLocaleString('pt-BR') : '-'}</p>
                </div>
            </div>

            <div className="descricao-projeto">
                <h3 className="titulo-descricao">Descrição do Projeto</h3>
                <p className="texto-descricao">
                    {pedido.descricao || 'Sem descrição.'}
                </p>
            </div>

            {pedido.documentos && pedido.documentos.length > 0 && (
                <div className="documento-auxiliar">
                    <p className="titulo-documento">Documento auxiliar:</p>
                    {pedido.documentos.map((doc, i) => (
                        <a key={i} href={doc.downloadUrl || '#'} download target="_blank" rel="noopener noreferrer">
                            <button className="btn-baixar-dados">{doc.originalFilename || 'BAIXAR'}</button>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}