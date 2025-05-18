import { useState } from 'react';
import { Input } from '../components/Input';
import { apiAutenticacao } from '../provider/apiInstance'
import { exibirAviso } from '../Utils/exibirModalAviso';
import { campoVazio, emailInvalido } from '../Utils/validarCampos';

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
            apiAutenticacao.post("/login", {
                email,
                senha
            }).then((res) => { 
                
                const caixote = res.data;
                const tokenDecodificado = jwtDecode(caixote.token);
    
                sessionStorage.TOKEN = caixote.token;
                sessionStorage.ID_USUARIO = tokenDecodificado.sub;
                sessionStorage.CARGO = tokenDecodificado.scope;
                sessionStorage.USUARIO_LOGADO = "True";
                
                setTimeout(() => {
                    setBarraCarregamento(100)
                }, 1000);
                setTimeout(() => {
                    navegar('/equipamentos')
                }, 1500);
            }).catch((err) => {
                
                setBarraCarregamento(100)
                exibirAviso(err.response.data.error, 'error');
            });
        }
    };

    return(
    <section className='container-login'>
        <LoadingBar
            progress={barraCarregamento}
            height={3}
            color="#f11946"
        />
        <form action="#" className='container-formulario'>
            <h1>LOGIN</h1>
            <section className='caixa-entrada'>
                <Input label='E-MAIL:' tipo='text' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section className='caixa-entrada'>
                <Input label='SENHA:' tipo='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)}/>
            </section>
            <button onClick={Login}>Entrar</button>
            <section className='links-navegacao'>
                <a href="#">
                    Esqueci minha senha
                </a>
                <a href="#">
                    Não tem cadastro? Clique aqui!
                </a>
            </section>
        </form>
    </section>
    )
}

export { Login };