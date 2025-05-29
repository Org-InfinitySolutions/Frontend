import React, { useEffect } from 'react';
import './DetalharPedidosAdm.css'
import IconeNotebook from '../assets/notebook.png'
import { CardProduto } from '../components/CardProduto'
import axios from 'axios';


const itens = Array(10).fill({
  nome: 'Notebook',
  imagem: IconeNotebook
});

export function DetalharPedidosAdm() {
    const produtos = [
        { nome: 'Notebook Asus', erroEstoque: true },
        { nome: 'Notebook Asus', erroEstoque: true },
        { nome: 'Notebook Asus', erroEstoque: false },
        { nome: 'Notebook Asus', erroEstoque: true },
        { nome: 'Notebook Asus', erroEstoque: true },
        { nome: 'Notebook Asus', erroEstoque: false },
        { nome: 'Notebook Asus', erroEstoque: false },
    ];

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
                    <p>Nome: Cláudio</p>
                    <p>CNPJ: 18.890.109/0001-18</p>
                    <p>Celular: (11) 99999-9999</p>
                    <p>E-mail: loremIpsum@gmail.com</p>
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

            <div>
                <h3 className="">Endereço</h3>
                <div className="">
                    <p>CEP:12345-678</p>
                    <p>Rua:Avenida César</p>
                    <p>Número:1234</p>
                    <p>Bairro:Taboão da Serra</p>
                    <p>Estado:SP</p>
                    <p>Cidade:São Paulo</p>
                    <p>Complemento:Próximo do metrô</p>
                </div>
            </div>


            <div className="">
                <p>Data e hora de entrega:10/10/2025 13:00</p>
                <p>Data e hora de retirada:13/10/2025 13:00:00</p>
            </div>


            <div>
                <h3 className="">Descrição do Projeto</h3>
                <p className="">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit quas voluptatibus eaque
                    doloremque asperiores nesciunt, nostrum temporibus atque perferendis, repellendus vero,
                    itaque odio expedita totam eos distinctio maxime cum veritatis? Lorem ipsum dolor Lorem
                    ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
            </div>


            <div>
                <p> DOCUMENTO AUXILIAR</p>
                <button className="">BAIXAR</button>
            </div>
        </div>
    );
};


