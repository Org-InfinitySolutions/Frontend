
import './BotaoVoltar.css'

function BotaoVoltar(props){

    return (
        <a className='botao-retroceder' href={props.link}>{props.acao}</a>
    )
}

export { BotaoVoltar }