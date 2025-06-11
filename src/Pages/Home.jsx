import './Home.css';
import videoFundo from '../assets/video-institucional.mp4';
import videoFundo2 from '../assets/Arq-home-pt1-v1.mp4';

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
        <section className="container-home">

            <section className='container-video' id='inicio'>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-fundo"
                >
                    <source src={videoFundo2} type="video/mp4" />
                </video>

                <section className="container-titulo">
                    <h1 className='titulo'>NOVA LOCAÇÕES</h1>
                    <div className="barra"></div>
                </section>
            </section>


            <section className="container-sobre-nos" id='sobre-nos'>
                <h2>Sobre nós</h2>
                <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                    quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                    vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut fugit cupiditate tempora provident laborum molestias nam voluptas libero,
                    nobis fugiat quasi repellendus eum, quidem sapiente quisquam excepturi corporis assumenda.</p>
            </section>

            <section className="container-servicos" id='servicos'>
                <h2>Serviços</h2>
                <section className="container-carrosel" >
                    <Carousel>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={fotoCarrossel()} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
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
                            src="./src/assets/FotoPalco.png"
                            alt="Foto de um palco"
                        />
                    )}
                    <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                        quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                        vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut fugit cupiditate tempora provident laborum molestias nam voluptas libero,
                        nobis fugiat quasi repellendus eum, quidem sapiente quisquam excepturi corporis assumenda.</p>

                    {deviced.desktop && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src="./src/assets/FotoPalco.png"
                            alt="Foto de um palco"
                        />
                    )}
                    {deviced.tablet && (
                        <img
                            className='container-projeto-primeira-foto'
                            style={fotoProjeto()}
                            src="./src/assets/FotoPalco.png"
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
