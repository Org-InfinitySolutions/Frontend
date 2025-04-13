import "./Navegabilidade.css"

function Navegabilidade(props){

    return(
        <section className='navegabilidade' style={{ width: props.largura }}>
            <a href={props.linkVoltar}>Voltar</a>
            <button onClick={props.funcaoAvancar || ""}>{props.textoAvancar || "Continuar"}</button>
        </section>
    )
}

export { Navegabilidade }