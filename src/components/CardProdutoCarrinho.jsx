
import { FaMinus, FaPlus } from 'react-icons/fa';
import './CardProdutoCarrinho.css'
import { useEffect, useState } from 'react';

function CardProdutoCarrinho(props){

    const [carrinho, setCarrinho] = useState(props.carrinho);
    
    // lógica para definir quantidade de equipamentos
    const [quantidade, setQuantidade] = useState(props.quantidade || 1);
    useEffect(() => {
        
        if(!props.apenasLeitura){

            if(quantidade <= 0){
                setQuantidade(1)
            }
    
            carrinho[carrinho.findIndex(x => x.produtoId == props.id)].quantidade = quantidade;
            const json = JSON.parse(sessionStorage.CARRINHO);
            json.produtos = carrinho;
            sessionStorage.CARRINHO = JSON.stringify(json);
        }
    }, [quantidade])

    const removerProduto = () => {

        const carrinhoAtualizado = carrinho.filter(x => x.produtoId != props.id);
        const json = JSON.parse(sessionStorage.CARRINHO);
        json.produtos = carrinhoAtualizado;

        // Atualiza o sessionStorage
        sessionStorage.CARRINHO = JSON.stringify(json);
        setCarrinho(carrinhoAtualizado);
        props.onSubmit(carrinhoAtualizado);
    }

    return (
        <section className="box-produto">
            <img src={props.imagem || "/public/img-nao-disponivel.jpg"} height="100%" alt="foto do equipamento" />
            <div className="box-informacoes">
                <div className="box-nome-equipamento">
                    <span>{props.nome}</span>
                    { props.apenasLeitura ? (
                        <></>
                    ) : (
                        <button className="botao-remover-produto" onClick={removerProduto}>X</button>
                    )}
                </div>
                <div className="box-quantidade">
                    <span>Quantidade de equipamentos:</span>
                    { props.apenasLeitura ? (
                    <div className="box-definir-quantidade">
                        <span className='span-quantidade'>{quantidade}</span>
                    </div>
                    ) : (
                    <div className='box-definir-quantidade'>    
                        <button className='btn-diminuir' onClick={() => { 
                            if(quantidade > 1) {
                                setQuantidade(quantidade - 1)
                            }
                        }}><FaMinus size={20}/></button>
                        <div className='box-input-quantidade'>
                            <input type="text" maxLength="3" value={quantidade} onChange={(e) => { setQuantidade(Number(e.target.value))}}/>
                        </div>
                        <button className='btn-incrementar' onClick={() => { 
                            if(quantidade < 999){
                                setQuantidade(quantidade + 1)
                            }
                        }}><FaPlus size={20}/></button>
                    </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { CardProdutoCarrinho }