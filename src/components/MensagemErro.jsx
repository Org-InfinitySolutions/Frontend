import './MensagemErro.css';

export function MensagemErro(props){

    return (
    <div className="error">
        {props.mensagem}*
    </div>
    )
}
