import React, { useEffect } from 'react';
import './DetalharPedidos.css'
import IconeNotebook from '../assets/notebook.png'
import { CardProduto } from '../components/CardProduto'
import axios from 'axios';


const itens = Array(9).fill({
    nome: 'Notebook',
    imagem: IconeNotebook
});

export function DetalharPedidos() {

    return (
        <div className="detalhar-pedidos-adm">

            <div className="numero-serie-pedido">
                <div className="informacoes-pedido">
                    <p className="numero-pedido">Pedido #97895</p>
                    <p className="data-pedido">Pedido feito em: 01/02/2024</p>
                </div>
                <div className="condicoes-pedido">
                    <span className="situacao-pedido">Em análise</span>
                    <button className="btn-mudar-situacao">Mudar Situação</button>
                </div>
            </div>


            <div className="dados-cliente">
                <div className='dados'>
                    <p><strong>Nome:</strong> Cláudio</p>
                    <p><strong>CNPJ: </strong>18.890.109/0001-18</p>
                    <p><strong>Celular: </strong>(11) 99999-9999</p>
                    <p><strong>E-mail: </strong>loremIpsum@gmail.com</p>
                </div>
                <div className='documentos-baixar'>
                    <p>Documentos:</p>
                    <button className="btn-baixar-dados">BAIXAR</button>
                </div>
            </div>


            <div className='grid-itens'>
                <div className="lista-itens-vertical">
                    {itens.map((item, index) => (
                        <CardProduto
                            image={IconeNotebook}
                            name={"teste"}
                            quantidade={60}
                        />
                    ))}
                </div>
            </div>

            <div className="endereco-pedido">
                <h3>Endereço</h3>

                <div className="grid-linha">
                    <p><strong>CEP:</strong> 12345-678</p>
                    <p><strong>Rua:</strong> Avenida Padre Estanislau de Campos</p>
                    <p><strong>Número:</strong> 1234</p>
                </div>

                <div className="grid-linha">
                    <p><strong>Bairro:</strong> Taboão da Serra</p>
                    <p><strong>Estado:</strong> SP</p>
                    <p><strong>Cidade:</strong> São Paulo</p>
                </div>

                <div className="grid-linha grid-1">
                    <p><strong>Complemento:</strong> Próximo do metrô</p>
                </div>

                <div className="grid-linha">
                    <p><strong>Data e hora de entrega:</strong> 10/10/2025 13:00</p>
                    <p><strong>Data e hora de retirada:</strong> 13/10/2025 13:00</p>
                </div>
            </div>

            <div className="descricao-projeto">
                <h3 className="titulo-descricao">Descrição do Projeto</h3>
                <p className="texto-descricao">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit quas voluptatibus eaque
                    doloremque asperiores nesciunt, nostrum temporibus atque perferendis, repellendus vero,
                    itaque odio expedita totam eos distinctio maxime cum veritatis? Lorem ipsum dolor Lorem
                    ipsum dolor, sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, natus magni optio
                    nihil facilis sequi similique ullam atque magnam totam alias reiciendis distinctio,
                    facere quisquam dignissimos, aspernatur at ea vero!
                </p>
            </div>


            <div className="documento-auxiliar">
                <p className="titulo-documento">Documento auxiliar:</p>
                <button className="btn-baixar-dados">BAIXAR</button>
            </div>

        </div>
    );
};


