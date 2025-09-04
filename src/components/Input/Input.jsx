import { useEffect, useState } from 'react';
import './Input.css';
import { MensagemErro } from '../MensagemErro/MensagemErro';
function Input(props) {
    const [mensagemErro, setMensagemErro] = useState("");
    const [campoInteragido, setCampoInteragido] = useState(false);

    useEffect(() => {
        if (props.validacao && props.valor !== undefined && campoInteragido) {
            validarCampo(props.valor, props.valorAdicional);
        }
    }, [props.valor, props.valorAdicional, campoInteragido]);

    const validarCampo = (valor, valorAdicional) => {
        if (!props.validacao) return;

        const resultado = props.validacao(valor, valorAdicional);

        if (resultado && typeof resultado === 'object') {
            if (!resultado.valido) {
                setMensagemErro(resultado.mensagem);
            } else {
                setMensagemErro("");
            }
        }
    };

    const verificarCampoAoSair = () => {
        setCampoInteragido(true);
        validarCampo(props.valor, props.valorAdicional);
    }; return (
        <>
            <div className="container-input">
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    type={props.tipo}
                    id={props.id}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onBlur={verificarCampoAoSair}
                    value={props.valor}
                    maxLength={props.maxLength || ""}
                    disabled={props.desabilitar || false}
                    className={`${mensagemErro ? "erro" : ""} ${props.className || ""}`}
                />
                {mensagemErro && <MensagemErro mensagem={mensagemErro} />}
            </div>
        </>
    )
}

export { Input };