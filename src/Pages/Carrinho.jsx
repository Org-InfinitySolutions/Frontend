
import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../components/Navegabilidade';
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho';

import './Carrinho.css'
import { useState } from 'react';
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
            <h1>Conferir Carrinho</h1>
            {carrinho.length == 0 ? (
                <div className='box-sem-produtos'>
                    <h2>Você não tem produtos adicionados.</h2>
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
                    <Navegabilidade linkVoltar={"/equipamentos"} funcaoAvancar={() => { navigate("/carrinho/endereco") }} textoAvancar={"Continuar"} />
                </>
            )}
        </div>
    )
}

export { Carrinho }