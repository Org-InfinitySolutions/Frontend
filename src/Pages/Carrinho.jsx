
import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../components/Navegabilidade';

import './Carrinho.css'

function Carrinho(){

    const navigate = useNavigate();

    return(
    <div className="carrinho">
        <h1>Conferir Carrinho</h1>
        <section className="container-equipamentos">
            {/* Para exibir os produtos um laço de repetição será aplicado na tag abaixo */}
            <section className="box-produto">
                <img src="/logoNova.jpg" height="100%" alt="" />
                <div className="box-informacoes">
                    <div className="box-nome-equipamento">
                        <span>Nova Locações</span>
                        <button>X</button>
                    </div>
                    <div className="box-alterar-quantidade">
                        <span>Quantidade de equipamentos:</span>
                        <button className='btn-diminuir'>-</button>
                        <div>
                            <input type="text" defaultValue="1" maxLength="3"/>
                        </div>
                        <button className='btn-incrementar'>+</button>
                    </div>
                </div>
            </section>
        </section>
        <Navegabilidade largura={"74%"} linkVoltar={"/equipamentos"} funcaoAvancar={() => { navigate("/carrinho/endereco")}} textoAvancar={"Continuar"}/>
    </div>
    )
}

export { Carrinho }