import './Home.css';
import videoFundo from '../assets/video-institucional.mp4';

import { Carousel } from "../components/Carrossel/Carousel"
import { CarouselItem } from "../components/Carrossel/CarouselItem"
import { DivCarouselItem } from '../components/Carrossel/style';

function Home() {
    return (
        <section className="container-home">

            <section className='container-video'>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-fundo"
                >
                    <source src={videoFundo} type="video/mp4" />
                </video>

                <section className="container-titulo">
                    <h1 className='titulo'>NOVA LOCAÇÕES</h1>
                    <div className="barra"></div>
                </section>
            </section>


            <section className="container-sobre-nos">
                <h2>Sobre nós</h2>
                <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                    quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                    vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut fugit cupiditate tempora provident laborum molestias nam voluptas libero,
                    nobis fugiat quasi repellendus eum, quidem sapiente quisquam excepturi corporis assumenda.</p>
            </section>

            <section className="container-servicos">
                <h2>Serviços</h2>
                <section className="container-carrosel" >
                    <Carousel>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p> 
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto1.png" alt="Foto de um evento" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                        <DivCarouselItem>
                            <section>
                                <img src="./src/assets/Foto2.png" alt="Foto de um projetor" style={{ width: "330px", height: "250px" }} />
                                <p>Lorem ipsum dolor sit amet consectetur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Incidunt beatae illum repudiandae cupiditate sequi reprehenderit quidem explicabo laudantium nesciunt reiciendis 
                                    sed perspiciatis autem velit ducimus quod hic aliquid, excepturi voluptatibus!</p>
                            </section>
                        </DivCarouselItem>
                    </Carousel>
                </section>
            </section>

            <section className="container-projeto"> 
            <h2>Projetos</h2>
            <div className="container-projeto-conteudo">
                <p> <b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores ipsam autem et voluptatem delectus
                    quos itaque dolore, minima dolor fugiat consequuntur? Possimus quo iusto assumenda eos labore reiciendis in?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quaerat obcaecati eveniet provident optio adipisci</b>
                    vitae maiores numquam culpa quam vero, illum iusto voluptate aliquam cum eaque debitis, voluptas amet!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut fugit cupiditate tempora provident laborum molestias nam voluptas libero,
                    nobis fugiat quasi repellendus eum, quidem sapiente quisquam excepturi corporis assumenda.</p>
                    <img src="./src/assets/FotoPalco.png" alt="Foto de um palco"/>
            </div>
            </section>

            <section className="container-projeto"> 
            <div className="container-projeto-conteudo">
            <img src="./src/assets/FotoPalco.png" alt="Foto de um palco"/>
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
