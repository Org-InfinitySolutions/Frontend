
import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../components/Navegabilidade';
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho';

import './Carrinho.css'
import { useEffect, useRef, useState } from 'react';

function Carrinho(){

    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState(() => { return JSON.parse(sessionStorage.CARRINHO).produtos });

    // ajustar, pois nao funciona
    const [atualizar, setAtualizar] = useState(false);
    const removerProduto = (carrinhoAtualizado) => {
        console.log("componente:", carrinhoAtualizado);

        const json = JSON.parse(sessionStorage.CARRINHO);
        json.produtos = carrinhoAtualizado;

        // Atualiza o sessionStorage
        sessionStorage.CARRINHO = JSON.stringify(json);
        setAtualizar(!atualizar);
        // Atualiza o estado imediatamente
        // setCarrinho(carrinhoAtualizado);
        setCarrinho(carrinhoAtualizado);

        console.log("novo carrinho:", carrinho);
    };

    // ajustar
    useEffect(() => {
        setCarrinho(JSON.parse(sessionStorage.CARRINHO).produtos);
        console.log(carrinho);
    }, [atualizar])

    return(
    <div className="carrinho">
        <h1>Conferir Carrinho</h1>
        <section className="container-equipamentos">
            {carrinho.map((item) => (
                <CardProdutoCarrinho key={item.produtoId} id={item.produtoId} nome={item.nome} imagem={item.imagem} quantidade={item.quantidade} carrinho={carrinho} onSubmit={removerProduto}/>
            ))}
        </section>
        <Navegabilidade linkVoltar={"/equipamentos"} funcaoAvancar={() => { navigate("/carrinho/endereco")}} textoAvancar={"Continuar"}/>
    </div>
    )
}

export { Carrinho }