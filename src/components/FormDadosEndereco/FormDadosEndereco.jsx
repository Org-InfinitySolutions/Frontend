import './FormDadosEndereco.css'
import { Input } from '../Input.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

import {
    campoVazio,
    validarCEP,
    validarNumero
} from '../../utils/validarCampos.js'
import { formatarCEP } from '../../utils/formatacoes.js'

function FormDadosEndereco({
    dadosBase,
    setDadosBase,
    continuar,
    voltar
}){

    const [desabilitar, setDesabilitar] = useState(false);
    const [camposValidos, setCamposValidos] = useState(false);

    // useEffect
    useEffect(() => {
        const cep = dadosBase.cep.replace('-', '');
        if (cep.length == 8) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    if (res.data.erro !== "true") {
                        const caixote = res.data;
                        setDesabilitar(true);
                        setDadosBase((usuario) => ({
                            ...usuario,
                            dadosBase: {
                                ...usuario.dadosBase,
                                rua: caixote.logradouro,
                                bairro: caixote.bairro,
                                cidade: caixote.localidade,
                                estado: caixote.uf
                            }
                        }))
                    }
                })
        } else {
            setDesabilitar(false)
        }
    }, [dadosBase.cep])

    useEffect(() => {
        const cepValido = validarCEP(dadosBase.cep).valido;
        const numeroValido = validarNumero(dadosBase.numero).valido;
        const ruaPreenchida = !campoVazio(dadosBase.rua);
        const bairroPreenchido = !campoVazio(dadosBase.bairro);
        const cidadePreenchida = !campoVazio(dadosBase.cidade);
        const estadoPreenchido = !campoVazio(dadosBase.estado);
        
        setCamposValidos(cepValido && numeroValido && ruaPreenchida && bairroPreenchido && cidadePreenchida && estadoPreenchido);
    }, [dadosBase]);   

    return(
        <section className='form-dados-endereco'>
            <div>
                <Input 
                    id='cep'
                    name='cep'
                    label='* CEP:'
                    tipo='text'
                    placeholder='CEP'
                    valor={dadosBase.cep}
                    validacao={validarCEP}
                    maxLength={9}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                cep: formatarCEP(e.target.value)
                            }
                        }))
                    }}
                />
            </div>
            <div>
                <Input 
                    id='rua'
                    name='rua'
                    label='* Rua:'
                    tipo='text'
                    placeholder='Rua'
                    valor={dadosBase.rua}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                rua: e.target.value
                            }
                        }))
                    }}
                    desabilitar={desabilitar}
                />
            </div>
            <div>
                <Input 
                    id='numero'
                    name='numero'
                    label='* Número:'
                    tipo='text'
                    placeholder='Número'
                    valor={dadosBase.numero}
                    validacao={validarNumero}
                    maxLength={6}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                numero: e.target.value
                            }
                        }))
                    }}
                />
            </div>
            <div>
                <Input 
                    id='bairro'
                    name='bairro'
                    label='* Bairro:'
                    tipo='text'
                    placeholder='Bairro'
                    valor={dadosBase.bairro}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                bairro: e.target.value
                            }
                        }))
                    }}
                    desabilitar={desabilitar}
                />
            </div>
            <div className='box-cidade-estado'>
                <div className='cidade'>
                    <Input 
                        id='cidade'
                        name='cidade'
                        label='* Cidade:'
                        tipo='text'
                        placeholder='Cidade'
                        valor={dadosBase.cidade}
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                dadosBase: {
                                    ...dados.dadosBase,
                                    cidade: e.target.value
                                }
                            }))
                        }}
                        desabilitar={desabilitar}
                    />
                </div>
                <div className='estado'>
                    <Input 
                        id='estado'
                        name='estado'
                        label='* Estado:'
                        tipo='text'
                        placeholder='Estado'
                        valor={dadosBase.estado}
                        onChange={(e) => {
                            setDadosBase((dados) => ({
                                ...dados,
                                dadosBase: {
                                    ...dados.dadosBase,
                                    estado: e.target.value
                                }
                            }))
                        }}
                        desabilitar={desabilitar}
                    />
                </div>
            </div>
            <div>
                <Input 
                    id='complemento'
                    name='complemento'
                    label='Complemento:'
                    tipo='text'
                    placeholder='Complemento'
                    valor={dadosBase.complemento}
                    onChange={(e) => {
                        setDadosBase((dados) => ({
                            ...dados,
                            dadosBase: {
                                ...dados.dadosBase,
                                complemento: e.target.value
                            }
                        }))
                    }}
                />
            </div>
            <section>
                <button className='botao-voltar' onClick={voltar}>Voltar</button>
                <button className='botao-continuar' onClick={continuar} disabled={!camposValidos}>Continuar</button>
            </section>
        </section>
    )
}

export { FormDadosEndereco }