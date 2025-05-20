import React from 'react';
import './Produto.css';
import IconeNotebook from '../assets/notebook.png';
import IconePesquisa from '../assets/iconePesquisar.png';
import IconeCarrinho from '../assets/iconeCarrinho.png';

const Produto = () => {
  return (
    <div className="pagina-detalhes">
      <header className="topo-produto">
        <div className="barra-pesquisa">
          <img src={IconePesquisa} alt="Buscar" className="icone-lupa" />
          <input type="text" placeholder="Pesquisar equipamento" />
        </div>
        <div className="icone-carrinho">
          <img src={IconeCarrinho} alt="Carrinho de compras" />
        </div>
      </header>

      <main className="conteudo-detalhes">
        <div className="info-principal">
          <img className="imagem-produto" src={IconeNotebook} alt="Notebook Asus" />

          <div className="info-textual">
            <h2>Notebook Asus</h2>
            <h4>ASUS</h4>
            <button className="botao-adicionar-carrinho">ADICIONAR CARRINHO</button>
          </div>
        </div>

        <section className="descricao">
          <h3>DESCRIÇÃO</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt rem quam pariatur alias! Fuga aliquid, ipsa officia sint ducimus totam facilis rem? Accusantium ducimus molestiae quisquam minus quasi eius consequatur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad rerum mollitia excepturi voluptatibus commodi molestiae laborum doloremque voluptate ea maxime, placeat animi deleniti velit ipsum eum pariatur sunt natus numquam! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis nesciunt qui modi porro aspernatur, saepe, temporibus obcaecati quidem nulla consequatur excepturi exercitationem? Consectetur consequatur inventore amet distinctio eligendi, provident neque?</p>
        </section>

        {/* <section className="ficha-tecnica">
          <h3>FICHA TÉCNICA</h3>
          <div className="tabela-detalhes">
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
            <div><strong>DETALHE</strong><p>Lorem ipsum dolor, sit amet</p></div>
          </div>
        </section> */}

        <p className="info-fabricante">
          Para mais informações do equipamento. Consulte o <a href="https://www.asus.com/br/" target="_blank" rel="noreferrer">fabricante</a>.
        </p>
      </main>
    </div>
  );
};

export { Produto };
