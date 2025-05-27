import React, { useState } from 'react';
import './Pedidos.css';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const listaPedidos = [
	{ id: '123456', itens: 12, data: '01/12/2009', status: 'Em análise' },
	{ id: '123457', itens: 7, data: '02/12/2009', status: 'Aprovado' },
	{ id: '123458', itens: 9, data: '03/12/2009', status: 'Em evento' },
	{ id: '123459', itens: 5, data: '04/12/2009', status: 'Em evento' },
	{ id: '123460', itens: 15, data: '05/12/2009', status: 'Finalizado' },
	{ id: '123461', itens: 3, data: '06/12/2009', status: 'Cancelado' },
];

const statusCores = {
	'Em análise': 'cinza',
	'Aprovado': 'verde',
	'Em evento': 'azul',
	'Finalizado': 'vermelho',
	'Cancelado': 'vermelho',
};

const Pedidos = () => {
	const [filtroStatus, setFiltroStatus] = useState('');
	const [ordem, setOrdem] = useState('Mais Recentes');
	const [busca, setBusca] = useState('');

	const pedidosFiltrados = listaPedidos
		.filter((pedido) => {
			const atendeStatus = filtroStatus ? pedido.status === filtroStatus : true;
			const atendeBusca = busca ? pedido.id.includes(busca) : true;
			return atendeStatus && atendeBusca;
		})
		.sort((a, b) => {
			if (ordem === 'Mais Recentes') {
				return b.id.localeCompare(a.id);
			}
			return a.id.localeCompare(b.id);
		});

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
							<select
								className="select-filtro"
								value={filtroStatus}
								onChange={(e) => setFiltroStatus(e.target.value)}
							>
								<option value="">Todos</option>
								<option value="Em análise">Em Análise</option>
								<option value="Aprovado">Aprovado</option>
								<option value="Em evento">Em Evento</option>
								<option value="Finalizado">Finalizado</option>
								<option value="Cancelado">Cancelado</option>
								<option value="Erro">Erro</option> {/* OPÇÃO TEMPORÁRIA PARA VER A MENSAGEM DE ERRO!!! */}
								{/* <IoIosArrowDown /> */}
							</select>

							<select
								className="select-filtro"
								value={ordem}
								onChange={(e) => setOrdem(e.target.value)}
							>
								<option value="Mais Recentes">Recentes</option>
								<option value="Mais Antigos">Antigos</option>
								{/* <IoIosArrowDown /> */}
							</select>
						</div>
					</div>
				</div>

				<div className="grid-pedidos">
					{pedidosFiltrados.length > 0 ? (
						pedidosFiltrados.map((pedido) => (
							<div className="card-pedido" key={pedido.id}>
								<h3>Pedido {pedido.id}</h3>
								<p>Itens: {pedido.itens}</p>
								<p>Data: {pedido.data}</p>
								<div className="acoes">
									<span className={`status ${statusCores[pedido.status]}`}>
										{pedido.status}
									</span>
									<button className="btn-detalhes">Detalhes</button>
								</div>
							</div>
						))
					) : (
						<p className="nenhum-pedido">Nenhum pedido encontrado.</p>
					)}
				</div>

				<div className="paginacao">
					<span>{'<'}</span>
					<span className="pagina-ativa">1</span>
					<span>2</span>
					<span>3</span>
					<span>4</span>
					<span>5</span>
					<span>{'>'}</span>
				</div>
			</main>
		</div>
	);
};

export { Pedidos };