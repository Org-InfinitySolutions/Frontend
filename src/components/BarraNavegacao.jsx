import { useEffect, useState } from 'react';
import './BarraNavegacao.css';
import { limparSession } from '../utils/limpar';
import Logo from '/Logo.png';
import { useNavigate } from 'react-router-dom';

const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

function BarraNavegacao(){
        const navigate = useNavigate();
    
        const [deviced, setDeviced] = useState(getDevice());
    
        useEffect(() => {
            const onResize = () => setDeviced(getDevice());
            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }, []);
    
        const logoResponsividade = () => {
            if (deviced.mobile) {
                return { width: "100%", height: "auto" };
            } else if (deviced.tablet) {
                return { width: "60%", height: "auto" };
            } else {
                return { width: "70%", height: "auto" };
            }
        }

        const mudancaLink = () => {
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
                <button className='botao-logo' onClick={() => navigate('/')}>
                <img style={logoResponsividade()} src={Logo} alt="Logo Nova Locações" />
                </button>            
            </section>
            {usuarioLogado ? (
            <section className="container-links">
                <div>
                    <a style={mudancaLink()} href="/">Home</a>
                    <a href="/equipamentos">Equipamentos</a>
                    <a style={mudancaLink()} href="/pedidos">Pedidos</a>
                </div>
            </section>
            ) : (
            <section className="container-links">
                <div>
                    <a style={mudancaLink()} href="/#sobre-nos">Sobre nós</a>
                    <a style={mudancaLink()} href="/#servicos">Serviços</a>
                    <a style={mudancaLink()} href="/#projetos">Projetos</a>
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