import { useNavigate } from "react-router-dom"
import "./Navegabilidade.css"

function Navegabilidade(props){

    const navegar = useNavigate();

    return(
        <section className='navegabilidade'>

            {props.linkVoltar && (
                <button 
                    className="btn-voltar" 
                    onClick={() => {navegar(props.linkVoltar)}} 
                    href={props.linkVoltar}
                >
                    Voltar
                </button>
            )}
            
            {props.funcaoAvancar && (
                <button 
                    className="btn-prosseguir" 
                    onClick={props.funcaoAvancar} 
                    disabled={props.desabilitar || false}
                >
                    {props.textoAvancar || "Continuar"}
                </button>
            )}
        </section>
    )
}

export { Navegabilidade }