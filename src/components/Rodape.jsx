import './Rodape.css';
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
                    return { width: "120%", height: "auto" };
                } else if (deviced.tablet) {
                    return { width: "60%", height: "auto" };
                } else if (deviced.desktop) {
                    return { width: "30%", height: "auto" };
                }
            }

  return (
    <>
        <div className='barra-divisoria'></div>
        <footer>
            <section className='container-informacoes-gerais'>
                <section className='container-logo'>
                    <img src='/logoNova.jpg' alt='Logo nova locações' height='80%'/>
                </section>
                <section className='container-contatos'>
                    <div>
                        <strong>Fale conosco</strong>
                    </div>
                    <div>
                        <img src={wpp} alt="icone whatsapp" height='25em'/>
                        <span>11 94144-2113</span>
                    </div>
                    <div>
                        <img src={telefone} alt="icone telefone" height='25em'/>
                        <span>11 4786-3508</span>
                    </div>
                    <div>
                        <img src={instagram} alt="icone instagram" height='25em'/>
                        <span>@nova_locacoes</span>
                    </div>
                    <div>
                        <img src={email} alt="icone email" height='25em'/>
                        <span>comercial@novalocacoes.com</span>
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
                <span>Rua joão pires de camargo, 28, Taboão da Serra</span>
            </section>
        </footer>
    </>
  );
}

export { Rodape };