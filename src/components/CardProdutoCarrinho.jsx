
import { FaMinus, FaPlus } from 'react-icons/fa';
import IconeNotebook from '../assets/notebook.png'
import './CardProdutoCarrinho.css'
import { useEffect, useState } from 'react';

function CardProdutoCarrinho(props){

    const [quantidade, setQuantidade] = useState(1);
    useEffect(() => {
        if(quantidade <= 0){
            setQuantidade(1)
        }
    }, [quantidade])
    
    return (
        <section className="box-produto">
            <img src={IconeNotebook} height="100%" alt="" />
            <div className="box-informacoes">
                <div className="box-nome-equipamento">
                    <span>Nova Locações</span>
                    { props.apenasLeitura ? (
                        <></>
                    ) : (
                        <button className="botao-remover-produto">X</button>
                    )}
                </div>
                <div className="box-quantidade">
                    <span>Quantidade de equipamentos:</span>
                    { props.apenasLeitura ? (
                    <div className="box-definir-quantidade">
                        <span className='span-quantidade'>999</span>
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