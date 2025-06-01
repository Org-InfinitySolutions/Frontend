import "./Navegabilidade.css"

function Navegabilidade(props){

    return(
        <section className='navegabilidade'>
            <a href={props.linkVoltar}>Voltar</a>
            <button onClick={props.funcaoAvancar || ""} disabled={props.desabilitar || false}>{props.textoAvancar || "Continuar"}</button>
        </section>
    )
}

export { Navegabilidade }