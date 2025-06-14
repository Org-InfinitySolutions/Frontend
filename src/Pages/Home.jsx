import './Home.css';
import fotoFundo from '../assets/nova-logo.png';
import fotoEventoKKKK from '../assets/evento-kkkk-sesc.webp';
import { Carousel } from "../components/Carrossel/Carousel"
import { CarouselItem } from "../components/Carrossel/CarouselItem"
import { DivCarouselItem } from '../components/Carrossel/style';
import { useEffect, useState } from 'react';

const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

function Home() {

    const [deviced, setDeviced] = useState(getDevice());

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

    const fotoCarrossel = () => {
        if (deviced.mobile) {
            return { width: "280px", height: "auto" };
        } else if (deviced.tablet) {
            return { width: "280px", height: "auto" };
        } else if (deviced.desktop) {
            return { width: "350px", height: "auto" };
        }
    }

    const fotoProjeto = () => {
        if (deviced.mobile) {
            return { width: "100%", height: "50%", flexDirection: "column" };
        } else if (deviced.tablet) {
            return { width: "40vw", flexDirection: "column" };
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


            <section className="container-sobre-nos" id='sobre-nos'>
                <h2>Sobre nós</h2>
                <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                    quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                    vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                </p>
            </section>

            <section className="container-servicos" id='servicos'>
                <h2>Serviços</h2>
                <section className="container-carrosel" >
                    <Carousel>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </CarouselItem>
                        <CarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
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
                            alt="Foto de um palco"
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
                            alt="Foto de um palco"
                        />
                    )}
                    {deviced.tablet && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src={fotoEventoKKKK}
                            alt="Foto de um palco"
                        />
                    )}
                </div>
            </section>

            <section className="container-projeto">
                <div className="container-projeto-conteudo">
                    <img className='container-projeto-segunda-foto' style={fotoProjeto()} src="./src/assets/FotoPalco.png" alt="Foto de um palco" />
                    <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                        quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                        vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut fugit cupiditate tempora provident laborum molestias nam voluptas libero,
                        nobis fugiat quasi repellendus eum, quidem sapiente quisquam excepturi corporis assumenda.</p>
                </div>
            </section>
        </section>
    );
}


export { Home };
