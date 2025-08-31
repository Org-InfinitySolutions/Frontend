import { useEffect, useState } from 'react';
import './Cadastro.css';

import { FormDadosPessoais } from '../../components/FormDadosPessoais/FormDadosPessoais';
import { FormDadosEndereco } from '../../components/FormDadosEndereco/FormDadosEndereco';
import { FormDadosAcesso } from '../../components/FormDadosAcesso/FormDadosAcesso';
import { ConfirmacaoEmail } from '../../components/ConfirmacaoEmail/ConfirmacaoEmail';
import { exibirAviso } from '../../utils/exibirModalAviso';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';
import { useNavigate } from 'react-router-dom';
import { api } from '../../provider/apiInstance';
import LoadingBar from 'react-top-loading-bar';

function Cadastro(){

    const [tipoUsuario, setTipoUsuario] = useState('fisica');
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    const [etapa, setEtapa] = useState(1);
    const navegar = useNavigate();

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
    const [esconderBtnCpf, setEsconderBtnCpf] = useState(false)
    const [esconderBtnCnpj, setEsconderBtnCnpj] = useState(false)

    // UseEffects
    useEffect(() => {
        if(etapa > 1 && tipoUsuario != 'fisica'){
            setEsconderBtnCpf(true);
        } else{
            setEsconderBtnCpf(false);
        }

        if(etapa > 1 && tipoUsuario != 'juridica'){
            setEsconderBtnCnpj(true);
        } else{
            setEsconderBtnCnpj(false);
        }
    }, [etapa])

    // Métodos
    const avancarEtapa = async (executarMetodo) => {
        if(etapa < 4){
            if(executarMetodo != null){
                const valido = await executarMetodo();
                if(valido){
                    setEtapa(etapa + 1)
                }
            } else{
                setEtapa(etapa + 1)
            }
        }
    }
    const retrocederEtapa = () => {
        if(etapa > 0){
            setEtapa(etapa - 1);
        }
    }

    const verificarFormCodigoEmail = (codigo) => {
        if (codigo.trim().length < 6) {
            exibirAviso('É obrigatório preencher todos os campos', 'error');
        } else{
            validarCodigoConfirmacao(codigo);
        }
    }

    const validarCodigoConfirmacao = (codigo) => { 

        const usuario = tipoUsuario == 'fisica' ? formularioCPF : formularioCNPJ
        api.post(ENDPOINTS.VALIDARCODIGOEMAIL, {
            email: usuario.dadosBase.email,
            codigo
        }).then((res) => {
            if(res.data.sucesso){
                cadastrarUsuario();
            }
        }).catch((err) => {
            exibirAviso(err.response.data.mensagem, 'error')
        })
    }

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

        api.post(ENDPOINTS.USUARIOS, {
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
                navegar(ROUTERS.LOGIN);
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

    return(
        <main className='Cadastro'>
            <LoadingBar
                progress={barraCarregamento}
                height={3}
                color="#f11946"
            />
            {etapa < 4 ? (
                <form className='formulario' onSubmit={(e) => e.preventDefault()}>
                    <section className='box-titulo'>
                        <h1>Cadastro</h1>
                        <div className='linha-colorida'></div>
                    </section>
                    <section className='box-tipos-usuario'>
                        <button 
                            className={`${tipoUsuario == 'fisica' ? 'borda-embaixo': ''} ${esconderBtnCpf ? 'hidden' : ''}`}
                            onClick={() => {setTipoUsuario('fisica')}}>
                                CPF
                        </button>
                        <button 
                            className={`${tipoUsuario == 'juridica' ? 'borda-embaixo': ''} ${esconderBtnCnpj ? 'hidden' : ''}`}
                            onClick={() => {setTipoUsuario('juridica')}}>
                                CNPJ
                        </button>
                    </section>
                    <div className='box-dados'>
                        {etapa == 1 ? (
                            <FormDadosPessoais 
                                tipoUsuario={tipoUsuario}
                                dadosCnpj={formularioCNPJ}
                                setDadosCnpj={setFormularioCNPJ}
                                dadosCpf={formularioCPF}
                                setDadosCpf={setFormularioCPF}
                                continuar={(metodo) => {avancarEtapa(metodo)}}
                            />
                        ) : etapa == 2 ? (
                            <FormDadosEndereco 
                                dadosBase={tipoUsuario == 'fisica' ? formularioCPF.dadosBase : formularioCNPJ.dadosBase}
                                setDadosBase={tipoUsuario == 'fisica' ? setFormularioCPF : setFormularioCNPJ}
                                continuar={() => {avancarEtapa(null)}}
                                voltar={() => {retrocederEtapa()}}
                            />
                        ) : etapa == 3 ? (
                            <FormDadosAcesso 
                                dadosBase={tipoUsuario == 'fisica' ? formularioCPF.dadosBase : formularioCNPJ.dadosBase}
                                setDadosBase={tipoUsuario == 'fisica' ? setFormularioCPF : setFormularioCNPJ}
                                continuar={(metodo) => {avancarEtapa(metodo)}}
                                voltar={() => {retrocederEtapa()}}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <span className='msg-preenchimento-obrigatorio'>* Preenchimento obrigatório</span>
                </form>
            ) : (
                <ConfirmacaoEmail onSubmit={verificarFormCodigoEmail} />
            )} 
        </main>
    )
}

export { Cadastro }