import React, { useState, useEffect } from 'react';
import './Pedidos.css';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Paginacao from '../components/Paginacao';
import { api } from '../provider/apiInstance';
import { CardPedido } from '../components/CardPedido';
import { useNavigate } from 'react-router-dom';

const statusCores = {
	'EM ANÁLISE': 'cinza',
	'APROVADO': 'verde',
	'EM EVENTO': 'azul',
	'FINALIZADO': 'vermelho',
	'CANCELADO': 'vermelho',
};

const Pedidos = () => {
	const [filtroStatus, setFiltroStatus] = useState(''),
		[ordem, setOrdem] = useState('Mais Recentes'),
		[busca, setBusca] = useState(''),
		[filtroStatusAberto, setFiltroStatusAberto] = useState(false),
		[ordemAberto, setOrdemAberto] = useState(false),
		[paginaAtual, setPaginaAtual] = useState(1),
		[pedidos, setPedidos] = useState([]),
		tipoUsuario = sessionStorage.CARGO || 'USUARIO';

	const navigate = useNavigate();

	useEffect(() => {
		const token = sessionStorage.TOKEN;
		api.get('/pedidos', {
			headers: {
				Authorization: token ? `Bearer ${token}` : undefined
			}
		})
			.then((res) => {
				if (Array.isArray(res.data) && res.data.length > 0) {
					const pedidosApi = res.data.map(p => ({
						id: p.id,
						itens: p.qtd_itens,
						data: new Date(p.data).toLocaleDateString('pt-BR'),
						status: p.situacao,
						cliente: p.cliente || 'Cliente Teste',
						valor: p.valor || 100
					}));
					setPedidos(pedidosApi);
				}
			})
	}, []);

	const handleDetalhes = (pedido) => {
		navigate(`/detalhar-pedidos?id=${pedido.id}`);
	}

	const pedidosFiltrados = pedidos
		.filter((pedido) => {
			const atendeStatus = filtroStatus ? pedido.status === filtroStatus : true,
				atendeBusca = busca ? String(pedido.id).includes(busca) : true;
			return atendeStatus && atendeBusca;
		})
		.sort((a, b) => {
			if (ordem === 'Mais Recentes') {
				return b.id - a.id;
			}
			return a.id - b.id;
		});

	const pedidosPorPagina = 6;
	const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
	const pedidosPaginados = pedidosFiltrados.slice(
		(paginaAtual - 1) * pedidosPorPagina,
		paginaAtual * pedidosPorPagina
	);

	return (
		<div className="pagina-pedidos">
			<main className="conteudo-pedidos">
				<div className="filtros">
					<div className="botoes-toggle">
						<a href="/equipamentos" className="inativo">EQUIPAMENTOS</a>
						<a className="ativo">PEDIDOS</a>
					</div>

					<div className="linha-pesquisa-filtros">
						<div className="barra-pesquisa-container">
							<input
								className="input-pesquisa"
								placeholder="Pesquisar número pedido"
								value={busca}
								onChange={(e) => setBusca(e.target.value)}
							/>
							<IoIosSearch className="icone-pesquisa" />
						</div>

						<div className="container-filtros">
							<div className="select-filtro-container">
								<select
									className="select-filtro"
									value={filtroStatus}
									onChange={(e) => setFiltroStatus(e.target.value)}
									onFocus={() => setFiltroStatusAberto(true)}
									onBlur={() => setFiltroStatusAberto(false)}
								>
									<option value="">Todos</option>
									<option value="EM ANÁLISE">Em Análise</option>
									<option value="APROVADO">Aprovado</option>
									<option value="EM EVENTO">Em Evento</option>
									<option value="FINALIZADO">Finalizado</option>
									<option value="CANCELADO">Cancelado</option>
								</select>
								<IoIosArrowDown className={`icone-arrow-select${filtroStatusAberto ? ' aberto' : ''}`} />
							</div>
							<div className="select-filtro-container">
								<select
									className="select-filtro"
									value={ordem}
									onChange={(e) => setOrdem(e.target.value)}
									onFocus={() => setOrdemAberto(true)}
									onBlur={() => setOrdemAberto(false)}
								>
									<option value="Mais Recentes">Recentes</option>
									<option value="Mais Antigos">Antigos</option>
								</select>
								<IoIosArrowDown className={`icone-arrow-select${ordemAberto ? ' aberto' : ''}`} />
							</div>
						</div>
					</div>
				</div>

				<div className="grid-pedidos">
					{pedidosPaginados.length > 0 ? (
						pedidosPaginados.map((pedido) => (
							<CardPedido
								key={pedido.id}
								pedido={pedido}
								tipoUsuario={tipoUsuario}
								onDetalhes={handleDetalhes}
							/>
						))
					) : (
						<p className="nenhum-pedido">Nenhum pedido encontrado.</p>
					)}
				</div>

				<Paginacao
					paginaAtual={paginaAtual}
					totalPaginas={totalPaginas}
					onChange={setPaginaAtual}
				/>
			</main>
		</div>
	);
};

export { Pedidos };