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

    if (typeof cat === 'string') {
      const v = cat.trim();
      return v ? { id: v, nome: v } : null;
    }

    if (typeof cat === 'number') {
      return { id: String(cat), nome: String(cat) };
    }

    if (typeof cat === 'object') {
      const id = cat.id != null ? String(cat.id).trim() : '';
      const nome = cat.nome?.trim() ?? id;
      return id || nome ? { id, nome } : null;
    }
    return null;
  };


  const carregarProdutos = async (pagina = 1) => {
    const header = isAdmin(cargos) || isFuncionario(cargos);
    setBarraCarregamento(30);

    if (tokenExpirou()) {
      exibirAvisoTokenExpirado(navegar);
      return;
    }

    try {
      const response = await api.get(
        `${ENDPOINTS.PRODUTOS}?page=${pagina - 1}&size=${produtosPorPagina}`,
        header ? { headers: { Authorization: `Bearer ${sessionStorage.TOKEN}` } } : {}
      );

      setBarraCarregamento(100);

      const data = response.data;
      const origemProdutos = Array.isArray(data) ? data : Array.isArray(data?.content) ? data.content : Array.isArray(data?.data) ? data.data : (data?.items ?? []);
      const produtosApi = origemProdutos.map(p => ({
        ...p,
        nome: p.modelo ?? p.nome ?? '',
        imagem: (Array.isArray(p.imagem) && typeof p.imagem[0] === 'string' && p.imagem[0].trim() !== '')
          ? p.imagem[0]
          : ImgNaoDisponivel,
        linkFabricante: p.url_fabricante,
        categoria: normalizeCategoriaRaw(p.categoria ?? p.categoria_id ?? p.categoriaId ?? p.categoriaId)
      }));

      setProdutos(produtosApi);

      const totalItemsFromApi = data.totalElements ?? data.totalItems ?? data.total ?? data?.meta?.total ?? produtosApi.length;
      setTotalItens(totalItemsFromApi ?? produtosApi.length ?? 0);
      const computedTotalPages = (data.totalPages !== undefined && data.totalPages !== null)
        ? Number(data.totalPages)
        : Math.max(1, Math.ceil((totalItemsFromApi ?? produtosApi.length) / produtosPorPagina));
      setTotalPaginas(Number.isNaN(computedTotalPages) ? 1 : computedTotalPages);

      let categoriasUnicas = [];
      if (ENDPOINTS.CATEGORIAS) {
        try {
          const resCat = await api.get(
            ENDPOINTS.CATEGORIAS,
            header ? { headers: { Authorization: `Bearer ${sessionStorage.TOKEN}` } } : {}
          );
          const dataCat = resCat.data;
          const origemCat = Array.isArray(dataCat)
            ? dataCat
            : Array.isArray(dataCat?.content)
              ? dataCat.content
              : Array.isArray(dataCat?.data)
                ? dataCat.data
                : (dataCat?.items ?? []);
          categoriasUnicas = origemCat.map(c => {
            const norm = normalizeCategoriaRaw(c);
            return norm ? { id: String(norm.id), nome: norm.nome } : null;
          }).filter(Boolean);
        } catch (e) {
          categoriasUnicas = [];
          produtosApi.forEach(p => {
            const cat = p.categoria;
            if (!cat) return;
            if (!categoriasUnicas.some(c => c.id === cat.id)) {
              categoriasUnicas.push({ id: cat.id, nome: cat.nome });
            }
          });
        }
      } else {
        categoriasUnicas = [];
        produtosApi.forEach(p => {
          const cat = p.categoria;
          if (!cat) return;
          if (!categoriasUnicas.some(c => c.id === cat.id)) {
            categoriasUnicas.push({ id: cat.id, nome: cat.nome });
          }
        });
      }
      setCategorias(categoriasUnicas);

    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setBarraCarregamento(100);
    }
  };

  useEffect(() => {
    carregarProdutos(paginaAtual);
  }, [paginaAtual]);

  const produtosFiltrados = produtos.filter(p => {
    let cond = true;

    if (filtroStatus) {
      const produtoCatId = p.categoria?.id ?? '';
      cond = produtoCatId === filtroStatus; // comparação simples, sem toLowerCase
    }

    if (pesquisa) {
      cond = cond && p.nome?.toLowerCase().includes(pesquisa.toLowerCase());
    }

    return cond;
  });



  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(sessionStorage.getItem('CARRINHO')) || { produtos: [] };
    const index = carrinhoAtual.produtos.findIndex(item => item.produtoId === produto.id);
    if (index !== -1) {
      carrinhoAtual.produtos[index].quantidade += 1;
    } else {
      carrinhoAtual.produtos.push({
        produtoId: produto.id,
        quantidade: 1,
        imagem: produto.imagem,
        nome: produto.nome
      });
    }
    sessionStorage.setItem('CARRINHO', JSON.stringify(carrinhoAtual));
    toast(<> <FaCartShopping /> &nbsp; Produto adicionado no carrinho! </>);
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
                  onChange={e => setPesquisa(e.target.value)}
                />
                <span className="icone-pesquisa"><IoIosSearch size={18} /></span>
              </div>
              {!isAdmin(cargos) && !isFuncionario(cargos) && (
                <div className="linha-botoes-carrinho">
                  <div className="icone-carrinho">
                    <IoCartOutline size={40} onClick={() => { navegar(`${ROUTERS.CARRINHO}`) }} />
                  </div>
                </div>
              )}
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
                  <option value="">Categorias</option>
                  {(Array.isArray(categorias) ? categorias : []).map(cat => (
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
                adicionarNoCarrinho={() => { adicionarAoCarrinho(produto) }}
                abrirModal={() => { abrirModal(produto) }}
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
