import './Home.css';
import fotoFundo from '../../assets/nova-logo.png';
import fotoEventoKKKK from '../../assets/evento-kkkk-sesc.webp';
import fotoEventoMogi from '../../assets/evento-mogi.webp';
import fotoEventoJoquei from '../../assets/evento-Symbiose-Parque-do-Jóquei.webp';
import fotoEventoLockdown from '../../assets/evento-Lockdown.webp';
import fotoEventoItu from '../../assets/evento-Festival-Itu.webp';
import fotoEventoG10 from '../../assets/evento-G10-Paraisópolis.webp';
import fotoEventoMuseuAfro from '../../assets/evento-museu-afro.webp';
import fotoEventoSonoora from '../../assets/evento-sonoora.png';
import fotoProjetorPanasonic from '../../assets/fotoProjetor20000Panasonic.png';
import { Carousel } from "../../components/Carrossel/Carousel"
import { CarouselItem } from "../../components/Carrossel/CarouselItem"
import { DivCarouselItem } from '../../components/Carrossel/style';
import { useEffect, useState, useRef } from 'react';
import { ROUTERS } from '../../routers/routers';

const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

function Home() {

    const [deviced, setDeviced] = useState(getDevice());
    const [isVisible, setIsVisible] = useState(false); 
    const fotoRef = useRef(null); 

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true); 
                    observer.unobserve(entry.target); 
                }
            });
        });

        if (fotoRef.current) {
            observer.observe(fotoRef.current); 
        }

        return () => {
            if (fotoRef.current) {
                observer.unobserve(fotoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const carrinho = sessionStorage.CARRINHO ? JSON.parse(sessionStorage.CARRINHO) : { produtos: [] };
        if (carrinho.produtos.length == 0) {
            sessionStorage.CARRINHO = JSON.stringify({ produtos: [] });
        }
    }, []);

    useEffect(() => {
        const onResize = () => setDeviced(getDevice());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    
    useEffect(() => {
        const handleScroll = () => {
            const video = document.querySelector('.video-fundo');
            const scrollPosition = window.scrollY;

            const parallaxFactor = 0.5; 
            const translateY = scrollPosition * parallaxFactor;

            if (video) {
                video.style.transform = `translateY(${translateY}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fotoCarrossel = () => {
        if (deviced.mobile) {
            return { width: "300px", height: "auto" };
        } else if (deviced.tablet) {
            return { width: "280px", height: "auto" };
        } else if (deviced.desktop) {
            return { width: "340px", height: "250px" };
        }
    }

    const fotoProjeto = () => {
        if (deviced.mobile) {
            return { width: "100%", height: "50%", flexDirection: "column" };
        } else if (deviced.tablet) {
            return { width: "40vw", flexDirection: "column" };
        }
    }

    const fotoProjetor = () => {
        if (deviced.mobile) {
            return { width: "100%", height: "50%", flexDirection: "column" };
        } else if (deviced.tablet) {
            return { width: "40vw", flexDirection: "column" };
        } else if (deviced.desktop) {
            return { width: "30vw" };
        }
    }

    return (

        <section className="home">

            {deviced.desktop && (
                <section className="container-home">

                    <section className="parallax-container">
                        <source src="..." type="video/mp4" />
                    </section>

                    <section className='container-inicial'>
                        <section className='container-imagem'>
                            <img src={fotoFundo} alt="Logo Nova Locações" className='logo-inicial' />
                            <section className="container-titulo">
                                <h1 className='titulo'>NOVA LOCAÇÕES</h1>
                                <div className="barra"></div>
                            </section>
                        </section>
                        <section className='container-video' id='inicio'>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="video-fundo"
                            >
                                <source src="https://novalocacoesblobstorage.blob.core.windows.net/arquivospublicos/WhatsApp%20Video%202025-06-10%20at%2016.09.29.mp4" type="video/mp4" />
                            </video>

                        </section>
                    </section>
                </section>
            )}

            {deviced.mobile && (

                <section className='container-video' id='inicio'>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="video-fundo"
                    >
                        <source src="https://novalocacoesblobstorage.blob.core.windows.net/arquivospublicos/WhatsApp%20Video%202025-06-10%20at%2016.09.29.mp4" type="video/mp4" />
                    </video>

                    <section className="container-titulo">
                        <h1 className='titulo'>NOVA LOCAÇÕES</h1>
                        <div className="barra"></div>
                    </section>
                </section>
            )}

            <section className="container-equipamentos" id='equipamentos'>
                <h2>Equipamentos</h2>
                <div className="conteudo-equipamentos">
                    <p>Disponibilizamos uma ampla variedade de projetores de imagem, com modelos que abrangem desde 5.000 até 30.000 lumens, 
                        atendendo diferentes necessidades e portes de eventos. Todos os equipamentos contam com tecnologia laser de última geração,
                         oferecendo imagens de altíssima qualidade, maior eficiência energética e maior durabilidade.
                          Dessa forma, garantimos soluções inovadoras e versáteis para apresentações, 
                          conferências, espetáculos e diversos outros tipos de aplicações audiovisuais.
                    <br /> <br />
                        <a href={ROUTERS.EQUIPAMENTOS}>Clique aqui e faça um orçamento com os equipamentos disponíveis</a>
                    </p>
                       <img
                        className={`foto-equipamento ${isVisible ? 'show' : ''}`} 
                        src={fotoProjetorPanasonic}
                        alt=""
                        style={fotoProjetor()}
                        ref={fotoRef} 
                    />
                </div>
            </section>

            <section className="container-sobre-nos" id='sobre-nos'>
                <h2>Sobre nós</h2>
                <p>Empresa fundada em 1996, especializada na locação de equipamentos e serviços para projetos, videomapping e projeções de grande porte.
                    Possuímos uma ampla e diversificada linha de projetores de imagem com tecnologia laser de alta resolução e luminosidade, além de lentes
                    especiais e servidores de vídeo, ideais para eventos, congressos e apresentações públicas.
                </p>
            </section>

            <section className="container-servicos" id='servicos'>
                <h2>Serviços</h2>
                <section className="container-carrosel" >
                    <Carousel>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoSonoora} alt="Foto de uma projeção na Festa Sonoora" style={fotoCarrossel()} />
                                <p>Projeção no palco da Festa Sonoora 2024, com mapping assinado pelo VJ Flame e estrutura de palco da 4Thdimensions Stage.
                                    Um trabalho visual incrível que transformou a experiência do evento, ficou simplesmente espetacular!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoJoquei} alt="Foto de uma projeção do Projeto Symbiose, da artista Roberta Carvalho, na Virada Cultural de 2018, no Parque do Jóquei em São Paulo." style={fotoCarrossel()} />
                                <p>Projeto Symbiose, da artista Roberta Carvalho, na Virada Cultural de 2018, no Parque do Jóquei em São Paulo.
                                    Uma experiência indescritivelmente impactante!
                                    Com projetores LCD de alta luminosidade, estruturas robustas e uma equipe técnica de projeção preparada para transformar arte em emoção.</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoLockdown} alt="Foto de uma projeção na Festa Lockdown, no Palácio Sunset, em São José dos Campos," style={fotoCarrossel()} />
                                <p> Festa Lockdown 2023, no Palácio Sunset, em São José dos Campos, com videomapping no palco pelo artista VJ Bang.
                                    Um show visual com projeções de imagem usando projetores a laser de alta resolução e luminosidade,
                                    além de estruturas e equipe técnica para garantir uma experiência inesquecível.</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoItu} alt="Foto de uma projeção 30° Festival de Artes de Itú e 1° Festival Hispânico de Itú" style={fotoCarrossel()} />
                                <p>30° Festival de Artes de Itú e 1° Festival Hispânico de Itú marcaram presença com uma projeção mapeada de impacto,
                                    utilizando projetores a laser Panasonic de 20.000 lumens, servidores potentes, estruturas dedicadas e um preciso
                                    trabalho de mapeamento de imagem. Tecnologia e arte lado a lado para emocionar o público!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoMuseuAfro} alt="Foto de uma projeção sob Curadoria e Produção do Coletivo Coletores " style={fotoCarrossel()} />
                                <p>Projeção mapeada realizada na fachada do Museu Afro Brasil Emanoel Araújo, no Parque Ibirapuera.
                                    Sob curadoria e produção do Coletivo Coletores, a obra “AKOMA” uniu arte, tecnologia e memória afro-latina.
                                    Utilizando projetores a laser e servidores de alta performance.</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src={fotoEventoG10} alt="Foto de uma projeção no Evento G10 Favelas em Paraísopolis" style={fotoCarrossel()} />
                                <p>Evento G10 Favelas em Paraisópolis oferecemos suporte logístico e instalação de estruturas para a intervenção
                                    do artista Diogo Terra, que iluminou o céu com projeções de lasers em uma ação artística marcante e emocionante.</p>
                            </section>
                        </CarouselItem>
                    </Carousel>
                </section>
            </section>

            <section className="container-projeto" id='projetos'>
                <h2>Projetos</h2>
                <div className="container-projeto-conteudo">
                    {deviced.mobile && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src={fotoEventoKKKK}
                            alt="Foto de uma projeção mapeada no Sesc Registro"
                        />
                    )}
                    <p> A antiga sede da Kaigai Kogyo Kabushiki Kaisha (KKKK), atualmente integrada ao Sesc Registro, recebe
                        a intervenção artística de Projeção Mapeada do Coletivo Coletores. A obra celebra a história da Imigração
                        Japonesa no Vale do Ribeira e destaca a contribuição do povo negro na construção social e cultural da região. Fundada em 1925,
                        a KKKK teve papel fundamental na colonização agrícola e no acolhimento de imigrantes japoneses. Hoje, o edifício histórico
                        é revitalizado como espaço de memória e expressão artística.</p>

                    {deviced.desktop && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src={fotoEventoKKKK}
                            alt="Foto de uma projeção mapeada no Sesc Registro"
                        />
                    )}
                    {deviced.tablet && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src={fotoEventoKKKK}
                            alt="Foto de uma projeção mapeada no Sesc Registro"
                        />
                    )}
                </div>
            </section>

            <section className="container-projeto">
                <div className="container-projeto-conteudo">
                    <img className='container-projeto-segunda-foto' style={fotoProjeto()} src={fotoEventoMogi} alt="Foto de uma projeção no Ginásio de Esportes de Mogi das Cruzes – SP" />
                    <p>
                        Inauguração do novo Ginásio de Esportes de Mogi das Cruzes – SP! Para esse momento especial, foram preparadas belas
                        ilustrações para a fachada, e a nossa missão foi dar vida a tudo isso com uma projeção que encantasse os olhos de quem estivesse lá:
                        uma projeção com 40 metros de largura por 15 metros de altura, iluminada com excelência por 4 projetores a laser de 15.000 lumens cada.
                        Porque não basta ser grande... tem que ter qualidade!</p>
                </div>
            </section>
        </section>
    );
}


export { Home };
