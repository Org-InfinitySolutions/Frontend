import './Index.css';
import videoFundo from '../assets/video-institucional.mp4';

import { Carousel } from "../components/Carrossel/Carousel"
import {CarouselItem} from "../components/Carrossel/CarouselItem"
import { DivCarouselItem } from '../components/Carrossel/style';    
    

function Index() {
    return (
        <section className="container">

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
            <h1>NOVA LOCAÇÕES</h1>
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
                        <CarouselItem>Item 1</CarouselItem>
                        <CarouselItem>Item 2</CarouselItem>
                        <CarouselItem>Item 3</CarouselItem>
                        <CarouselItem>Item 4</CarouselItem>
                        <CarouselItem>Item 5</CarouselItem>
                    </Carousel>
                      </section>
        </section>
        </section>
    );
}


export { Index };
