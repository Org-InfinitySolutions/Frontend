
import { formatarCEP } from '../Utils/formatacoes'
import './DadosEndereco.css'

function DadosEndereco({
    endereco,
    dataEntrega,
    dataRetirada,
    tipo
}){

    return (
        <section className='container-dados-pedido'>
            <h2>ENDEREÇO</h2>
            <section className='box-informacoes'>
                <div className='secao-informacoes'>
                    <label>CEP:</label>
                    <input type="text" value={formatarCEP(endereco.cep)} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>RUA:</label>
                    <input type="text" value={endereco.logradouro} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>NÚMERO:</label>
                    <input type="text" value={endereco.numero} readOnly />
                </div>
            </section>
            <section className='box-informacoes'>
                <div className='secao-informacoes'>
                    <label>BAIRRO:</label>
                    <input type="text" value={endereco.bairro} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>CIDADE:</label>
                    <input type="text" value={endereco.cidade} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>ESTADO:</label>
                    <input type="text" value={endereco.estado} readOnly />
                </div>
            </section>
            <section className='box-complemento'>
                <label>COMPLEMENTO:</label>
                <input type="text" value={endereco.complemento || "Não informado"} readOnly />
            </section>
            <section className='box-informacoes'>
                <div className='secao-informacoes'>
                    <label>DATA E HORA ENTREGA:</label>
                    <input type="datetime-local" value={dataEntrega} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>DATA E HORA DEVOLUÇÃO:</label>
                    <input type="datetime-local" value={dataRetirada} readOnly />
                </div>
                <div className='secao-informacoes'>
                    <label>TIPO DE EVENTO:</label>
                    <input type="text" value={tipo} readOnly />
                </div>
            </section>
        </section>
    )
}

export { DadosEndereco }