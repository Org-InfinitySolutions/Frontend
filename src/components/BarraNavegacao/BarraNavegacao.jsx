import { useEffect, useState } from 'react';
import './BarraNavegacao.css';
import { limparSession } from '../../utils/limpar';
import Logo from '/Logo.png';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { getDevice } from '../../utils/interface';
import { IoMdClose } from 'react-icons/io';
import { ROUTERS } from '../../routers/routers';
import { retornarCargos, isAdmin, isFuncionario } from '../../utils/usuario';

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
            return { width: "80%", height: "auto" };
        } else {
            return { width: "70%", height: "auto" };
        }
    }

    const [usuarioLogado, setUsuarioLogado] = useState(sessionStorage.USUARIO_LOGADO === "True");
    const [cargos, setCargo] = useState(retornarCargos(sessionStorage.CARGO));
    const [habilitarFuncoesGerenciais, setHabilitarFuncoesGerenciais] = useState(isAdmin(cargos) || isFuncionario(cargos));

    const desativarLinkPaginaAtual = (urlAtual) => {
        return url == urlAtual ? "inativar-botao" : "";
    }

    const [abrirMenu, setAbrirMenu] = useState(false);
    const definirMenu = () => {
        setAbrirMenu(!abrirMenu);
    }
    
    useEffect(() => {
        if (abrirMenu) {
            document.body.classList.add("menu-ativo");
        } else {
            document.body.classList.remove("menu-ativo");
        }
    }, [abrirMenu]);  

    return(
      <main className={url == ROUTERS.CADASTRO ? "hidden" : ""}>
        <nav>
        <section className="barra-navegacao">
          <section className="container-logo">
            <button
              className="botao-logo"
              onClick={() => navigate(`${ROUTERS.HOME}`)}
            >
              <img
                style={logoResponsividade()}
                src={Logo}
                alt="Logo Nova Locações"
              />
            </button>
          </section>

          <div className={`box-links-navbar ${abrirMenu ? "ativo" : ""}`}>
            <section className="container-links">
              <div>
                {usuarioLogado ? (
                  <>
                    <a
                      href={ROUTERS.HOME}
                      className={`${desativarLinkPaginaAtual(`${ROUTERS.HOME}`)}`}
                    >
                      Home
                    </a>
                    <a
                      href={ROUTERS.EQUIPAMENTOS}
                      className={`${desativarLinkPaginaAtual(
                        `${ROUTERS.EQUIPAMENTOS}`
                      )}`}
                    >
                      Equipamentos
                    </a>
                    {usuarioLogado && (
                      <a
                        href={ROUTERS.PEDIDOS}
                        className={`${desativarLinkPaginaAtual(
                          `${ROUTERS.PEDIDOS}`
                        )}`}
                      >
                        Pedidos
                      </a>
                    )}
                    {habilitarFuncoesGerenciais && (
                      <>
                        <a
                          href={ROUTERS.CALENDARIO}
                          className={`${desativarLinkPaginaAtual(
                            `${ROUTERS.CALENDARIO}`
                          )}`}
                        >
                          Calendário
                        </a>
                        <a
                          href={ROUTERS.DASHBOARD}
                          className={`${desativarLinkPaginaAtual(
                            `${ROUTERS.DASHBOARD}`
                          )}`}
                        >
                          Dashboard
                        </a>
                        {isAdmin(cargos) && (
                          <a
                            href={ROUTERS.GERENCIARUSUARIOS}
                            className={`${desativarLinkPaginaAtual(
                              `${ROUTERS.GERENCIARUSUARIOS}`
                            )}`}
                          >
                            Usuarios
                          </a>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {url == "/" && (
                      <>
                        <a href="/#sobre-nos" onClick={definirMenu}>
                          Sobre nós
                        </a>
                        <a href="/#servicos" onClick={definirMenu}>
                          Serviços
                        </a>
                        <a href="/#projetos" onClick={definirMenu}>
                          Projetos
                        </a>
                      </>
                    )}
                    <a
                      href={ROUTERS.EQUIPAMENTOS}
                      className={`${desativarLinkPaginaAtual(
                        `${ROUTERS.EQUIPAMENTOS}`
                      )}`}
                    >
                      Equipamentos
                    </a>
                  </>
                )}
              </div>
            </section>

            <section className="container-eventos">
              {usuarioLogado ? (
                <>
                  {!isAdmin(cargos) ? (
                    <a
                      href={ROUTERS.PERFIL}
                      className={`botao-cadastro ${desativarLinkPaginaAtual(
                        `${ROUTERS.PERFIL}`
                      )}`}
                    >
                      Perfil
                    </a>
                  ) : (
                    <></>
                  )}
                  <a
                    href={ROUTERS.HOME}
                    onClick={() => {
                      limparSession();
                    }}
                    className="botao-login"
                  >
                    Sair
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={ROUTERS.CADASTRO}
                    className={`botao-cadastro ${desativarLinkPaginaAtual(
                      `${ROUTERS.CADASTRO}`
                    )}`}
                  >
                    Cadastro
                  </a>
                  <a
                    href={ROUTERS.LOGIN}
                    className={`botao-login ${desativarLinkPaginaAtual(
                      `${ROUTERS.LOGIN}`
                    )}`}
                  >
                    Login
                  </a>
                </>
              )}
            </section>
          </div>

          <div className="menu-hamburguer">
            {!abrirMenu ? (
              <IoMenu size={40} onClick={definirMenu} />
            ) : (
              <IoMdClose size={40} onClick={definirMenu} />
            )}
          </div>
        </section>
        <div
          className={`overlay ${abrirMenu ? "ativo" : ""}`}
          onClick={definirMenu}
        ></div>
        <div className="barra-divisoria"></div>
      </nav>
      
      <div className="espaco-navbar"></div>
    </main>
  )
}

export { BarraNavegacao }