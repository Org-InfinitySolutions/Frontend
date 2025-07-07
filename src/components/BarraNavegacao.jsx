import { useEffect, useState } from 'react';
import './BarraNavegacao.css';
import { limparSession } from '../utils/limpar';
import Logo from '/Logo.png';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { getDevice } from '../utils/interface';
import { IoMdClose } from 'react-icons/io';

const dispositivo = getDevice();

function BarraNavegacao(){
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.pathname;
    
    const [deviced, setDeviced] = useState(dispositivo);

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

    const [usuarioLogado, setUsuarioLogado] = useState(sessionStorage.USUARIO_LOGADO === "True");
    const [cargo, setCargo] = useState(sessionStorage.CARGO);
    const [habilitarFuncoesGerenciais, setHabilitarFuncoesGerenciais] = useState(cargo == "ROLE_ADMIN" || cargo == "ROLE_FUNCIONARIO");

    const desativarLinkPaginaAtual = (urlAtual) => {
        return url == urlAtual ? "inativar" : "";
    }

    const [abrirMenu, setAbrirMenu] = useState(false);
    const definirMenu = () => {
        setAbrirMenu(!abrirMenu);
    } 

    return(
    <nav >
        <section className={`barra-navegacao`}>
            <section className="container-logo">
                <button className='botao-logo' onClick={() => navigate('/')}>
                <img style={logoResponsividade()} src={Logo} alt="Logo Nova Locações" />
                </button>            
            </section>
            <div className={`box-links-navbar ${abrirMenu && "ativo"}`}>
                <section className="container-links">
                    <div>
                        {usuarioLogado ? 
                            (<>
                                <a href="/" className={`${desativarLinkPaginaAtual('/')}`}>Home</a>
                                <a href="/equipamentos" className={`${desativarLinkPaginaAtual('/equipamentos')}`}>Equipamentos</a>
                                {(!habilitarFuncoesGerenciais || !usuarioLogado) && <a href="/pedidos" className={`${desativarLinkPaginaAtual('/pedidos')}`}>Pedidos</a> }
                                {habilitarFuncoesGerenciais &&
                                    (<>
                                        <a href="/calendario" className={`${desativarLinkPaginaAtual('/calendario')}`}>Calendário</a>
                                        <a href="/dashboard" className={`${desativarLinkPaginaAtual('/dashboard')}`}>Dashboard</a>    
                                    </>) 
                                }
                            </>) 
                            : 
                            (<>
                                {url == '/' && (<>
                                    <a href="/#sobre-nos" onClick={definirMenu}>Sobre nós</a>
                                    <a href="/#servicos" onClick={definirMenu}>Serviços</a>
                                    <a href="/#projetos" onClick={definirMenu}>Projetos</a>
                                </>)}
                                <a href="/equipamentos" className={`${desativarLinkPaginaAtual('/equipamentos')}`}>Equipamentos</a>
                            </>)
                        }
                    </div>  
                </section>
                <section className="container-eventos">
                    {usuarioLogado ? 
                        (<>
                            {cargo != 'ROLE_ADMIN' ? (
                                <a href='/perfil' className={`botao-cadastro ${desativarLinkPaginaAtual('/perfil')}`}>Perfil</a>
                            ) : (<></>)}
                            <a href='/' onClick={() => { limparSession()}} className='botao-login'>Sair</a>
                        </>) 
                        : 
                        (<>
                            <a href='/cadastro' className={`botao-cadastro ${desativarLinkPaginaAtual('/cadastro')}`}>Cadastro</a>
                            <a href='/login' className={`botao-login ${desativarLinkPaginaAtual('/login')}`}>Login</a>
                        </>)}
                </section>
            </div>
            <div className='menu-hambuguer'>
                {!abrirMenu ? <IoMenu size={40} onClick={definirMenu}/> : <IoMdClose size={40} onClick={definirMenu}/>}
            </div>
        </section>
        <div className='barra-divisoria'></div>
    </nav>
    )
}

export { BarraNavegacao }