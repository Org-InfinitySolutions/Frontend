import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Produto.css';
import IconeNotebook from '../assets/notebook.png';
import IconePesquisa from '../assets/iconePesquisar.png';
import IconeCarrinho from '../assets/iconeCarrinho.png';

const Produto = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    fetch(`http://4.201.162.5:8080/api/produtos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto({
          ...data,
          nome: data.modelo,
          imagem: (typeof data.imagem === 'string' && data.imagem.trim() !== '') ? data.imagem : IconeNotebook,
        });
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return <div className="pagina-detalhes"><p>Carregando...</p></div>;
  }

  if (!produto) {
    return <div className="pagina-detalhes"><p>Produto não encontrado.</p></div>;
  }

  return (
    <div className="pagina-detalhes">
      <header className="topo-produto">
        <div className="barra-pesquisa">
          <img src={IconePesquisa} alt="Buscar" className="icone-lupa" />
          <input type="text" placeholder="Pesquisar equipamento" />
        </div>
        <div className="icone-carrinho">
          <a href="/carrinho">
            <img src={IconeCarrinho} alt="Carrinho de compras" />
          </a>
        </div>
      </header>

      <main className="conteudo-detalhes">
        <div className="info-principal">
          <img className="imagem-produto" src={produto.imagem} alt={produto.nome} />

          <div className="info-textual">
            <h2>{produto.nome}</h2>
            <h4>{produto.categoria?.nome || 'Sem categoria'}</h4>
            <button className="botao-adicionar-carrinho">ADICIONAR CARRINHO</button>
          </div>
        </div>

        <section className="descricao">
          <h3>DESCRIÇÃO</h3>
          <p>{produto.descricao || 'Sem descrição disponível.'}</p>
        </section>
        
        <p className="info-fabricante">
          Para mais informações do equipamento. Consulte o {produto.url_fabricante ? (
            <a href={produto.url_fabricante} target="_blank" rel="noreferrer">fabricante</a>
          ) : (
            'fabricante'
          )}.
        </p>
      </main>
    </div>
  );
};

export { Produto };
