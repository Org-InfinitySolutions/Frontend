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
    voltar,
    // NOVA ALTERAÇÃO: Recebendo as props do componente pai
    termosAceitos,
    setTermosAceitos,
    abrirModal
}){

    const [camposValidos, setCamposValidos] = useState(false);

    // UseEffect
    useEffect(() => {
        const emailValido = validarEmail(dadosBase.email).valido;
        const senhaValida = validarSenha(dadosBase.senha).valido;
        const confirmacaoSenhaValida = validarConfirmacaoSenha(dadosBase.confirmarSenha, dadosBase.senha).valido;
        
        // NOVA ALTERAÇÃO: A validade do formulário agora depende dos termos aceitos (apenas para habilitar o botão visualmente)
        setCamposValidos(emailValido && senhaValida && confirmacaoSenhaValida && termosAceitos);
    }, [dadosBase.email, dadosBase.senha, dadosBase.confirmarSenha, termosAceitos]); // Adicionando termosAceitos

    // Métodos
    const buscarEmailNoBanco = () => {
        // Já verificamos se os termos foram aceitos no componente pai (Cadastro.jsx) antes de chamar 'continuar'.
        // Se a chamada chegar aqui, significa que os termos já estão OK e os campos estão válidos.
        
        return apiAutenticacao.get(`${ENDPOINTS.EMAILVERIFICAR}?email=${dadosBase.email}`)
        .then((res) => {
            if(res.data.disponivel){
                enviarEmail(dadosBase.nome, dadosBase.email);
            }
            return true;
        })
        .catch((err) => {
            // ... (seu tratamento de erro)
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
            {/* ... (Seus inputs de email e senha) ... */}
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
            
            {/* NOVA ALTERAÇÃO: Checkbox e Link para o Modal */}
            <div className="termos-checkbox-container" style={{ 
                marginTop: '15px', 
                marginBottom: '15px',
                display: 'flex', 
                alignItems: 'flex-start',
                width: '100%'
            }}>
                <input 
                    type="checkbox" 
                    id="termos" 
                    checked={termosAceitos}
                    onChange={(e) => setTermosAceitos(e.target.checked)}
                    style={{ minWidth: '18px', height: '18px', cursor: 'pointer', marginRight: '8px' }}
                />
                <label htmlFor="termos" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    Li e concordo com os{" "}
                    <span 
                        className="link-termos-acesso"
                        onClick={(e) => {
                            e.preventDefault(); // Impede que o clique no link marque/desmarque o checkbox
                            abrirModal();
                        }}
                        style={{ color: '#007D1D', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        Termos e Condições
                    </span>
                </label>
            </div>
            {/* FIM DA NOVA ALTERAÇÃO */}


            <section>
                <button className='botao-voltar' onClick={voltar}>Voltar</button>
                <button 
                    className='botao-continuar' 
                    onClick={() => {continuar(buscarEmailNoBanco)}} 
                    disabled={!camposValidos} // Desabilita se os campos ou os termos não estiverem válidos
                >
                    Continuar
                </button>
            </section>
        </section>
    )
}

export { FormDadosAcesso }