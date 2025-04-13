import './Index.css';
import videoFundo from '../assets/video-institucional.mp4';

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


        <section className="container-conteudo">
                <p>Explore nossos produtos e serviços.</p>
        </section>
        </section>
    );
}
export { Index };
