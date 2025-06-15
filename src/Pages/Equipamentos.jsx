import React, { useState, useEffect } from 'react';
import './Equipamentos.css';
import Modal from '../components/ModalEquipamento';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import ImgNaoDisponivel from '/public/img-nao-disponivel.jpg';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import { api } from '../provider/apiInstance';
import Paginacao from '../components/Paginacao';
import { CardProdutoEquipamentos } from '../components/CardProdutoEquipamentos'
import { ToastContainer, toast } from 'react-toastify';
import { FaCartShopping } from 'react-icons/fa6';
import { BotoesFuncionalidades } from '../components/BotoesFuncionalidades';
import { tokenExpirou } from '../Utils/token';
import { exibirAvisoTokenExpirado } from '../Utils/exibirModalAviso';

const Equipamentos = () => {
  const navegar = useNavigate();

  const [produtoSelecionado, setProdutoSelecionado] = useState(null),
    [filtroStatus, setFiltroStatus] = useState(''),
    [filtroStatusAberto, setFiltroStatusAberto] = useState(false),
    [pesquisa, setPesquisa] = useState(''),
    [produtos, setProdutos] = useState([]),
    [produtosExibidos, setProdutosExibidos] = useState([]),
    [categorias, setCategorias] = useState([]),
    [mostrarMaisProcurados, setMostrarMaisProcurados] = useState(false),
    [barraCarregamento, setBarraCarregamento] = useState(0),
    [paginaAtual, setPaginaAtual] = useState(1),
    [cargo, setCargo] = useState(sessionStorage.CARGO);

  const produtosPorPagina = 20;

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
  };

  useEffect(() => {

    const header = sessionStorage.CARGO == "ROLE_ADMIN" || sessionStorage.CARGO == "ROLE_FUNCIONARIO";

    setBarraCarregamento(30);
    if(tokenExpirou()){
      exibirAvisoTokenExpirado(navegar)
    } else {

      api.get('/produtos', header ? { headers: { Authorization: `Bearer ${sessionStorage.TOKEN }` } } : {})
      .then((res) => {
        setBarraCarregamento(100);
        
        if(res.data.length > 0){
          const produtosApi = res.data.map(p => ({
            ...p,
            nome: p.modelo,
            imagem: (typeof p.imagem[0] === 'string' && p.imagem[0].trim() !== '')
              ? p.imagem[0]
              : ImgNaoDisponivel,
            linkFabricante: p.url_fabricante,
          }));
          setProdutos(produtosApi);
          const categoriasUnicas = [];
          produtosApi.forEach(p => {
            if (p.categoria && !categoriasUnicas.some(c => c.id === p.categoria.id)) {
              categoriasUnicas.push(p.categoria);
            }
          });
          setCategorias(categoriasUnicas);
        }
      })
    }
  }, []);

  useEffect(() => {
    let filtrados = produtos;
    if (filtroStatus) {
      filtrados = filtrados.filter(p => p.categoria && p.categoria.nome === filtroStatus);
    }
    if (pesquisa) {
      filtrados = filtrados.filter(p => p.nome.toLowerCase().includes(pesquisa.toLowerCase()));
    }
    if (mostrarMaisProcurados) {
      filtrados = [...filtrados].reverse();
    }
    setProdutosExibidos(filtrados);
    setPaginaAtual(1);
  }, [produtos, filtroStatus, pesquisa, mostrarMaisProcurados]);

  const totalPaginas = Math.ceil(produtosExibidos.length / produtosPorPagina);
  const produtosPaginados = produtosExibidos.slice(
    (paginaAtual - 1) * produtosPorPagina,
    paginaAtual * produtosPorPagina
  );

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
      <LoadingBar
        progress={barraCarregamento}
        height={3}
        color="#f11946"
      />
      <main className="conteudo-equipamentos">
        <div className="filtros">
          <div className="linha-botoes-carrinho">
            <BotoesFuncionalidades />
            <div className="icone-carrinho">
              <IoCartOutline size={40} onClick={() => { navegar('/carrinho') }} />
            </div>
          </div>

          <div className="linha-pesquisa-filtros">
            <div className="barra-pesquisa-container" style={{ position: 'relative' }}>
              <input className="input-pesquisa" placeholder="Pesquisar equipamento" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
              <span className="icone-pesquisa">
                <IoIosSearch size={18} />
              </span>
            </div>

            <div className="container-filtros">
              <div className="select-filtro-container">
                <select className="select-filtro"
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  onFocus={() => setFiltroStatusAberto(true)}
                  onBlur={() => setFiltroStatusAberto(false)}
                >
                  <option value="" disabled hidden>Categorias</option>
                  {(Array.isArray(categorias) ? categorias : []).map(cat => (
                    <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                  ))}
                </select>
                <IoIosArrowDown className={`icone-arrow-select${filtroStatusAberto ? ' aberto' : ''}`} />
              </div>
              {cargo == "ROLE_ADMIN" || cargo == "ROLE_FUNCIONARIO" ? (
                <button className="botao-secundario" onClick={() => navegar('/adicionar-equipamento')}>
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
          {produtosPaginados.length === 0 ? (
            <div className='nenhum-pedido'>Nenhum produto encontrado.</div>
          ) : (
            produtosPaginados.map((produto, index) => (
              <CardProdutoEquipamentos 
                key={index} 
                produto={produto} 
                adicionarNoCarrinho={() => {adicionarAoCarrinho(produto)}}
                abrirModal={() => {abrirModal(produto)}}/>
            ))
          )}
        </div>

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
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