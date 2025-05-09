
import './Perfil.css'
import { api, apiAutenticacao } from '../provider/apiInstance';
import { useEffect, useState } from 'react';
import { exibirAvisoTokenExpirado } from '../utils/exibirModalAviso';
import LoadingBar from 'react-top-loading-bar';
import { Input } from '../components/Input';
import { formatarData } from '../Utils/formatacoes';

function Perfil(){

    const [usuario, setUsuario] = useState({});
    const [endereco, setEndereco] = useState({});
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    const [mostrarModalExcluirConta, setMostrarModalExcluirConta] = useState(false);

    useEffect(() => {

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
            console.log(erro);
        })
    }, [barraCarregamento] /* isso garante que o valor do email não virá vazio */)

    return(
    <div className="container">
        <LoadingBar
            progress={barraCarregamento}
            height={3}
            color="#f11946"
        />

{!mostrarModalExcluirConta &&( 
        <div className="container-perfil">
            <section className="titulo-form">
                {/* implementar validacao para mudar titulo form */}
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
                    <a href='/editar-perfil' className="botao-editar">Editar Conta</a>
                </div>
                <div className="evento-voltar">
                    <a className='botao-retroceder' href="/equipamentos">Voltar</a>
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
            <Input type="text" placeholder="Senha" />
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