import { useState, useEffect } from 'react';
import './Pedidos.css';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Paginacao from '../../components/Paginacao/Paginacao';
import { api } from '../../provider/apiInstance';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import { useNavigate } from 'react-router-dom';
import { formatarData } from '../../utils/formatacoes'
import { bloquearAcessoUsuario, tokenExpirou } from '../../utils/token';
import { exibirAvisoTokenExpirado } from '../../utils/exibirModalAviso';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';
import { retornarCargos } from '../../utils/usuario';

const normalizarStatus = (status) => {
	if (!status) return '';
	return status
		.normalize('NFD')
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '_')
		.toUpperCase();
};

const Pedidos = () => {
	const [filtroStatus, setFiltroStatus] = useState(''),
		[ordem, setOrdem] = useState('Mais Recentes'),
		[busca, setBusca] = useState(''),
		[filtroStatusAberto, setFiltroStatusAberto] = useState(false),
		[ordemAberto, setOrdemAberto] = useState(false),
		[paginaAtual, setPaginaAtual] = useState(1),
		[pedidos, setPedidos] = useState([]),
		tipoUsuario = retornarCargos(sessionStorage.CARGO);

	const navigate = useNavigate();

	useEffect(() => {
		if(bloquearAcessoUsuario()){
			exibirAvisoTokenExpirado(navigate);
		} else {
		
			api.get(ENDPOINTS.PEDIDOS)
			.then((res) => {
				if (Array.isArray(res.data) && res.data.length > 0) {
					const pedidosApi = res.data.map(p => ({
						id: p.id,
						itens: p.qtd_itens,
						data: formatarData(p.dataCriacao),
						status: p.situacao,
						cliente: p.nome,
						valor: p.valor || 100
					}));
					setPedidos(pedidosApi);
				}
			})
		}
	}, []);

	const handleDetalhes = (pedido) => {
		navigate(`${ROUTERS.DETALHARPEDIDOS}?id=${pedido.id}`);
	}

	const pedidosFiltrados = pedidos
		.filter((pedido) => {
			const atendeStatus = filtroStatus
				? normalizarStatus(pedido.status) === normalizarStatus(filtroStatus)
				: true,
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