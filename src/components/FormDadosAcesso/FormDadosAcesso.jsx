import './FormDadosAcesso.css'
import { Input } from '../Input/Input'
import { useEffect, useState } from 'react';

import {
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
} from '../../utils/validarCampos'
import { api, apiAutenticacao } from '../../provider/apiInstance';
import { ENDPOINTS } from '../../routers/endpoints';
import { exibirAviso } from '../../utils/exibirModalAviso';

function FormDadosAcesso({
    dadosBase,
    setDadosBase,
    continuar,
    voltar
}){

    const [camposValidos, setCamposValidos] = useState(false);

    // UseEffect
    useEffect(() => {
        const emailValido = validarEmail(dadosBase.email).valido;
        const senhaValida = validarSenha(dadosBase.senha).valido;
        const confirmacaoSenhaValida = validarConfirmacaoSenha(dadosBase.confirmarSenha, dadosBase.senha).valido;
        
        setCamposValidos(emailValido && senhaValida && confirmacaoSenhaValida);
    }, [dadosBase.email, dadosBase.senha, dadosBase.confirmarSenha]);

    // Métodos
    const buscarEmailNoBanco = () => {
        return apiAutenticacao.get(`${ENDPOINTS.EMAILVERIFICAR}?email=${dadosBase.email}`)
        .then((res) => {
            if(res.data.disponivel){
                enviarEmail(dadosBase.nome, dadosBase.email);
            }
            return true;
        })
        .catch((err) => {
            if(err.status == 409){
                exibirAviso('O email informado já está em uso', 'error');
            } else if(err.status == 400){
                exibirAviso('Formato de email inválido', 'error');
            }
            return false;
        })
    }

    const enviarEmail = (nome, email) => {
        api.post(ENDPOINTS.ENVIARCODIGOEMAIL, {
            nome,
            email
        });
    }

    return(
        <section className='form-dados-acesso'>
            <div>
                <Input 
                    id='email'
                    name='email'
                    label='* E-mail:'
                    tipo='email'
                    placeholder='Digite seu e-mail'
                    valor={dadosBase.email}
                    validacao={validarEmail}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                email: e.target.value
                            }
                        }))
                    }}
                />
            </div>
            <div>
                <Input 
                    id='senha'
                    name='senha'
                    label='* Senha:'
                    tipo='password'
                    placeholder='Crie uma senha'
                    valor={dadosBase.senha}
                    validacao={validarSenha}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                senha: e.target.value
                            }
                        }))
                    }}
                />
            </div>
            <div>
                <Input 
                    id='confirmarSenha'
                    name='confirmarSenha'
                    label='* Confirmar Senha:'
                    tipo='password'
                    placeholder='Confirme sua senha'
                    valor={dadosBase.confirmarSenha}
                    validacao={validarConfirmacaoSenha}
                    valorAdicional={dadosBase.senha}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                confirmarSenha: e.target.value
                            }
                        }))
                    }}
                />
            </div>
            <section>
                <button className='botao-voltar' onClick={voltar}>Voltar</button>
                <button className='botao-continuar' onClick={() => {continuar(buscarEmailNoBanco)}} disabled={!camposValidos}>Continuar</button>
            </section>
        </section>
    )
}

export { FormDadosAcesso }