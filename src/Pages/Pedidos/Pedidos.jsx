import { useState, useEffect } from 'react';
import './Pedidos.css';
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import Paginacao from '../../components/Paginacao/Paginacao';
import { api } from '../../provider/apiInstance';
import { CardPedido } from '../../components/CardPedido/CardPedido';
import { useNavigate } from 'react-router-dom';
import { formatarData } from '../../utils/formatacoes';
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
  const [filtroStatus, setFiltroStatus] = useState('');
  const [ordem, setOrdem] = useState('Mais Recentes');
  const [busca, setBusca] = useState('');
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [ordemAberto, setOrdemAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pedidos, setPedidos] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const tipoUsuario = retornarCargos(sessionStorage.CARGO);

  const navigate = useNavigate();
  const pedidosPorPagina = 16;

  const carregarPedidos = async (pagina = 1) => {
    if (bloquearAcessoUsuario() || tokenExpirou()) {
      exibirAvisoTokenExpirado(navigate);
      return;
    }

    try {
      const response = await api.get(`${ENDPOINTS.PEDIDOS}?offset=${pagina - 1}&limit=${pedidosPorPagina}`, {
        headers: { Authorization: `Bearer ${sessionStorage.TOKEN}` },
      });

      const data = response.data;
      const pedidosApi = (data.content || data).map((p) => ({
        id: p.id,
        itens: p.qtd_itens,
        data: formatarData(p.dataCriacao),
        status: p.situacao,
        cliente: p.nome,
        valor: p.valor || 0,
      }));

      setPedidos(pedidosApi);

      const totalItemsFromApi = data.totalElements ?? data.total ?? pedidosApi.length;
      setTotalItens(totalItemsFromApi);
      const computedTotalPages = data.totalPages ?? Math.ceil(totalItemsFromApi / pedidosPorPagina);
      setTotalPaginas(computedTotalPages || 1);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    }
  };

  useEffect(() => {
    carregarPedidos(paginaAtual);
  }, [paginaAtual]);

  const handleDetalhes = (pedido) => {
    navigate(`${ROUTERS.DETALHARPEDIDOS}?id=${pedido.id}`);
  };

  const pedidosFiltrados = pedidos
    .filter((pedido) => {
      const atendeStatus = filtroStatus
        ? normalizarStatus(pedido.status) === normalizarStatus(filtroStatus)
        : true;
      const atendeBusca = busca ? String(pedido.id).includes(busca) : true;
      return atendeStatus && atendeBusca;
    })
    .sort((a, b) => (ordem === 'Mais Recentes' ? b.id - a.id : a.id - b.id));

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
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((pedido) => (
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
          totalItens={totalItens}
          itensPorPagina={pedidosPorPagina}
          onChange={setPaginaAtual}
        />
      </main>
    </div>
  );
};

export { Pedidos };
