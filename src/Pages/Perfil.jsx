
import './Perfil.css'

function Perfil(){

    return(
    <div className="container">
        <div className="container-perfil">
            <section className="titulo-form">
                {/* implementar validacao para mudar titulo form */}
                <h2>{localStorage.TIPO_USUARIO == "PF" ? "Meu perfil" : "Minha empresa"}</h2>
                <div className="barra"></div>
            </section>
            {localStorage.TIPO_USUARIO === "PJ" ? (
            <section className="dados-pessoais">
                <h3>Dados pessoais:</h3>
                <span>Nome: Rafaela Gonçalves Sousa</span>
                <span>CPF: 190.098.223-01</span>
                <span>RG: 88.765.234-9</span>
                <span>E-mail: rafaela.goncalves@hotmail.com</span>
                <span>Celular: 11 98768-0918</span>
            </section>
            ) : (
            <section className="dados-pessoais">
                <h3>Dados da empresa:</h3>
                <span>Nome fantasia: Rafaela Gonçalves Sousa</span>
                <span>Razão social: 88.765.234-9</span>
                <span>CNPJ: 12.345.678/0001-95</span>
                <span>E-mail: rafaela.goncalves@hotmail.com</span>
                <span>Celular: 11 98768-0918</span>
                <span>Telefone: 11 98768-0918</span>
            </section>
            )}
            <section className="dados-endereco">
                <h3>Endereço:</h3>
                <span>Rua: Rua são joaquim</span>
                <span>Número: 1900</span>
                <div>
                    <span>Cidade: Taboão da Serra</span>
                    <span>Estado: SP</span>
                </div>
                <span>Complemento: 11 98768-0918</span>
            </section>
            <section className="container-eventos">
                <div className="eventos-excluir-editar">
                    <button className="botao-excluir">Excluir Conta</button>
                    <a href='/editar-perfil' className="botao-editar">Editar Conta</a>
                </div>
                <div className="evento-voltar">
                    <a className='botao-retroceder' href="#">Voltar</a>
                </div>
            </section>
            <section className="dados-utilitarios">
                <span>Conta criada em 13/03/2025 às 20:19</span>
                <span>Ultima alteração em 14/03/2025 às 07:02</span>
            </section>
        </div>
    </div>
    )
}

export { Perfil }