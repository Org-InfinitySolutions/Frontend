import './FormDadosPessoais.css'
import { Input } from '../Input'
import { useState, useEffect } from 'react';
import { api } from '../../provider/apiInstance';

import { formatarRegistroGeral, formatarCNPJ, formatarCPF, formatarTelefone, formatarTelefoneFixo, formatarCEP } from '../../utils/formatacoes';
import {
    validarNome, 
    validarRG,
    validarCPF, 
    validarTelefone, 
    validarTelefoneFixo, 
    validarCNPJ,
    validarRazaoSocial
} from '../../utils/validarCampos';
import { exibirAviso } from '../../utils/exibirModalAviso';
import { ENDPOINTS } from '../../routers/endpoints';

function FormDadosPessoais({
    tipoUsuario,
    dadosCnpj,
    setDadosCnpj,
    dadosCpf,
    setDadosCpf,
    continuar
}){

    const [camposvalidos, setCamposValidos] = useState(false);
    
    // useEffects
    useEffect(() => {
        if (tipoUsuario === 'fisica') {
            const nomeValido = validarNome(dadosCpf.dadosBase.nome).valido;
            const rgValido = validarRG(dadosCpf.rg).valido;
            const cpfValido = validarCPF(dadosCpf.cpf).valido;
            const celularValido = validarTelefone(dadosCpf.dadosBase.celular).valido;
            
            setCamposValidos(nomeValido && rgValido && cpfValido && celularValido);
        } else {
            const nomeValido = validarNome(dadosCnpj.dadosBase.nome).valido;
            const razaoSocialValida = validarRazaoSocial(dadosCnpj.razaoSocial).valido;
            const cnpjValido = validarCNPJ(dadosCnpj.cnpj).valido;
            const celularValido = validarTelefone(dadosCnpj.dadosBase.celular).valido;
            const telefoneValido = validarTelefoneFixo(dadosCnpj.telefone).valido;
            
            setCamposValidos(nomeValido && razaoSocialValida && cnpjValido && celularValido && telefoneValido);
        }
    }, [tipoUsuario, dadosCpf, dadosCnpj]);   

    // Métodos
    const buscarCpfNoBanco = () => {
        return api.get(`${ENDPOINTS.GETUSUARIOCPF}?cpf_like=${dadosCpf.cpf}`)
        .then((res) => {
            return true;
        })
        .catch((err) => {
            exibirAviso('O CPF informado já está em uso', 'error');
            return false;
        })
    }

    const buscarCnpjNoBanco = () => {
        return api.get(`${ENDPOINTS.GETUSUARIOCNPJ}?cnpj_like=${dadosCnpj.cnpj}`)
        .then((res) => {
            return true;
        })
        .catch((err) => {
            exibirAviso('O CNPJ informado já está em uso', 'error');
            return false;
        })
    }

    return(
        <section className='form-dados-pessoais'>
            {tipoUsuario == 'fisica' ? (
                <>
                    <div>
                        <Input
                            id='nome'
                            name='nome'
                            label='* Nome Completo:'
                            tipo='text'
                            placeholder='Nome Completo'
                            valor={dadosCpf.dadosBase.nome}
                            validacao={validarNome}
                            onChange={(e) => {
                                setDadosCpf((pf) => ({
                                    ...pf,
                                    dadosBase: {
                                        ...pf.dadosBase,
                                        nome: e.target.value
                                    }
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='cpf'
                            name='cpf'
                            label='* CPF:'
                            tipo='text'
                            placeholder='Ex.: 999.999.999-99'
                            valor={dadosCpf.cpf}
                            validacao={validarCPF}
                            maxLength={14}
                            onChange={(e) => {
                                setDadosCpf(pf => ({
                                    ...pf,
                                    cpf: formatarCPF(e.target.value)
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='rg'
                            name='rg'
                            label='* RG:'
                            tipo='text'
                            placeholder='Ex.: 99.999.999-9'
                            valor={dadosCpf.rg}
                            validacao={validarRG}
                            maxLength={12}
                            onChange={(e) => {
                                setDadosCpf(pf => ({
                                    ...pf,
                                    rg: formatarRegistroGeral(e.target.value)
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='celular'
                            name='celular'
                            label='* Celular:'
                            tipo='text'
                            placeholder='Ex.: (99) 99999-9999'
                            valor={dadosCpf.dadosBase.celular}
                            validacao={validarTelefone}
                            maxLength={15}
                            onChange={(e) => {
                                setDadosCpf((pf) => ({
                                    ...pf,
                                    dadosBase: {
                                        ...pf.dadosBase,
                                        celular: formatarTelefone(e.target.value)
                                    }
                                }))
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <Input
                            id='nome-fantasia'
                            name='nome-fantasia'
                            label='* Nome Fantasia:'
                            tipo='text'
                            placeholder='Nome Fantasia'
                            valor={dadosCnpj.dadosBase.nome}
                            validacao={validarNome}
                            onChange={(e) => {
                                setDadosCnpj((pj) => ({
                                    ...pj,
                                    dadosBase: {
                                        ...pj.dadosBase,
                                        nome: e.target.value
                                    }
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='razao-social'
                            name='razao-social'
                            label='* Razão Social:'
                            tipo='text'
                            placeholder='Razão Social'
                            valor={dadosCnpj.razaoSocial}
                            validacao={validarRazaoSocial}
                            onChange={(e) => {
                                setDadosCnpj((pj) => ({
                                    ...pj,
                                    razaoSocial: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='cnpj'
                            name='cnpj'
                            label='* CNPJ:'
                            tipo='text'
                            placeholder='Ex.: 99.999.999/9999-99'
                            valor={dadosCnpj.cnpj}
                            validacao={validarCNPJ}
                            maxLength={18}
                            onChange={(e) => {
                                setDadosCnpj((pj) => ({
                                    ...pj,
                                    cnpj: formatarCNPJ(e.target.value)
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='celular'
                            name='celular'
                            label='* Celular:'
                            tipo='text'
                            placeholder='Ex.: (99) 99999-9999'
                            valor={dadosCnpj.dadosBase.celular}
                            validacao={validarTelefone}
                            maxLength={15}
                            onChange={(e) => {
                                setDadosCnpj((pj) => ({
                                    ...pj,
                                    dadosBase: {
                                        ...pj.dadosBase,
                                        celular: formatarTelefone(e.target.value)
                                    }
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <Input
                            id='telefone'
                            name='telefone'
                            label='* Telefone:'
                            tipo='text'
                            placeholder='Ex.: (99) 9999-9999'
                            valor={dadosCnpj.telefone}
                            validacao={validarTelefoneFixo}
                            maxLength={14}
                            onChange={(e) => {
                                setDadosCnpj((pj) => ({
                                    ...pj,
                                    telefone: formatarTelefoneFixo(e.target.value)
                                }))
                            }}
                        />
                    </div>       
                </>
            )} 
            <section>
                <button 
                    onClick={() => {tipoUsuario == 'fisica' ? continuar(buscarCpfNoBanco) : continuar(buscarCnpjNoBanco)}} 
                    disabled={!camposvalidos}>
                        Continuar
                </button>
            </section>
        </section>
    )
}

export { FormDadosPessoais }