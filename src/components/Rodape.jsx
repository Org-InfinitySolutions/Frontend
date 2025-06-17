import './Rodape.css';
import logoNovaLocacoes from '../assets/logoNovaSemTexto.jpg';
import wpp from '../assets/wpp.png';
import instagram from '../assets/instagram.png';
import telefone from '../assets/telefone.png';
import email from '../assets/email.png';
import empresa from '../assets/empresa.png' ;
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

function Rodape() {
    
    const [deviced, setDeviced] = useState(getDevice());

    useEffect(() => {
                const onResize = () => setDeviced(getDevice());
                window.addEventListener('resize', onResize);
                return () => window.removeEventListener('resize', onResize);
            }, []);
        
            const logo = () => {
                if (deviced.mobile) {
                    return { width: "15vh", height: "auto" };
                } else if (deviced.tablet) {
                    return { width: "100%", height: "auto" };
                } else if (deviced.desktop) {
                    return { width: "100%", height: "auto", marginTop: "2%" };
                }
            }

  return (
    <>
        <div className='barra-divisoria'></div>
        <footer>
            <section className='container-informacoes-gerais'>
                <section className='container-logo'>
                    <img src={logoNovaLocacoes} alt='Logo nova locações' style={logo()}/>
                </section>

                <section className='container-contatos'>
                    <div>
                        <strong>Fale conosco</strong>
                    </div>
                    <div>
                        <img src={wpp} alt="icone whatsapp" height='25em'/>
                        <Link className='links-contato' to={"https://wa.me/c/5511947583180"}>11 94758-3180</Link>
                    </div>
                    <div>
                        <img src={telefone} alt="icone telefone" height='25em'/> 
                        <a className='texto-contato'>11 4786-3508</a>
                        {/* <Link className='links-contato'>11 4786-3508</Link> */}
                    </div>
                    <div>
                        <img src={instagram} alt="icone instagram" height='25em'/>
                        <Link className='links-contato' to={"https://www.instagram.com/nova_locacoes?igsh=MTBudXo1ZmFtaDRydQ=="}>@nova_locacoes</Link>
                    </div>
                    <div>
                        <img src={email} alt="icone email" height='25em'/>
                        <a className='texto-contato'>comercial@novalocacoes.com</a>
                        {/* <Link className='links-contato' to={"https://chatgpt.com/c/684c8f08-34f0-800f-8355-b887bf2c5035"}>comercial@novalocacoes.com</Link> */}
                    </div>
                </section>

                <section className='container-links'>
                    <div><strong>Sobre</strong></div>
                    <div><a href="/#inicio">Home</a></div>
                    <div><a href="/#sobre-nos">Sobre nós</a></div>
                    <div><a href="/#servicos">Serviços</a></div>
                    <div><a href="/#projetos">Projetos</a></div>
                </section>
            </section>
            
            <section className='container-endereco'>
                <img src={empresa} alt="icone empresa" height='25em'/>
                <Link className='links-endereco' to={"https://g.co/kgs/8JcmzfB"}>Rua joão pires de camargo, 28, Taboão da Serra</Link>
            </section>
        </footer>
    </>
  );
}

export { Rodape };