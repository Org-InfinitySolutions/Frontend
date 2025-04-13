
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import { Navegabilidade } from '../components/Navegabilidade';
import './DefinirEndereco.css'

import iconePesquisar from '../assets/iconePesquisar.png'

function DefinirEndereco(){

    const navigate = useNavigate();

    return(
    <div className="container-endereco">
        <h1>Definir endereço de entrega e retirada dos equipamentos.</h1>
        <section className="box-endereco">
            <section className='box-informacoes'>
                <div className='box-cep'>
                    <Input id="inp_cep" label="* CEP:" tipo="text" placeholder="CEP"/>
                    <button>
                        <img src={iconePesquisar} alt="icone de pesquisar" height="23em"/>
                    </button>
                </div>
                <Input id="inp_rua" label="* RUA:" tipo="text" placeholder="Ex.: Rua são Joaquim"/>
                <Input id="inp_numero" label="* NÚMERO:" tipo="number" placeholder="Número"/>
            </section>
            <section className='box-informacoes'>
                <Input id="inp_bairro" label="* BAIRRO:" tipo="text" placeholder="Ex.: Taboão da Serra"/>
                <Input id="inp_cidade" label="* CIDADE:" tipo="text" placeholder="Ex.: São Paulo"/>
                <Input id="inp_estado" label="* ESTADO:" tipo="text" placeholder="Ex.: SP"/>
            </section>
            <section className='box-complemento'>
                <Input id="inp_complemento" label="* COMPLEMENTO:" tipo="text" placeholder="Ex.: Próximo do mêtro"/>
            </section>
            <section className='box-informacoes'>
                <Input id="inp_dtEntrega" label="* DATA E HORA ENTREGA:" tipo="datetime-local"/>
                <Input id="inp_dtRetirada" label="* DATA E HORA RETIRADA:" tipo="datetime-local"/>
                <div className='tipo-evento'>
                    <label htmlFor="slc_tipoEvento">* TIPO DE EVENTO:</label>
                    <select id="slc_tipoEvento">
                        <option value="INDOOR" selected>Indoor</option>
                        <option value="OUTDOOR">Outdoor</option>
                    </select>
                </div>
            </section>
            <section className='box-preenchimento-obrigatorio'>
                <span>* Preenchimento obrigatório</span>
            </section>
        </section>
        <Navegabilidade largura={"80%"} linkVoltar={"/carrinho"} funcaoAvancar={() => { navigate("/carrinho/finalizar")}} textoAvancar={"Continuar"}/>
    </div>
    )
}

export { DefinirEndereco }