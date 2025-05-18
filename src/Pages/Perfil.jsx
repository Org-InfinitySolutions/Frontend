
import './Perfil.css'
import { api, apiAutenticacao } from '../provider/apiInstance';
import { useEffect, useState } from 'react';
import { exibirAvisoTokenExpirado } from '../Utils/exibirModalAviso';
import LoadingBar from 'react-top-loading-bar';
import { Input } from '../components/Input';
import { formatarData } from '../Utils/formatacoes';
import { useNavigate } from 'react-router-dom';

function Perfil(){

    const sessionStorageUsuario = sessionStorage.DADOS_USUARIO;
    const [usuario, setUsuario] = useState(sessionStorageUsuario != null ? JSON.parse(sessionStorageUsuario) : {});
    const [endereco, setEndereco] = useState(sessionStorageUsuario != null ? usuario.endereco : {});
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    const [mostrarModalExcluirConta, setMostrarModalExcluirConta] = useState(false);

    const navegar = useNavigate();

    useEffect(() => {
        if(sessionStorageUsuario == null){ 
            setBarraCarregamento(10);
            api.get(`/usuarios/${sessionStorage.ID_USUARIO}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.TOKEN}`
                }
            }).then((res) => {
    
                setBarraCarregamento(87);
                const dados = res.data;
                const dadosEndereco = dados.endereco;
                setUsuario(dados)
                setEndereco(dadosEndereco);
    
                setTimeout(() => {
                    setBarraCarregamento(100);
                }, 500)
            }).catch((erro) => {
                
                setBarraCarregamento(100);
                if(erro.status == 401){
                    exibirAvisoTokenExpirado();
                }
            })
        }
    }, []);

    const confirmarExclusaoConta = () => {
        // Aqui você pode colocar a lógica para excluir a conta de verdade
        alert('Conta excluída com sucesso!');
        setMostrarModalExcluirConta(false);
        // Você pode redirecionar o usuário também, se quiser.
    }

    const abrirModalExcluirConta = () => {
        setMostrarModalExcluirConta(true);
    }

    const fecharModalExcluirConta = () => {
        setMostrarModalExcluirConta(false);
    }

    useEffect(() => {
        
        if(sessionStorageUsuario == null){
            apiAutenticacao.get(`/credenciais/${sessionStorage.ID_USUARIO}/email`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.TOKEN}`
                }
            }).then((res) => {
                setUsuario((usuario) => ({
                    ...(usuario || {}),
                    email: res.data.email
                }))
            }).catch((erro) => {
    
                setBarraCarregamento(100);
                if(erro.status == 401){
                    exibirAvisoTokenExpirado();
                }
            })
        }
    }, [barraCarregamento] /* isso garante que o valor do email não virá vazio */)

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
                <div>
                    <span>Rua: {endereco.logradouro}</span>
                    <span>Número: {endereco.numero}</span>
                </div>
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
                        navegar('/editar-perfil');
                    }}>Editar Conta</button>
                </div>
                <div className="evento-voltar">
                    <button className='botao-retroceder' onClick={() => { navegar('/equipamentos')}}>Voltar</button>
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
                <h1 className='aviso-excluir-conta'>Uma vez excluído os dados não poderão ser recuperados.</h1>
                <p>Preencha a senha para excluir sua conta</p>
                <Input tipo={"text"} placeholder={"Senha"} />
                <div className="botoes">
                    <button className="botao-cancelar" onClick={fecharModalExcluirConta}>Cancelar</button>
                    <button className="botao-confirmar" onClick={confirmarExclusaoConta}>Confirmar</button>
                </div>
            </div>
        )}
    </div>
    )
}

export { Perfil }