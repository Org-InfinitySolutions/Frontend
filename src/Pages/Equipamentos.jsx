import React, { useState } from 'react';
import './Equipamentos.css';
import Modal from '../components/ModalEquipamento';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoCartSharp } from "react-icons/io5";
import IconeNotebook from '../assets/notebook.png';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';

const produtos = Array(20).fill({
  nome: 'Notebook Asus',
  imagem: IconeNotebook,
  marca: 'ASUS',
  descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit quas voluptatibus eaque doloremque asperiores nesciunt.',
  linkFabricante: 'https://www.asus.com/br/',
});

const Equipamentos = () => {
  const navegar = useNavigate();

  const [produtoSelecionado, setProdutoSelecionado] = useState(null),
    [filtroStatus, setFiltroStatus] = useState(''),
    [filtroStatusAberto, setFiltroStatusAberto] = useState(false),
    [pesquisa, setPesquisa] = useState(''),
    [produtosExibidos, setProdutosExibidos] = useState(produtos),
    [mostrarMaisProcurados, setMostrarMaisProcurados] = useState(false),
    [barraCarregamento, setBarraCarregamento] = useState(0);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
  };

  React.useEffect(() => {
    let filtrados = produtos;
    if (filtroStatus) {
      filtrados = filtrados.filter(p => {
        if (filtroStatus === 'Projeção') return p.nome.toLowerCase().includes('projetor');
        if (filtroStatus === 'Informática') return p.nome.toLowerCase().includes('notebook');
        return true;
      });
    }
    if (pesquisa) {
      filtrados = filtrados.filter(p => p.nome.toLowerCase().includes(pesquisa.toLowerCase()));
    }
    if (mostrarMaisProcurados) {
      filtrados = [...filtrados].reverse();
    }
    setProdutosExibidos(filtrados);
  }, [filtroStatus, pesquisa, mostrarMaisProcurados]);

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
            <div className="botoes-toggle">
              <a className="ativo">EQUIPAMENTOS</a>
              <a href="/pedidos" className="inativo">PEDIDOS</a>
            </div>
            <div className="icone-carrinho">
              <IoCartOutline size={40} onClick={() => { navegar('/carrinho')}}/>
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
                  <option value="Projeção">Projeção</option>
                  <option value="Informática">Informática</option>
                </select>
                <IoIosArrowDown className={`icone-arrow-select${filtroStatusAberto ? ' aberto' : ''}`}/>
              </div>
              <button className="botao-secundario" onClick={() => setMostrarMaisProcurados(m => !m)}>
                {mostrarMaisProcurados ? 'Exibir todos' : 'Exibir mais procurados'}
              </button>
            </div>
          </div>
        </div>

        <h2>Equipamentos disponíveis</h2>

        <div className="grid-produtos">
          {produtosExibidos.length === 0 ? (
            <div className='nenhum-pedido'>Nenhum produto encontrado.</div>
          ) : (
            produtosExibidos.map((produto, index) => (
              <div className="card-produto" key={index}>
                <img src={produto.imagem} alt={produto.nome} />
                <div className="info-produto">
                  <a className='nomeProduto' href='/produto'>{produto.nome}</a>
                  <div className="botoes-card">
                    <button className="botao-adicionar" onClick={() => abrirModal(produto)}>+</button>
                    <button className="botao-carrinho">
                      <IoCartSharp className="icone-carrinho-miniatura" size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))
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

        <div className="contato">
          Não encontrou o que buscava? <a href="#">Contate-nos</a>
        </div>

        {produtoSelecionado && (
          <Modal produto={produtoSelecionado} onClose={fecharModal} />
        )}
      </main>
    </div>
  );
};

export { Equipamentos };