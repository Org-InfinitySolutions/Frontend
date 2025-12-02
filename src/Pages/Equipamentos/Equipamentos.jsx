import React, { useState, useEffect } from 'react';
import './Equipamentos.css';
import Modal from '../../components/ModalEquipamento/ModalEquipamento';
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ImgNaoDisponivel from '/img-nao-disponivel.jpg';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { api } from '../../provider/apiInstance';
import Paginacao from '../../components/Paginacao/Paginacao';
import { CardProdutoEquipamentos } from '../../components/CardProdutoEquipamentos/CardProdutoEquipamentos'
import { ToastContainer, toast } from 'react-toastify';
import { FaCartShopping } from 'react-icons/fa6';
import { tokenExpirou } from '../../utils/token';
import { exibirAvisoTokenExpirado } from '../../utils/exibirModalAviso';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';
import { retornarCargos, isAdmin, isFuncionario } from '../../utils/usuario';

const Equipamentos = () => {
  const navegar = useNavigate();

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarMaisProcurados, setMostrarMaisProcurados] = useState(false);
  const [barraCarregamento, setBarraCarregamento] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargos, setCargo] = useState(retornarCargos(sessionStorage.CARGO));
  const [totalItens, setTotalItens] = useState(0);

  const produtosPorPagina = 20;

  const abrirModal = (produto) => setProdutoSelecionado(produto);
  const fecharModal = () => setProdutoSelecionado(null);

  const normalizeCategoriaRaw = (cat) => {
    if (!cat) return null;
    if (typeof cat === "string") {
      const v = cat.trim();
      return v ? { id: v, nome: v } : null;
    }
    if (typeof cat === "number") return { id: String(cat), nome: String(cat) };

    if (typeof cat === "object") {
      const id = String(cat.id ?? "").trim();
      const nome = (typeof cat.nome === 'string' ? cat.nome.trim() : '') || id;
      return id || nome ? { id, nome } : null;
    }

    return null;
  };

  const buildHeaderObj = () => {
    const needAuth = isAdmin(cargos) || isFuncionario(cargos);
    return needAuth && sessionStorage.TOKEN
      ? { headers: { Authorization: `Bearer ${sessionStorage.TOKEN}` } }
      : {};
  };

  const carregarCategorias = async () => {
    const headerObj = buildHeaderObj();
    try {
      if (!ENDPOINTS.CATEGORIAS) throw new Error('ENDPOINTS.CATEGORIAS não configurado');

      const resCat = await api.get(ENDPOINTS.CATEGORIAS, headerObj);
      const dataCat = resCat.data;
      const origemCat = Array.isArray(dataCat)
        ? dataCat
        : Array.isArray(dataCat?.content)
          ? dataCat.content
          : Array.isArray(dataCat?.data)
            ? dataCat.data
            : (dataCat?.items ?? []);

      const categoriasFormatadas = origemCat.map(c => {
        const norm = normalizeCategoriaRaw(c);
        return norm ? { id: norm.id, nome: norm.nome } : null;
      }).filter(Boolean);

      if (categoriasFormatadas.length) {
        setCategorias(categoriasFormatadas);
        return;
      }

      throw new Error('Categorias vazias — fallback');
    } catch (err) {
      console.warn("carregarCategorias: fallback ativado", err);
      try {
        const categoriasMap = new Map();
        const maxPagesToScan = 6;
        const fallbackPageSize = 50;

        for (let page = 1; page <= maxPagesToScan; page++) {
          try {
            const offset = page - 1;
            const resp = await api.get(
              `${ENDPOINTS.PRODUTOS}?offset=${offset}&limit=${fallbackPageSize}`,
              headerObj
            );

            const data = resp.data;
            const origemProdutos = Array.isArray(data)
              ? data
              : Array.isArray(data?.content)
                ? data.content
                : Array.isArray(data?.data)
                  ? data.data
                  : (data?.items ?? []);

            origemProdutos.forEach(p => {
              const cat = normalizeCategoriaRaw(p.categoria ?? p.categoria_id ?? p.categoriaId);
              if (cat && cat.id) categoriasMap.set(String(cat.id), cat);
            });

            if (origemProdutos.length < fallbackPageSize) break;
          } catch (innerErr) {
            console.warn("carregarCategorias fallback — erro ao buscar página:", innerErr);
          }
        }

        const categoriasFallback = Array.from(categoriasMap.values());
        setCategorias(categoriasFallback);
      } catch (fatal) {
        console.error("carregarCategorias fallback falhou:", fatal);
        setCategorias([]);
      }
    }
  };

  const carregarProdutos = async (pagina = 1, filtro = '', pesquisaQuery = '') => {
    const headerObj = buildHeaderObj();
    setBarraCarregamento(30);

    if (tokenExpirou()) {
      exibirAvisoTokenExpirado(navegar);
      return;
    }

    try {
      const offset = pagina - 1;
      let url = `${ENDPOINTS.PRODUTOS}?offset=${offset}&limit=${produtosPorPagina}`;

      if (filtro) {
        url += `&categoria=${encodeURIComponent(filtro)}&categoriaId=${encodeURIComponent(filtro)}`;
      }

      if (pesquisaQuery && pesquisaQuery.trim() !== '') {
        const q = encodeURIComponent(pesquisaQuery.trim());
        url += `&q=${q}&search=${q}`;
      }

      const response = await api.get(url, headerObj);
      const data = response.data;

      const origemProdutos = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
          ? data.content
          : Array.isArray(data?.data)
            ? data.data
            : (data?.items ?? []);

      const produtosApi = origemProdutos.map(p => ({
        ...p,
        nome: p.modelo ?? p.nome ?? "",
        imagem:
          Array.isArray(p.imagem) &&
            typeof p.imagem[0] === "string" &&
            p.imagem[0].trim() !== ""
            ? p.imagem[0]
            : ImgNaoDisponivel,
        linkFabricante: p.url_fabricante,
        categoria: normalizeCategoriaRaw(p.categoria ?? p.categoria_id ?? p.categoriaId)
      }));

      let backendAplicouFiltro = true;
      if (filtro) {
        backendAplicouFiltro = produtosApi.some(p => String(p.categoria?.id) === String(filtro));
      }
      if (pesquisaQuery && pesquisaQuery.trim() !== '') {
        const termo = pesquisaQuery.trim().toLowerCase();
        backendAplicouFiltro = backendAplicouFiltro && produtosApi.some(p => (p.nome ?? '').toLowerCase().includes(termo));
      }

      if ((!filtro && !(pesquisaQuery && pesquisaQuery.trim() !== '')) || backendAplicouFiltro) {
        setProdutos(produtosApi);

        const totalItemsFromApi =
          Number(data.totalElements ?? data.totalItems ?? data.total ?? data?.meta?.total) ||
          produtosApi.length ||
          0;

        setTotalItens(Number.isFinite(totalItemsFromApi) ? totalItemsFromApi : 0);

        const computedTotalPages =
          Number(data.totalPages ?? Math.max(1, Math.ceil(totalItemsFromApi / produtosPorPagina))) || 1;

        setTotalPaginas(Number.isFinite(computedTotalPages) && computedTotalPages > 0 ? computedTotalPages : 1);
        setBarraCarregamento(100);
        return;
      }

      const matches = [];
      const maxPagesFallback = 8;
      for (let page = 1; page <= maxPagesFallback; page++) {
        try {
          const offsetPage = page - 1;
          const resp = await api.get(`${ENDPOINTS.PRODUTOS}?offset=${offsetPage}&limit=${produtosPorPagina}`, headerObj);
          const dataPage = resp.data;
          const origemPage = Array.isArray(dataPage)
            ? dataPage
            : Array.isArray(dataPage?.content)
              ? dataPage.content
              : Array.isArray(dataPage?.data)
                ? dataPage.data
                : (dataPage?.items ?? []);

          const produtosPage = origemPage.map(p => ({
            ...p,
            nome: p.modelo ?? p.nome ?? "",
            imagem:
              Array.isArray(p.imagem) &&
                typeof p.imagem[0] === "string" &&
                p.imagem[0].trim() !== ""
                ? p.imagem[0]
                : ImgNaoDisponivel,
            linkFabricante: p.url_fabricante,
            categoria: normalizeCategoriaRaw(p.categoria ?? p.categoria_id ?? p.categoriaId)
          }));

          produtosPage.forEach(p => {
            let ok = true;
            if (filtro) ok = ok && String(p.categoria?.id) === String(filtro);
            if (pesquisaQuery && pesquisaQuery.trim() !== '') ok = ok && (p.nome ?? '').toLowerCase().includes(pesquisaQuery.trim().toLowerCase());
            if (ok) matches.push(p);
          });

          if (origemPage.length < produtosPorPagina) break;
          if (matches.length >= produtosPorPagina * 3) break;
        } catch (errPage) {
          console.warn('fallback scan page error', errPage);
        }
      }

      const totalFallback = matches.length;
      const totalPaginasFallback = Math.max(1, Math.ceil(totalFallback / produtosPorPagina));
            
      const inicioFallback = (paginaValidaFallback - 1) * produtosPorPagina;
      const paginaAtualFallback = matches.slice(inicioFallback, inicioFallback + produtosPorPagina);

      setProdutos(paginaAtualFallback);
      setTotalItens(Number.isFinite(totalFallback) ? totalFallback : 0);
      setTotalPaginas(totalPaginasFallback);

      if (pagina !== paginaValidaFallback) {
        setPaginaAtual(paginaValidaFallback);
      }

      setBarraCarregamento(100);
      return;
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setBarraCarregamento(100);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  useEffect(() => {
    carregarProdutos(paginaAtual, filtroStatus, pesquisa);
  }, [paginaAtual, filtroStatus, pesquisa]);

  const produtosFiltrados = produtos;

  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(sessionStorage.getItem('CARRINHO')) || { produtos: [] };
    const index = carrinhoAtual.produtos.findIndex(item => item.produtoId === produto.id);

    if (index !== -1) {
      carrinhoAtual.produtos[index].quantidade++;
    } else {
      carrinhoAtual.produtos.push({
        produtoId: produto.id,
        quantidade: 1,
        imagem: produto.imagem,
        nome: produto.nome
      });
    }

    sessionStorage.setItem('CARRINHO', JSON.stringify(carrinhoAtual));
    toast(<><FaCartShopping /> &nbsp; Produto adicionado no carrinho!</>);
  };

  const handleFiltroChange = (e) => {
    setPaginaAtual(1);
    setFiltroStatus(e.target.value);
  };

  const handlePesquisaChange = (e) => {
    setPaginaAtual(1);
    setPesquisa(e.target.value);
  };

  return (
    <div className="pagina-equipamentos">
      <LoadingBar progress={barraCarregamento} height={3} color="#f11946" />
      <main className="conteudo-equipamentos">
        <div className="filtros">
          <div className="linha-pesquisa-filtros">
            <div className="barra-pesquisa-container" style={{ position: 'relative' }}>
              <div className='campo-pesquisar'>
                <input
                  className="input-pesquisa"
                  placeholder="Pesquisar equipamento"
                  value={pesquisa}
                  onChange={handlePesquisaChange}
                />
                <span className="icone-pesquisa"><IoIosSearch size={18} /></span>
              </div>

              {!isAdmin(cargos) && !isFuncionario(cargos) && (
                <div className="linha-botoes-carrinho">
                  <div className="icone-carrinho">
                    <IoCartOutline size={40} onClick={() => navegar(`${ROUTERS.CARRINHO}`)} />
                  </div>
                </div>
              )}
            </div>

            <div className="container-filtros">
              <div className="select-filtro-container">
                <select
                  className="select-filtro"
                  value={filtroStatus}
                  onChange={handleFiltroChange}
                  onFocus={() => setFiltroStatusAberto(true)}
                  onBlur={() => setFiltroStatusAberto(false)}
                >
                  <option value="">Categorias</option>
                  {Array.isArray(categorias) && categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
                <IoIosArrowDown className={`icone-arrow-select${filtroStatusAberto ? ' aberto' : ''}`} />
              </div>

              {isAdmin(cargos) || isFuncionario(cargos) ? (
                <button className="botao-secundario" onClick={() => navegar(`${ROUTERS.ADICIONAREQUIPAMENTO}`)}>
                  Adicionar equipamento
                </button>
              ) : (
                <button className="botao-secundario" onClick={() => setMostrarMaisProcurados(m => !m)}>
                  {mostrarMaisProcurados ? 'Exibir todos' : 'Exibir mais procurados'}
                </button>
              )}
            </div>
          </div>
        </div>

        <h2>Equipamentos disponíveis</h2>

        <div className="grid-produtos">
          {produtosFiltrados.length === 0 ? (
            <div className='nenhum-pedido'>Nenhum produto encontrado.</div>
          ) : (
            produtosFiltrados.map((produto, index) => (
              <CardProdutoEquipamentos
                key={index}
                produto={produto}
                adicionarNoCarrinho={() => adicionarAoCarrinho(produto)}
                abrirModal={() => abrirModal(produto)}
              />
            ))
          )}
        </div>

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          totalItens={totalItens}
          itensPorPagina={produtosPorPagina}
          onChange={setPaginaAtual}
        />

        <div className="contato">
          Não encontrou o que buscava? <a href="#">Contate-nos</a>
        </div>

        {produtoSelecionado && (
          <Modal produto={produtoSelecionado} onClose={fecharModal} />
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export { Equipamentos };