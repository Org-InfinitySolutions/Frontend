import { useEffect, useState } from 'react';
import './BarraNavegacao.css';
import { limparSession } from '../utils/limpar';

function BarraNavegacao(){

    const [usuarioLogado, setUsuarioLogado] = useState(sessionStorage.USUARIO_LOGADO === "True");

    useEffect(() => {
        setUsuarioLogado(sessionStorage.USUARIO_LOGADO === "True");
    }, []);

    return(
    <>
        <nav className="barra-navegacao">
            <section className="container-logo">
                <img src="/Logo.png" height="80%" alt="logo nova locações" />
            </section>
            {usuarioLogado ? (
            <section className="container-links">
                <div>
                    <a href="#">Home</a>
                    <a href="#">Equipamentos</a>
                    <a href="/pedidos">Pedidos</a>
                </div>
            </section>
            ) : (
            <section className="container-links">
                <div>
                    <a href="#">Sobre nós</a>
                    <a href="#">Serviços</a>
                    <a href="#">Projetos</a>
                    <a href="#">Equipamentos</a>
                </div>
            </section>
            )}
            {usuarioLogado ? (
            <section className="container-eventos">
                <a href='/perfil' className='botao-cadastro'>Perfil</a>
                <a href='/' onClick={() => { limparSession()}} className='botao-login'>Sair</a>
            </section>
            ) : (
            <section className="container-eventos">
                <a href='/cadastro' className='botao-cadastro'>Cadastro</a>
                <a href='/login' className='botao-login'>Login</a>
            </section>
            )}
            
        </nav>
        <div className='barra-divisoria'></div>
    </>
    )
}

export { BarraNavegacao }