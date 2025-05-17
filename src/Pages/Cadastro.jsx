import { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import './Cadastro.css';

import { formatarRegistroGeral, formatarCNPJ, formatarCPF, formatarTelefone, formatarTelefoneFixo, formatarCEP } from '../Utils/formatacoes';
import { 
    emailInvalido, 
    campoNaoAtendeTamanho, 
    campoVazio, 
    senhaInvalida, 
    validarNome, 
    validarRG,
    validarCPF, 
    validarTelefone, 
    validarTelefoneFixo, 
    validarCNPJ, 
    validarCEP,
    validarNumero, 
    validarEndereco, 
    validarEmail, 
    validarSenha,
    validarConfirmacaoSenha,
    validarRazaoSocial
} from '../utils/validarCampos';
import axios from 'axios';
import { api } from '../provider/apiInstance';
import { resolvePath, useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Cadastro() {
    const navegar = useNavigate();
    const [barraCarregamento, setBarraCarregamento] = useState(0);

    const [etapa, setEtapa] = useState(1);
    const [tipoUsuario, setTipoUsuario] = useState('fisica');
    const [etapa1Valido, setEtapa1Valido] = useState(false);
    const [etapa2Valido, setEtapa2Valido] = useState(false);
    const [etapa3Valido, setEtapa3Valido] = useState(false);

    const [dadosBase, setDadosBase] = useState({
        nome: '',
        cep: '',
        numero: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        celular: '',
    })
    const [formularioCPF, setFormularioCPF] = useState({
        dadosBase,
        rg: '',
        cpf: '',
    });
    const [formularioCNPJ, setFormularioCNPJ] = useState({
        dadosBase,
        razaoSocial: '',
        cnpj: '',
        telefone: ''
    });

    const validarFormulario = () => {

        if (etapa == 1) {

            if (tipoUsuario == 'fisica') {

                if (campoVazio(formularioCPF.dadosBase.nome) || campoVazio(formularioCPF.dadosBase.celular) || campoVazio(formularioCPF.cpf) || campoVazio(formularioCPF.rg)) {
                    exibirAviso('Preencher todos os campos obrigatórios', 'error');
                } else if (campoNaoAtendeTamanho(formularioCPF.rg, 12)) {
                    exibirAviso('O RG informado é inválido', 'error');
                } else if (campoNaoAtendeTamanho(formularioCPF.cpf, 14)) {
                    exibirAviso('O CPF informado é inválido', 'error');
                } else if (campoNaoAtendeTamanho(formularioCPF.dadosBase.celular, 15)) {
                    exibirAviso('O Celular informado é inválido', 'error');
                } else {
                    setEtapa(2);
                }
            } else {

                if (campoVazio(formularioCNPJ.dadosBase.nome) || campoVazio(formularioCNPJ.razaoSocial) || campoVazio(formularioCNPJ.telefone) || campoVazio(formularioCNPJ.cnpj) || campoVazio(formularioCNPJ.dadosBase.celular)) {
                    exibirAviso('Preencher todos os campos obrigatórios', 'error');
                } else if (campoNaoAtendeTamanho(formularioCNPJ.cnpj, 18)) {
                    exibirAviso('O CNPJ informado é inválido', 'error');
                } else if (campoNaoAtendeTamanho(formularioCNPJ.dadosBase.celular, 15)) {
                    exibirAviso('O Celular informado é inválido', 'error');
                } else if (campoNaoAtendeTamanho(formularioCNPJ.telefone, 14)) {
                    exibirAviso('O Telefone informado é inválido', 'error');
                } else {
                    setEtapa(2);
                }
            }
        } else if (etapa == 2) {

            if (campoVazio(dadosBase.cep) || campoVazio(dadosBase.bairro) || campoVazio(dadosBase.rua) || campoVazio(dadosBase.numero) || campoVazio(dadosBase.cidade) || campoVazio(dadosBase.estado)) {
                exibirAviso('Preencher todos os campos obrigatórios', 'error');
            } else {
                setEtapa(3);
            }
        } else if (etapa == 3) {

            const senha = senhaInvalida(dadosBase.senha, dadosBase.confirmarSenha);
            if (campoVazio(dadosBase.email) || campoVazio(dadosBase.senha) || campoVazio(dadosBase.confirmarSenha)) {
                exibirAviso('Preencher todos os campos obrigatórios', 'error');
            } else if (emailInvalido(dadosBase.email)) {
                exibirAviso('O e-mail informado é inválido', 'error');
            } else if (senha.invalida) {
                exibirAviso(senha.excecao, 'error');
            } else {
                const usuario = tipoUsuario == 'fisica' ? formularioCPF : formularioCNPJ
                enviarEmail(usuario.dadosBase.nome, usuario.dadosBase.email);
                setEtapa(4);
            }
        }
    }

    function enviarEmail(nome, email) {
        api.post('/emails/enviar-codigo', {
            nome,
            email
        });
    }

    function validarCodigoConfirmacao() {
        const usuario = tipoUsuario == 'fisica' ? formularioCPF : formularioCNPJ
        
        if (codigo1 == '' || codigo2 == '' || codigo3 == '' || codigo4 == '' || codigo5 == '' || codigo6 == '') {
            exibirAviso('Preencher todos os campos', 'error');
        } else {
            api.post('/emails/validar-codigo', {
                email: usuario.dadosBase.email,
                codigo: codigo1 + codigo2 + codigo3 + codigo4 + codigo5 + codigo6
            }).then((res) => {
                if(res.data.sucesso){
                cadastrarUsuario();    
                }
                else{
                    exibirAviso(res.data.mensagem, 'error')
                }
            })
        }
    }

    const [codigo1, setCodigo1] = useState('');
    const [codigo2, setCodigo2] = useState('');
    const [codigo3, setCodigo3] = useState('');
    const [codigo4, setCodigo4] = useState('');
    const [codigo5, setCodigo5] = useState('');
    const [codigo6, setCodigo6] = useState('');
    const [codigo, setCodigo] = useState('');

    /* Consultar CEP */
    const [desabilitar, setDesabilitar] = useState(false);
    useEffect(() => {

        const cep = dadosBase.cep.replace('-', '');
        if (cep.length == 8) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    if (res.data.erro !== "true") {
                        const caixote = res.data;
                        setDesabilitar(true);
                        setDadosBase((endereco) => ({
                            ...endereco,
                            rua: caixote.logradouro,
                            bairro: caixote.bairro,
                            cidade: caixote.localidade,
                            estado: caixote.uf
                        }))
                    }
                })
        } else {
            setDesabilitar(false)
        }
    }, [dadosBase.cep])

    useEffect(() => {
        if (tipoUsuario == 'fisica') {
            setFormularioCPF((dados) => ({
                ...dados,
                dadosBase
            }))
        } else {
            setFormularioCNPJ((dados) => ({
                ...dados,
                dadosBase
            }))
        }
    }, [dadosBase]);    
    
    useEffect(() => {
        if (tipoUsuario === 'fisica') {
            const nomeValido = validarNome(formularioCPF.dadosBase.nome).valido;
            const rgValido = validarRG(formularioCPF.rg).valido;
            const cpfValido = validarCPF(formularioCPF.cpf).valido;
            const celularValido = validarTelefone(formularioCPF.dadosBase.celular).valido;
            
            setEtapa1Valido(nomeValido && rgValido && cpfValido && celularValido);
        } else {
            const nomeValido = validarNome(formularioCNPJ.dadosBase.nome).valido;
            const razaoSocialValida = validarRazaoSocial(formularioCNPJ.razaoSocial).valido;
            const cnpjValido = validarCNPJ(formularioCNPJ.cnpj).valido;
            const celularValido = validarTelefone(formularioCNPJ.dadosBase.celular).valido;
            const telefoneValido = validarTelefoneFixo(formularioCNPJ.telefone).valido;
            
            setEtapa1Valido(nomeValido && razaoSocialValida && cnpjValido && celularValido && telefoneValido);
        }
    }, [tipoUsuario, formularioCPF, formularioCNPJ]);    
    
    useEffect(() => {
        const cepValido = validarCEP(dadosBase.cep).valido;
        const numeroValido = validarNumero(dadosBase.numero).valido;
        const ruaPreenchida = !campoVazio(dadosBase.rua);
        const bairroPreenchido = !campoVazio(dadosBase.bairro);
        const cidadePreenchida = !campoVazio(dadosBase.cidade);
        const estadoPreenchido = !campoVazio(dadosBase.estado);
        
        setEtapa2Valido(cepValido && numeroValido && ruaPreenchida && bairroPreenchido && cidadePreenchida && estadoPreenchido);
    }, [dadosBase]);    
    
    useEffect(() => {
        const emailValido = validarEmail(dadosBase.email).valido;
        const senhaValida = validarSenha(dadosBase.senha).valido;
        const confirmacaoSenhaValida = validarConfirmacaoSenha(dadosBase.confirmarSenha, dadosBase.senha).valido;
        
        setEtapa3Valido(emailValido && senhaValida && confirmacaoSenhaValida);
    }, [dadosBase.email, dadosBase.senha, dadosBase.confirmarSenha]);

    const cadastrarUsuario = () => {

        setBarraCarregamento(30);
        const form = tipoUsuario == 'fisica' ? formularioCPF : formularioCNPJ;
        const fisica = {
            cpf: form.cpf,
            rg: form.rg
        }
        const juridica = {
            cnpj: form.cnpj,
            razao_social: form.razaoSocial,
            telefone_residencial: form.telefone
        }

        api.post("/usuarios", {
            nome: form.dadosBase.nome,
            tipo: tipoUsuario == 'fisica' ? 'PF' : 'PJ',
            email: form.dadosBase.email,
            senha: form.dadosBase.senha,
            endereco: {
                cep: form.dadosBase.cep,
                logradouro: form.dadosBase.rua,
                bairro: form.dadosBase.bairro,
                cidade: form.dadosBase.cidade,
                estado: form.dadosBase.estado,
                numero: form.dadosBase.numero,
                complemento: form.dadosBase.complemento
            },
            telefone_celular: form.dadosBase.celular,
            ...(tipoUsuario == 'fisica' ? fisica : juridica)
        }).then((res) => {

            setBarraCarregamento(70);
            setTimeout(() => {
                setBarraCarregamento(100);
            }, 1000);
            setTimeout(() => {
                navegar('/login');
            }, 1500);
        }).catch((erro) => {
            setBarraCarregamento(100);

            const dataErro = erro.response.data;
            if (dataErro.validationErrors != null) {
                exibirAviso(dataErro.validationErrors[0].message, 'error');
            } else {
                exibirAviso(dataErro.error, 'error');
            }
        })
    }

    return (
        <section className={`container-cadastro ${etapa === 2 ? 'etapa-dois' : ''}`}>
            <LoadingBar
                progress={barraCarregamento}
                height={3}
                color="#f11946"
            />
            {etapa === 1 && (
                <>
                    <form className='container-formulario' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <button onClick={() => { setTipoUsuario('fisica') }}>CPF</button>
                                <div className='barra'></div>
                            </div>
                            <div className='option'>
                                <button onClick={() => { setTipoUsuario('juridica') }}>CNPJ</button>
                                <div className='barra'></div>
                            </div>
                        </div>
                        {tipoUsuario == 'fisica' ? (
                            <>
                                <section>                                    <Input
                                        id='nome'
                                        name='nome'
                                        label='* Nome Completo:'
                                        tipo='text'
                                        placeholder='Nome Completo'
                                        valor={formularioCPF.dadosBase.nome}
                                        validacao={validarNome}
                                        onChange={(e) => {
                                            setDadosBase((pf) => ({
                                                ...pf,
                                                nome: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='rg'
                                        name='rg'
                                        label='* RG:'
                                        tipo='text'
                                        placeholder='Ex.: 99.999.999-9'
                                        valor={formularioCPF.rg}
                                        validacao={validarRG}
                                        maxLength={12}
                                        onChange={(e) => {
                                            setFormularioCPF(pf => ({
                                                ...pf,
                                                rg: formatarRegistroGeral(e.target.value)
                                            }));
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='cpf'
                                        name='cpf'
                                        label='* CPF:'
                                        tipo='text'
                                        placeholder='Ex.: 999.999.999-99'
                                        valor={formularioCPF.cpf}
                                        validacao={validarCPF}
                                        maxLength={14}
                                        onChange={(e) => {
                                            setFormularioCPF(pf => ({
                                                ...pf,
                                                cpf: formatarCPF(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='celular'
                                        name='celular'
                                        label='* Celular:'
                                        tipo='text'
                                        placeholder='Ex.: (99) 99999-9999'
                                        valor={formularioCPF.dadosBase.celular}
                                        validacao={validarTelefone}
                                        maxLength={15}
                                        onChange={(e) => {
                                            setDadosBase((pf) => ({
                                                ...pf,
                                                celular: formatarTelefone(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                            </>
                        ) : (
                            <>
                                <section>                                    <Input
                                        id='nome-fantasia'
                                        name='nome-fantasia'
                                        label='* Nome Fantasia:'
                                        tipo='text'
                                        placeholder='Nome Fantasia'
                                        valor={formularioCNPJ.dadosBase.nome}
                                        validacao={validarNome}
                                        onChange={(e) => {
                                            setDadosBase((pj) => ({
                                                ...pj,
                                                nome: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='razao-social'
                                        name='razao-social'
                                        label='* Razão Social:'
                                        tipo='text'
                                        placeholder='Razão Social'
                                        valor={formularioCNPJ.razaoSocial}
                                        validacao={validarRazaoSocial}
                                        onChange={(e) => {
                                            setFormularioCNPJ((pj) => ({
                                                ...pj,
                                                razaoSocial: e.target.value
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='cnpj'
                                        name='cnpj'
                                        label='* CNPJ:'
                                        tipo='text'
                                        placeholder='Ex.: 99.999.999/9999-99'
                                        valor={formularioCNPJ.cnpj}
                                        validacao={validarCNPJ}
                                        maxLength={18}
                                        onChange={(e) => {
                                            setFormularioCNPJ((pj) => ({
                                                ...pj,
                                                cnpj: formatarCNPJ(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='celular'
                                        name='celular'
                                        label='* Celular:'
                                        tipo='text'
                                        placeholder='Ex.: (99) 99999-9999'
                                        valor={formularioCNPJ.dadosBase.celular}
                                        validacao={validarTelefone}
                                        maxLength={15}
                                        onChange={(e) => {
                                            setDadosBase((pj) => ({
                                                ...pj,
                                                celular: formatarTelefone(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                                <section>                                    <Input
                                        id='telefone'
                                        name='telefone'
                                        label='* Telefone:'
                                        tipo='text'
                                        placeholder='Ex.: (99) 9999-9999'
                                        valor={formularioCNPJ.telefone}
                                        validacao={validarTelefoneFixo}
                                        maxLength={14}
                                        onChange={(e) => {
                                            setFormularioCNPJ((pj) => ({
                                                ...pj,
                                                telefone: formatarTelefoneFixo(e.target.value)
                                            }))
                                        }}
                                    />
                                </section>
                            </>
                        )}                        <div className="botao-continuar-bloco">
                            <button
                                type="button"
                                className="botao-continuar"
                                onClick={validarFormulario}
                                disabled={!etapa1Valido}
                            >
                                Continuar
                            </button>
                            <p className="aviso-obrigatorio">* Preenchimento obrigatório</p>
                        </div>
                    </form>
                </>

            )}

            {etapa === 2 && (
                <>
                    <form className='container-formulario-2' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <p>{tipoUsuario === "fisica" ? "CPF" : "CNPJ"}</p>
                                <div className='barra'></div>
                            </div>
                        </div>
                        <section className='etapa2-section'>                            <Input
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
                                        cep: formatarCEP(e.target.value)
                                    }))
                                }}
                            />
                        </section>
                        <section className='etapa2-section'>                            <Input
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
                                        numero: e.target.value
                                    }))
                                }}
                            />
                        </section>
                        <section className='etapa2-section'>                            <Input
                                id='rua'
                                name='rua'
                                label='* Rua:'
                                tipo='text'
                                placeholder='Rua'
                                valor={dadosBase.rua}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        rua: e.target.value
                                    }))
                                }}
                                desabilitar={desabilitar}
                            />
                        </section>
                        <section className='etapa2-section'>                            <Input
                                id='bairro'
                                name='bairro'
                                label='* Bairro:'
                                tipo='text'
                                placeholder='Bairro'
                                valor={dadosBase.bairro}
                                onChange={(e) => {
                                    setDadosBase((dados) => ({
                                        ...dados,
                                        bairro: e.target.value
                                    }))
                                }}
                                desabilitar={desabilitar}
                            />
                        </section>

                        <div className='linha-cidade-estado'>
                            <section className='etapa2-section cidade'>                                <Input
                                    id='cidade'
                                    name='cidade'
                                    label='* Cidade:'
                                    tipo='text'
                                    placeholder='Cidade'
                                    valor={dadosBase.cidade}
                                    onChange={(e) => {
                                        setDadosBase((dados) => ({
                                            ...dados,
                                            cidade: e.target.value
                                        }))
                                    }}
                                    desabilitar={desabilitar}
                                />
                            </section>

                            <section className='etapa2-section estado'>                                <Input
                                    id='estado'
                                    name='estado'
                                    label='* Estado:'
                                    tipo='text'
                                    placeholder='Estado'
                                    valor={dadosBase.estado}
                                    onChange={(e) => {
                                        setDadosBase((dados) => ({
                                            ...dados,
                                            estado: e.target.value
                                        }))
                                    }}
                                    desabilitar={desabilitar}
                                />
                            </section>
                        </div>
                        <section className='etapa2-section'>
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
                                        complemento: e.target.value
                                    }))
                                }}
                            />
                        </section>
                        <div className="botoes-e-aviso-etapa-2">
                            <div className="botoes-alinhados-etapa-2">
                                <button
                                    type='button'
                                    className='botao-voltar-etapa-2'
                                    onClick={() => setEtapa(1)}>
                                    Voltar
                                </button>                                <button
                                    type="button"
                                    className="botao-continuar-etapa-2"
                                    onClick={validarFormulario}
                                    disabled={!etapa2Valido}>
                                    Continuar
                                </button>
                            </div>
                            <p className="aviso-obrigatorio-etapa-2">* Preenchimento obrigatório</p>
                        </div>
                    </form>
                </>
            )}

            {etapa === 3 && (
                <>
                    <form className='container-formulario-3' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <p>{tipoUsuario === "fisica" ? "CPF" : "CNPJ"}</p>
                                <div className='barra'></div>
                            </div>
                        </div>
                        <section>                            <Input
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
                                        email: e.target.value
                                    }))
                                }}
                            />
                        </section>
                        <section>                            <Input
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
                                        senha: e.target.value
                                    }))
                                }}
                            />
                        </section>
                        <section>                            <Input
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
                                        confirmarSenha: e.target.value
                                    }))
                                }}
                            />
                        </section>
                        <div className="botoes-e-aviso-etapa-3">
                            <div className="botoes-alinhados-etapa-3">
                                <button
                                    type='button'
                                    className='botao-voltar-etapa-3'
                                    onClick={() => setEtapa(2)}>
                                    Voltar
                                </button>                                <button
                                    type="button"
                                    className="botao-continuar-etapa-3"
                                    onClick={() => {
                                        validarFormulario();
                                    }}
                                    disabled={!etapa3Valido}>
                                    Criar
                                </button>
                            </div>
                            <p className="aviso-obrigatorio-etapa-3">* Preenchimento obrigatório</p>
                        </div>
                    </form>

                </>
            )}
            {etapa === 4 && (

                <form className='container-formulario-4' onSubmit={(e) => e.preventDefault()}>
                    <h1>Confirmação de e-mail</h1>
                    <p>Preencha abaixo o código de confirmação que enviamos ao seu e-mail</p>

                    <div className='codigo-confirmacao'>
                        <input type="text" onChange={(e) => { setCodigo1(e.target.value) }} />
                        <input type="text" onChange={(e) => { setCodigo2(e.target.value) }} />
                        <input type="text" onChange={(e) => { setCodigo3(e.target.value) }} />
                        <input type="text" onChange={(e) => { setCodigo4(e.target.value) }} />
                        <input type="text" onChange={(e) => { setCodigo5(e.target.value) }} />
                        <input type="text" onChange={(e) => { setCodigo6(e.target.value) }} />
                    </div>

                    <div className="botoes-etapa-4">
                        <button
                            type='button'
                            className='botao-voltar-etapa-4'
                            onClick={() => setEtapa(3)}>
                            Voltar
                        </button>
                        <button
                            type='submit'
                            className='botao-confirmar-etapa-4'
                            onClick={validarCodigoConfirmacao}>
                            Confirmar
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}

export { Cadastro };
