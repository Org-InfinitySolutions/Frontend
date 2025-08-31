
import { useEffect, useRef } from "react";
import './ConfirmacaoEmail.css'

function ConfirmacaoEmail({
    onSubmit
}){

    const inputRefs = [useRef(''), useRef(''), useRef(''), useRef(''), useRef(''), useRef('')];
    const retornarCodigoConfirmacao = () => {

        let codigo = '';
        inputRefs.map((item) => {
            codigo += item.current.value;
        })    

        onSubmit(codigo);
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
        <form className='container-confirmar-email' onSubmit={(e) => e.preventDefault()}>
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
            <div className="eventos">
                <button
                    type='submit'
                    className='botao-confirmar-email'
                    onClick={retornarCodigoConfirmacao}>
                    Confirmar
                </button>
            </div>
        </form>
    )
}

export { ConfirmacaoEmail }