
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input/Input'
import { Navegabilidade } from '../../components/Navegabilidade/Navegabilidade';
import './DefinirEndereco.css'
import { validarCEP, validarNumero, validarEndereco, campoNaoAtendeTamanho, campoVazio } from '../../utils/validarCampos'
import { api } from '../../provider/apiInstance'
import { use, useEffect, useState } from 'react';
import { formatarCEP } from '../../utils/formatacoes'
import { tokenExpirou } from '../../utils/token'
import { exibirAvisoTokenExpirado, exibirAviso } from '../../utils/exibirModalAviso'
import { buscarEndereco } from '../../provider/buscarCEP';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';

function DefinirEndereco(){

    const navigate = useNavigate();
    const [session, setSession] = useState(sessionStorage.CARRINHO);
    const [usuarioLogado, setUsarioLogado] = useState(sessionStorage.USUARIO_LOGADO == "True");
    const sessionEnd = JSON.parse(session).endereco;
    const sessiondtEntrega = JSON.parse(session).dataEntrega;
    const sessiondtRetirada = JSON.parse(session).dataRetirada;
    const sessionTipoEvento = JSON.parse(session).tipo;

    // models
    const [dadosAdicionais, setDadosAdicionais] = useState(  {
        dataEntrega: sessiondtEntrega ? sessiondtEntrega : '',
        dataRetirada: sessiondtRetirada ? sessiondtRetirada : '',
        tipo: sessionTipoEvento ? sessionTipoEvento  : 'INDOOR'
    })
    const [endereco, setEndereco] = useState({
        cep: sessionEnd ? sessionEnd.cep : '', 
        logradouro: sessionEnd ? sessionEnd.logradouro : '',
        numero: sessionEnd ? sessionEnd.numero : '',
        complemento: sessionEnd ? sessionEnd.complemento : '',
        estado: sessionEnd ? sessionEnd.estado : '',
        cidade: sessionEnd ? sessionEnd.cidade : '',
        bairro: sessionEnd ? sessionEnd.bairro : '' 
    });
    const [desativarBotao, setDesativarBotao] = useState(true);

    // funcoes callback
    useEffect(() => {

        if(usuarioLogado){
            if(tokenExpirou()){
                exibirAvisoTokenExpirado(navigate);
            } else {
                api.get(ENDPOINTS.USUARIOID.replace(':id', sessionStorage.ID_USUARIO), {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.TOKEN}`
                    }
                }).then((res) => {
                    const caixote = res.data.endereco;
                    sessionStorage.CADASTRO_COMPLETO = res.data.cadastro_completo;
                    setEndereco((dados) => ({ ...dados, ...caixote }));
                })
            }
        }
    }, []);

    const [desabilitar, setDesabilitar] = useState(true);
    useEffect(() => {
        const consultarEndereco = async () => {
            const cep = endereco.cep.replace('-', '');
            if(cep.length == 8){

                const dadosEndereco = await buscarEndereco(cep);
                if(dadosEndereco.valido){
                    setEndereco((dados) => ({
                        ...dados,
                        logradouro: dadosEndereco.objeto.logradouro,
                        bairro: dadosEndereco.objeto.bairro,
                        cidade: dadosEndereco.objeto.localidade,
                        estado: dadosEndereco.objeto.uf
                    }))
                    setDesabilitar(true);
                }
            } else{
                setDesabilitar(false);
            }
        }
        consultarEndereco();
    }, [endereco.cep])

    useEffect(() => {
        const dataEntrega = new Date(dadosAdicionais.dataEntrega);
        const dataRetirada = new Date(dadosAdicionais.dataRetirada);

        if(campoNaoAtendeTamanho(formatarCEP(endereco.cep), 9) || campoVazio(endereco.numero) || campoVazio(endereco.logradouro) || campoVazio(endereco.estado) || campoVazio(endereco.cidade) || campoVazio(endereco.bairro) || campoVazio(dadosAdicionais.tipo) || dataEntrega.toString() == 'Invalid Date' || dataRetirada.toString() == 'Invalid Date'){
            setDesativarBotao(true);
        } else {
            setDesativarBotao(false);
        }
    }, [endereco, dadosAdicionais])

    // funcões
    const prosseguirPedido = () => {

        const montarCarrinho = JSON.parse(sessionStorage.CARRINHO);
        montarCarrinho.endereco = endereco;
        montarCarrinho.dataEntrega = dadosAdicionais.dataEntrega;
        montarCarrinho.dataRetirada = dadosAdicionais.dataRetirada;
        montarCarrinho.tipo = dadosAdicionais.tipo;

        sessionStorage.CARRINHO = JSON.stringify(montarCarrinho);

        navigate(ROUTERS.CARRINHOFINALIZAR);
    }

    const validarForm = () => {

        const dataEntrega = new Date(dadosAdicionais.dataEntrega);
        const dataRetirada = new Date(dadosAdicionais.dataRetirada);
        const dtAtual = new Date();
        
        const tipoEvento = dadosAdicionais.tipo;
        
        // verificar se o intervalo entre as datas é de no minimo 3 horas
        const diferencaMs = dataRetirada - dataEntrega;
        const diferencaHoras = diferencaMs / (1000 * 60 * 60); 

        if(
            campoNaoAtendeTamanho(formatarCEP(endereco.cep), 9) || campoVazio(endereco.numero) || 
            campoVazio(endereco.logradouro) || campoVazio(endereco.estado) || 
            campoVazio(endereco.cidade) || campoVazio(endereco.bairro) || 
            dataEntrega.toString() == 'Invalid Date' || dataRetirada.toString() == 'Invalid Date'){
            exibirAviso("Preencher todos os campos obrigatórios", 'error');
        } else if(dataEntrega > dataRetirada){
            exibirAviso("A data de devolução deve ser maior que a data de entrega", 'error');
        } else if(dtAtual > dataEntrega){
            exibirAviso("A Data de entrega deve ser maior que a data atual", 'error');
        } else if(dtAtual > dataRetirada){
            exibirAviso("A Data de devolução deve ser maior que a data atual", 'error');
        } else if(diferencaHoras < 3){
            exibirAviso("O intervalo mínimo entre as datas precisa ser 3 horas", 'error');
        } else if(tipoEvento != 'INDOOR' && tipoEvento != 'OUTDOOR'){
            exibirAviso("O tipo de evento é inválido", 'error');
        } else {
            prosseguirPedido();
        }
    }

    return(
    <div className="container-endereco">
        <h1>Definir endereço de entrega e devolução dos equipamentos.</h1>
        <section className="box-endereco">
            <section className='box-informacoes'>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_cep'}
                        label="* CEP:" 
                        tipo="text" 
                        placeholder="CEP" 
                        maxLength={9} 
                        validacao={validarCEP}
                        valor={formatarCEP(endereco.cep)} 
                        onChange={(e) => { setEndereco((dados) => ({
                            ...dados, cep: formatarCEP(e.target.value)
                        }))}}
                    />
                </div>
                <div className='secao-entrada'>
                    <Input
                        id={'inp_rua'}
                        label="* RUA:" 
                        tipo="text" 
                        placeholder="Ex.: Rua são Joaquim" 
                        validacao={validarEndereco}
                        valor={endereco.logradouro}
                        desabilitar={desabilitar}
                        maxLength={50} 
                        onChange={(e) => { setEndereco((dados) => ({
                            ...dados, logradouro: e.target.value
                        }))}}
                    />
                </div>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_numero'}
                        label="* NÚMERO:" 
                        tipo="text" 
                        placeholder="Número" 
                        validacao={validarNumero} 
                        maxLength={10}
                        valor={endereco.numero}
                        onChange={(e) => setEndereco((dados) => ({
                            ...dados, numero: e.target.value
                        }))}
                    />
                </div>
            </section>
            <section className='box-informacoes'>
                <div className='secao-entrada'>
                    <Input
                        id={'inp_bairro'}
                        label="* BAIRRO:" 
                        tipo="text" 
                        placeholder="Ex.: Taboão da Serra"
                        maxLength={50}
                        desabilitar={desabilitar}
                        valor={endereco.bairro}
                        onChange={(e) => setEndereco((dados) => ({
                            ...dados, bairro: e.target.value
                        }))}
                    />
                </div>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_cidade'}
                        label="* CIDADE:" 
                        tipo="text" 
                        placeholder="Ex.: São Paulo"
                        maxLength={50}
                        desabilitar={desabilitar}
                        valor={endereco.cidade}
                        onChange={(e) => { setEndereco((dados) => ({
                            ...dados, cidade: e.target.value
                        }))}}
                    />
                </div>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_estado'}
                        label="* ESTADO:" 
                        tipo="text" 
                        placeholder="Ex.: SP"
                        maxLength={2}
                        desabilitar={desabilitar}
                        valor={endereco.estado}
                        onChange={(e) => { setEndereco((dados) => ({
                            ...dados, estado: e.target.value
                        }))}}
                    />
                </div>
            </section>
            <section className='box-complemento'>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_complemento'}
                        label="COMPLEMENTO:" 
                        tipo="text" 
                        placeholder="Ex.: Próximo do mêtro"
                        maxLength={100}
                        valor={endereco.complemento}
                        onChange={(e) => { setEndereco((dados) => ({
                            ...dados, complemento: e.target.value 
                        }))}}    
                    />
                </div>
            </section>
            <section className='box-informacoes'>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_dtEntrega'}
                        label="* DATA E HORA ENTREGA:" 
                        tipo="datetime-local"
                        valor={dadosAdicionais.dataEntrega}
                        onChange={(e) => { setDadosAdicionais((dados) => ({
                            ...dados, dataEntrega: e.target.value
                        }))}}
                    />
                </div>
                <div className='secao-entrada'>
                    <Input 
                        id={'inp_bairro'}
                        label="* DATA E HORA DEVOLUÇÃO:" 
                        tipo="datetime-local"
                        valor={dadosAdicionais.dataRetirada}
                        onChange={(e) => { setDadosAdicionais((dados) => ({
                            ...dados, dataRetirada: e.target.value
                        }))}}
                    />
                </div>
                <div className='tipo-evento'>
                    <label htmlFor="slc_tipoEvento">* TIPO DE EVENTO:</label>
                    <select id="slc_tipoEvento" defaultValue={dadosAdicionais.tipo} onChange={(e) => { setDadosAdicionais((dados) => ({
                        ...dados, tipo: e.target.value
                    }))}}>
                        <option value="INDOOR">Indoor</option>
                        <option value="OUTDOOR">Outdoor</option>
                    </select>
                </div>
            </section>
            <section className='box-preenchimento-obrigatorio'>
                <span>* Preenchimento obrigatório</span>
            </section>
        </section>
        <Navegabilidade linkVoltar={`${ROUTERS.CARRINHO}`} funcaoAvancar={validarForm} textoAvancar={"Continuar"} desabilitar={desativarBotao}/>
    </div>
    )
}

export { DefinirEndereco }