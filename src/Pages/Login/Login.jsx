import { useEffect, useState } from 'react';
import { Input } from '../../components/Input/Input';
import { apiAutenticacao } from '../../provider/apiInstance'
import { exibirAviso } from '../../utils/exibirModalAviso';
import { campoVazio, emailInvalido } from '../../utils/validarCampos';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';
import LOGO from '../../assets/nova-logo.png';

import './Login.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoadingBar from 'react-top-loading-bar';

function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const navegar = useNavigate();
    const [barraCarregamento, setBarraCarregamento] = useState(0);

    const Login = (event) => {
        event.preventDefault();

        if(campoVazio(email) || campoVazio(senha)){
            exibirAviso("É obrigatório preencher todos os campos", 'error');
        } else if(emailInvalido(email)){
            exibirAviso("O email informado é inválido", 'error');
        } else{
            
            setBarraCarregamento(30)
            apiAutenticacao.post(ENDPOINTS.LOGIN, {
                email,
                senha
            }).then((res) => { 
                
                const caixote = res.data;
                const tokenDecodificado = jwtDecode(caixote.token);
                
                sessionStorage.TOKEN = caixote.token;
                sessionStorage.ID_USUARIO = tokenDecodificado.sub;
                sessionStorage.CARGO = tokenDecodificado.scope;
                sessionStorage.USUARIO_LOGADO = "True";
                sessionStorage.EXP = new Date(tokenDecodificado.exp * 1000);

                setTimeout(() => {
                    setBarraCarregamento(100)
                }, 1000);
                setTimeout(() => {

                    const carrinho = JSON.parse(sessionStorage.CARRINHO);
                    if(carrinho.produtos.length > 0){
                        if(carrinho.etapaPedido == 2)
                            navegar(`${ROUTERS.CARRINHOENDERECO}`)
                        else if(carrinho.etapaPedido == 3)
                            navegar(`${ROUTERS.CARRINHOFINALIZAR}`)                    
                        else
                            navegar(`${ROUTERS.CARRINHO}`)
                    } else{
                        navegar(`${ROUTERS.EQUIPAMENTOS}`)
                    }

                }, 1500);
            }).catch((err) => {
                
                setBarraCarregamento(100)
                exibirAviso(err.response.data.error, 'error');
            });
        }
    };

    // criação do carrinho, permitindo o usuario adicionar produtos sem conta 
    useEffect(() => {
        const carrinho = sessionStorage.CARRINHO ? JSON.parse(sessionStorage.CARRINHO) : { produtos: [] };
        if(carrinho.produtos.length == 0){
            sessionStorage.CARRINHO = JSON.stringify({ produtos: [] });
        }
    }, []);

    return(
    <section className='container-login'>
        <section className='container-logo'>
            <img src={LOGO} alt="Logo da Nova locações" />
        </section>

        <form action="#" className='container-formulario'>
            <h1>LOGIN</h1>
            <div className='barra-divisoria-login'></div>
            <section className='caixa-entrada'>
                <Input label='E-mail' tipo='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section className='caixa-entrada'>
                <Input label='Senha' tipo='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)}/>
            </section>
            <button onClick={Login}>Entrar</button>
            <section className='links-navegacao'>
                <a href={ROUTERS.RECUPERARSENHA}>
                    Esqueci minha senha
                </a>
                <a href={ROUTERS.CADASTRO}>
                    Não tem cadastro? Clique aqui!
                </a>
            </section>
        </form>
    </section>
    )
}

export { Login };