
import { Input } from '../components/Input';
import './Login.css';

function Login(){

    return(
    <section className='container-login'>
        <form action="#" className='container-formulario'>
            <h1>LOGIN</h1>
            <section className='caixa-entrada'>
                <Input id='inp_email' label='E-MAIL:' tipo='email' placeholder='E-mail' />
            </section>
            <section className='caixa-entrada'>
                <Input id='inp_senha' label='SENHA:' tipo='password' placeholder='Senha' />
            </section>
            <button>Entrar</button>
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