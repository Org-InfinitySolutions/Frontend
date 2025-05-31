
import { useRef } from "react";
import './ConfirmacaoEmail.css'

function ConfirmacaoEmail(props){

    const inputRefs = [useRef(''), useRef(''), useRef(''), useRef(''), useRef(''), useRef('')];
    const retornarCodigoConfirmacao = () => {

        let codigo = '';
        inputRefs.map((item) => {
            codigo += item.current.value;
        })    

        props.onSubmit(codigo);
    }

    // funcao para colocar o foco no proximo campo
    const handleChange = (e, index) => {
        
        const valor = e.target.value.toUpperCase();
        e.target.value = valor;

        if (valor.length === 1 && inputRefs[index + 1]) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <form className='container-formulario-4' onSubmit={(e) => e.preventDefault()}>
            <h1>Confirmação de e-mail</h1>
            <p>Preencha abaixo o código de confirmação que enviamos ao seu e-mail.</p>
            <div className='codigo-confirmacao'>
                {inputRefs.map((ref, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={ref}
                    onChange={(e) => handleChange(e, index)}
                    />
                ))}
            </div>
            <div className="botoes-etapa-4">
                <button
                    type='button'
                    className='botao-voltar-etapa-4'
                    onClick={() => props.setEtapa(props.etapa)}>
                    Voltar
                </button>
                <button
                    type='submit'
                    className='botao-confirmar-etapa-4'
                    onClick={retornarCodigoConfirmacao}>
                    Confirmar
                </button>
            </div>
        </form>
    )
}

export { ConfirmacaoEmail }