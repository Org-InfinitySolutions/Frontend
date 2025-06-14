import { useEffect, useState } from 'react';
import './BarraNavegacao.css';
import { limparSession } from '../Utils/limpar';

const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

function BarraNavegacao(){
    
        const [deviced, setDeviced] = useState(getDevice());
    
        useEffect(() => {
            const onResize = () => setDeviced(getDevice());
            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }, []);
    
        const logo = () => {
            if (deviced.mobile) {
                return { width: "120%", height: "auto" };
            } else if (deviced.tablet) {
                return { width: "60%", height: "auto" };
            } else if (deviced.desktop) {
                return { width: "30%", height: "auto" };
            }
        }

        const linkEquipamento = () => {
            if (deviced.mobile) {
                return { display: "none" };
            } else 
                return { display: "flex" };
        }

    const [usuarioLogado, setUsuarioLogado] = useState(sessionStorage.USUARIO_LOGADO === "True");
    const [cargo, setCargo] = useState(sessionStorage.CARGO);

    useEffect(() => {
        setUsuarioLogado(sessionStorage.USUARIO_LOGADO === "True");
        setCargo(sessionStorage.CARGO);
    }, []);

    return(
    <>
        <nav className="barra-navegacao">
            <section className="container-logo">
                <img src="/Logo.png" style={logo()} alt="logo nova locações" />
            </section>
            {usuarioLogado ? (
            <section className="container-links">
                <div>
                    <a style={linkEquipamento()} href="/">Home</a>
                    <a href="/equipamentos">Equipamentos</a>
                    <a style={linkEquipamento()} href="/pedidos">Pedidos</a>
                </div>
            </section>
            ) : (
            <section className="container-links">
                <div>
                    <a style={linkEquipamento()} href="/#sobre-nos">Sobre nós</a>
                    <a style={linkEquipamento()} href="/#servicos">Serviços</a>
                    <a style={linkEquipamento()} href="/#projetos">Projetos</a>
                    <a href="/equipamentos">Equipamentos</a>
                </div>
            </section>
            )}
            {usuarioLogado ? (
            <section className="container-eventos">
                {cargo != 'ROLE_ADMIN' ? (
                    <a href='/perfil' className='botao-cadastro'>Perfil</a>
                ) : (<></>)}
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