
import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../components/Navegabilidade';
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho';

import './Carrinho.css'

function Carrinho(){

    const navigate = useNavigate();

    return(
    <div className="carrinho">
        <h1>Conferir Carrinho</h1>
        <section className="container-equipamentos">
            {/* Para exibir os produtos um laço de repetição será aplicado na tag abaixo */}
            <CardProdutoCarrinho />       
        </section>
        <Navegabilidade linkVoltar={"/equipamentos"} funcaoAvancar={() => { navigate("/carrinho/endereco")}} textoAvancar={"Continuar"}/>
    </div>
    )
}

export { Carrinho }