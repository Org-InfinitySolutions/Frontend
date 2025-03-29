import { BarraNavegacao } from '../components/BarraNavegacao'
import { Rodape } from '../components/Rodape'
import { Input } from '../components/Input';

import './Login.css';

function Login(){

    return(
    <section className='container-login'>
        <form action="#" className='container-formulario'>
            <h1>LOGIN</h1>
            <section>
                <Input id='inp_email' label='EMAIL:' tipo='email' placeholder='Email' />
            </section>
            <section>
                <Input id='inp_senha' label='SENHA:' tipo='password' placeholder='Senha' />
            </section>
            <button>Entrar</button>
        </form>
    </section>
    )
}

export { Login };