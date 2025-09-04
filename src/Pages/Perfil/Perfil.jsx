
import './Perfil.css'
import { api, apiAutenticacao } from '../../provider/apiInstance';
import { useEffect, useState } from 'react';
import { exibirAviso, exibirAvisoTokenExpirado } from '../../utils/exibirModalAviso';
import LoadingBar from 'react-top-loading-bar';
import { Input } from '../../components/Input/Input';
import { formatarData, formatarCNPJ, formatarCPF, formatarRegistroGeral, formatarTelefone, formatarTelefoneFixo } from '../../utils/formatacoes';
import { useNavigate } from 'react-router-dom';
import { exibirAvisoTimer } from '../../utils/exibirModalAviso';
import { limparSession } from '../../utils/limpar';
import { validarSenha } from '../../utils/validarCampos'
import { tokenExpirou } from '../../utils/token';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';

function Perfil(){

    const navegar = useNavigate();

    const [usuario, setUsuario] = useState({});
    const [endereco, setEndereco] = useState({});
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    const [mostrarModalExcluirConta, setMostrarModalExcluirConta] = useState(false);
    const [senha, setSenha] = useState("");

    useEffect(() => {

        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar);
        } else {

            setBarraCarregamento(10);
            carregarDadosPessoais();
        }
    }, []);

    const confirmarExclusaoConta = () => {
        
        if(tokenExpirou()){
            exibirAvisoTokenExpirado(navegar);
        } else {
            setBarraCarregamento(30)
            apiAutenticacao.delete(ENDPOINTS.CREDENCIAISIDUSUARIO.replace(':id', sessionStorage.ID_USUARIO?.trim()), 
            {
                data: { senha },   
                headers: {
                    Authorization: `Bearer ${sessionStorage.TOKEN}`
                }
            }
            )
            .then(() => {
            
                setBarraCarregamento(70);
                setTimeout(() => {
                    setBarraCarregamento(100);
                    exibirAvisoTimer("Operação realizada com sucesso", 'success');
                }, 1000);

                setTimeout(() => {
                    limparSession();
                    navegar(`${ROUTERS.HOME}`);
                }, 4000);
            })
            .catch((err) => {
                setBarraCarregamento(100);

                if(err.status == 400){
                    
                    const dataErro = err.response.data;
                    if (dataErro.validationErrors != null) {
                        exibirAviso(dataErro.validationErrors[0].message, 'error');
                    } else {
                        exibirAviso(dataErro.error, 'error');
                    }
                }
            })
        }
    }

    const carregarDadosPessoais = () => {
        api.get(ENDPOINTS.USUARIOID.replace(':id', sessionStorage.ID_USUARIO), {
            headers: {
                Authorization: `Bearer ${sessionStorage.TOKEN}`
            }
        }).then((res) => {
            
            setBarraCarregamento(100);
            const dados = res.data;
            if(dados.tipo == 'PJ'){
                dados.cnpj = formatarCNPJ(dados.cnpj);
                dados.telefone_residencial = formatarTelefone(dados.telefone_residencial);
            } else {
                dados.rg = formatarRegistroGeral(dados.rg);
                dados.cpf = formatarCPF(dados.cpf);
            }

            dados.telefone_celular = formatarTelefone(dados.telefone_celular);

            const dadosEndereco = dados.endereco;
            setUsuario(dados)
            setEndereco(dadosEndereco);
        }).catch((erro) => {
            setBarraCarregamento(100);
            if(erro.status == 401){
                exibirAvisoTokenExpirado(navegar);
            }
        });
    }


    const abrirModalExcluirConta = () => {
        setMostrarModalExcluirConta(true);
    }

    const fecharModalExcluirConta = () => {
        setMostrarModalExcluirConta(false);
    }

    const [desabilitarConfirmarExclusao, setDesabilitarConfirmarExclusao] = useState(false);
    useEffect(() => {
        if(!validarSenha(senha).valido){
            setDesabilitarConfirmarExclusao(true);
        } else {
            setDesabilitarConfirmarExclusao(false);
        }
    }, [senha])

    return(
    <div className="perfil">
        <LoadingBar
            progress={barraCarregamento}
            height={3}
            color="#f11946"
        />

        {!mostrarModalExcluirConta &&( 
        <div className="container-perfil">
            <section className="titulo-form">
                <h2>{sessionStorage.CARGO === "ROLE_USUARIO_PF" ? "Meu perfil" : "Minha empresa"}</h2>
                <div className="barra"></div>
            </section>
            {sessionStorage.CARGO === "ROLE_USUARIO_PF" ? (
            <section className="dados-pessoais">
                <h3>Dados pessoais:</h3>
                <span>Nome: {usuario.nome}</span>
                <span>CPF: {usuario.cpf}</span>
                <span>RG: {usuario.rg}</span>
                <span>E-mail: {usuario.email}</span>
                <span>Celular: {usuario.telefone_celular}</span>
            </section>
            ) : (
            <section className="dados-pessoais">
                <h3>Dados da empresa:</h3>
                <span>Nome fantasia: {usuario.nome}</span>
                <span>Razão social: {usuario.razao_social}</span>
                <span>CNPJ: {usuario.cnpj}</span>
                <span>E-mail: {usuario.email}</span>
                <span>Celular: {usuario.telefone_celular}</span>
                <span>Telefone: {usuario.telefone_residencial}</span>
            </section>
            )}
            <section className="dados-endereco">
                <h3>Endereço:</h3>
                <span>Rua: {endereco.logradouro}</span>
                <span>Número: {endereco.numero}</span>
                <span>Bairro: {endereco.bairro}</span>
                <div>
                    <span>Cidade: {endereco.cidade}</span>
                    <span>Estado: {endereco.estado}</span>
                </div>
                <span>Complemento: {endereco.complemento}</span>
            </section>
            <section className="container-eventos">
                <div className="eventos-excluir-editar">
                    <button className="botao-excluir" onClick={abrirModalExcluirConta}>Excluir Conta</button>
                    <button className="botao-editar" onClick={() => {
                        sessionStorage.DADOS_USUARIO = JSON.stringify(usuario);
                        navegar(`${ROUTERS.EDITARPERFIL}`);
                    }}>Editar Conta</button>
                </div>
                <div className="evento-voltar">
                    <button className='botao-retroceder' onClick={() => { navegar(`${ROUTERS.EQUIPAMENTOS}`)}}>Voltar</button>
                </div>
            </section>
            <section className="dados-utilitarios">
                <span>Conta criada em { formatarData(usuario.data_criacao) }</span>
                <span>Ultima alteração em { formatarData(usuario.data_atualizacao) }</span>
            </section>
        </div>
        )}
        {mostrarModalExcluirConta && (
            <div className="modal-content">
                <h1 className="aviso-excluir-conta">Uma vez excluído os dados não poderão ser recuperados.</h1>
                <p>Preencha a senha para excluir sua conta</p>
                <Input 
                    tipo="password" 
                    placeholder="Senha"
                    valor={senha}
                    validacao={validarSenha}
                    onChange={(e) => {
                        setSenha(e.target.value);
                    }}
                />
                <div className="botoes">
                    <button className="botao-cancelar" onClick={fecharModalExcluirConta}>Cancelar</button>
                    <button className="botao-confirmar" onClick={confirmarExclusaoConta} disabled={desabilitarConfirmarExclusao}>Confirmar</button>
                </div>
            </div>
        )}
    </div>
    )
}

export { Perfil }