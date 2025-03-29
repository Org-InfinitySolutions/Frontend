import './BarraNavegacao.css';

function BarraNavegacao(){

    return(
    <>
        <nav className="barra-navegacao">
            <section className="container-logo">
                <img src="/Logo.png" height="80%" alt="logo nova locações" />
            </section>
            <section className="container-links">
                <div>
                    <a href="">Projetos</a>
                    <a href="">Serviços</a>
                    <a href="">Locações</a>
                </div>
            </section>
            <section className="container-eventos">
                <a href='#' className='botao-cadastro'>Cadastro</a>
                <a href='/login' className='botao-login'>Login</a>
            </section>
        </nav>
        <div className='barra-divisoria'></div>
    </>
    )
}

export { BarraNavegacao }