import React from 'react';
import './Equipamentos.css';
import IconePesquisa from '../assets/iconePesquisar.png';
import IconeCarrinho from '../assets/iconeCarrinho.png';
import IconeCarrinhoFill from '../assets/iconeCarrinhoFill.png';
import IconeNotebook from '../assets/notebook.png'

const produtos = Array(20).fill({
    nome: 'Notebook',
    imagem: IconeNotebook,
});

function abrirModal(produto) {

}

const Equipamentos = () => {
    return (
        <div className="pagina-equipamentos">
            <main className="conteudo-equipamentos">
                <div className="filtros">
                    <div className="linha-botoes-carrinho">
                        <div className="botoes-toggle">
                            <a className="ativo">EQUIPAMENTOS</a>
                            <a href="/pedidos" className="inativo">PEDIDOS</a>
                        </div>
                        <div className="icone-carrinho">
                            <a href="/carrinho">
                                <img src={IconeCarrinho} alt="Carrinho de compras" />
                            </a>
                        </div>
                    </div>

                    <div className="linha-pesquisa-filtros">
                        <div className="barra-pesquisa-container">
                            <input className="input-pesquisa" placeholder="Pesquisar equipamento" />
                            <img className="icone-pesquisa" src={IconePesquisa} alt="Pesquisar" />
                        </div>

                        <div className="container-filtros">
                            <select className="select-filtro">
                                <option>Notebooks</option>
                                <option>Projetores</option>
                            </select>

                            <button className="botao-secundario">Exibir mais procurados</button>
                        </div>
                    </div>
                </div>

                <h2>Equipamentos disponíveis</h2>

                <div className="grid-produtos">
                    {produtos.map((produto, index) => (
                        <div className="card-produto" key={index}>
                            <img src={produto.imagem} alt={produto.nome} />
                            <div className="info-produto">
                                <a className='nomeProduto' href='/produto'>{produto.nome}</a>
                                <div className="botoes-card">
                                    <button className="botao-adicionar" onClick={() => abrirModal(produto)}>+</button>
                                    <button className="botao-carrinho">
                                        <img src={IconeCarrinhoFill} className="icone-carrinho-miniatura" alt="Carrinho" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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

export { Equipamentos };
