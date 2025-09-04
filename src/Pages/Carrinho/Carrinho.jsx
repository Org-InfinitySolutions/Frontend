import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../../components/Navegabilidade/Navegabilidade';
import { CardProdutoCarrinho } from '../../components/CardProdutoCarrinho/CardProdutoCarrinho';
import { FaShoppingCart } from 'react-icons/fa';

import './Carrinho.css'
import { useState } from 'react';
import { ROUTERS } from '../../routers/routers';
function Carrinho() {

    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.CARRINHO).produtos);

    const atualizarQuantidade = (produtoId, novaQuantidade) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            novoCarrinho[index].quantidade = Number(novaQuantidade) || 1;
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const incrementarQuantidade = (produtoId) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            if(novoCarrinho[index].quantidade < 999) {
                novoCarrinho[index].quantidade += 1;
            }
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const decrementarQuantidade = (produtoId) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            if(novoCarrinho[index].quantidade > 1){
                novoCarrinho[index].quantidade -= 1;
            }
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const removerProduto = (produtoId) => {
        const novoCarrinho = [...carrinho];

        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);

        if (index >= 0) {
            novoCarrinho.splice(index, 1);
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const atualizarCarrinho = (novoCarrinho) => {
        setCarrinho(novoCarrinho);
        const json = JSON.parse(sessionStorage.CARRINHO);
        json.produtos = novoCarrinho
        sessionStorage.CARRINHO = JSON.stringify(json);
    }

    return (
        <div className="carrinho">
            <div className="carrinho-header">
                <h1>Meu Carrinho</h1>
            </div>
            {carrinho.length == 0 ? (
                <div className='carrinho-vazio'>
                    <div className='carrinho-vazio-icon'>
                        <FaShoppingCart />
                    </div>
                    <h2>Seu carrinho está vazio</h2>
                    <p>Você ainda não tem produtos adicionados ao seu carrinho.</p>
                    <p>Explore nossa seleção de equipamentos e encontre o que você precisa!</p>
                    <button className="btn-explorar-produtos" onClick={() => navigate(ROUTERS.EQUIPAMENTOS)}>
                        Explorar Equipamentos
                    </button>
                </div>
            ) : (
                <>
                    <section className="container-equipamentos">
                        {carrinho.map((item, i) => (
                            <CardProdutoCarrinho
                                id={item.produtoId}
                                key={`${i}_${item.produtoId}`}
                                nome={item.nome}
                                imagem={item.imagem}
                                quantidade={item.quantidade}
                                apenasLeitura={false}
                                atualizarQuantidade={atualizarQuantidade}
                                removerProduto={() => removerProduto(item.produtoId)}
                                incrementarQuantidade={() => incrementarQuantidade(item.produtoId)}
                                decrementarQuantidade={() => decrementarQuantidade(item.produtoId)}
                            />
                        ))}
                    </section>
                    <Navegabilidade linkVoltar={ROUTERS.EQUIPAMENTOS} funcaoAvancar={() => { navigate(ROUTERS.CARRINHOENDERECO) }} textoAvancar={"Continuar"} />
                </>
            )}
        </div>
    )
}

export { Carrinho }