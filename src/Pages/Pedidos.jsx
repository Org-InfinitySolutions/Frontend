import React from 'react';
import './Pedidos.css';
import IconePesquisa from '../assets/iconePesquisar.png';

const pedidos = [
    { status: 'Em análise', cor: 'cinza' },
    { status: 'Aprovado', cor: 'verde' },
    { status: 'Em evento', cor: 'azul' },
    { status: 'Em evento', cor: 'azul' },
    { status: 'Finalizado', cor: 'vermelho' },
    { status: 'Finalizado', cor: 'vermelho' },
];

const Pedidos = () => {
    return (
        <div className="pagina-pedidos">
            <main className="conteudo-pedidos">
                <div className="filtros">
                    <div className="botoes-toggle">
                        <button className="inativo">EQUIPAMENTOS</button>
                        <button className="ativo">PEDIDOS</button>
                    </div>

                    <div className="linha-pesquisa-filtros">
                        <div className="barra-pesquisa-container">
                            <input className="input-pesquisa" placeholder="Pesquisar número pedido" />
                            <img className="icone-pesquisa" src={IconePesquisa} alt="Pesquisar" />
                        </div>

                        <div className="container-filtros">
                            <select className="select-filtro">
                                <option>Situação</option>
                            </select>

                            <select className="select-filtro">
                                <option>Mais Recentes</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid-pedidos">
                    {pedidos.map((pedido, index) => (
                        <div className="card-pedido" key={index}>
                            <h3>Pedido 123456</h3>
                            <p>Itens: 12</p>
                            <p>Data: 01/12/2009</p>
                            <div className="acoes">
                                <span className={`status ${pedido.cor}`}>{pedido.status}</span>
                                <button className="btn-detalhes">Detalhes</button>
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

export { Pedidos };
