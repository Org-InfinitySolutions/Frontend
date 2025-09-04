
import { FaMinus, FaPlus } from 'react-icons/fa';
import './CardProdutoCarrinho.css'

function CardProdutoCarrinho({
    id, 
    nome,
    imagem,
    quantidade,
    apenasLeitura,
    removerProduto,
    atualizarQuantidade,
    incrementarQuantidade,
    decrementarQuantidade,
}) {

    return (
        <section className="box-produto">
            <img src={imagem || "/img-nao-disponivel.jpg"} height="100%" alt="foto do equipamento" />


            <div className="box-informacoes">


                <div className="box-nome-equipamento">
                    <span>{nome}</span>
                    {apenasLeitura ? (
                        <></>
                    ) : (
                        <button className="botao-remover-produto" onClick={removerProduto}>X</button>
                    )}
                </div>


                <div className="box-quantidade">
                    <span>Quantidade de equipamentos:</span>
                    {apenasLeitura ? (
                        <div className="box-definir-quantidade">
                            <span className='span-quantidade'>{quantidade}</span>
                        </div>
                    ) : (
                        <div className='box-definir-quantidade'>
                            <button className='btn-diminuir' onClick={decrementarQuantidade}>
                                <FaMinus size={20} />
                            </button>


                            <div className='box-input-quantidade'>
                                <input type="text" maxLength="3" value={quantidade} onChange={(e) => { atualizarQuantidade(id, e.target.value) }} />
                            </div>


                            <button className='btn-incrementar' onClick={incrementarQuantidade}>
                                <FaPlus size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { CardProdutoCarrinho }