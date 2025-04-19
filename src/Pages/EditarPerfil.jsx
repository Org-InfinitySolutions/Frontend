
import './EditarPerfil.css';
import iconeEditar from '../assets/iconeEditar.png'
import iconePesquisar from '../assets/iconePesquisar.png'

function EditarPerfil(){
    
    return(
    <div className="container">
        <div className="container-formulario">
            <section className="container-titulo">
                <h2>Editar conta</h2>
                <div className="barra"></div>
            </section>
            {localStorage.TIPO_USUARIO == "PF" ? (
            <section className="container-dados-pessoais">
                <h3>Dados pessoais:</h3>
                <section>
                    <label >Nome Completo:</label>
                    <input type="text" placeholder='Nome completo'/>
                </section>
                <section>
                    <label >Celular:</label>
                    <input type="text" placeholder='Ex: (11) 98754-8798'/>
                </section>
                <section>
                    <label >Email:</label>
                    <div>
                        <input type="text" placeholder='email@email.com' disabled="true"/>
                        <img src={iconeEditar} alt="icone editar" height="23em"/>
                    </div>
                </section>
                <button>Alterar Senha</button>
            </section>
            ) : (
            <section className="container-dados-pessoais">
                <h3>Dados da empresa:</h3>
                <section>
                    <label >Nome Fantasia:</label>
                    <input type="text" placeholder='Nome fantasia'/>
                </section>
                <section>
                    <label >Razão Social:</label>
                    <input type="text" placeholder='Razão social'/>
                </section>
                <section>
                    <label >Celular:</label>
                    <input type="text" placeholder='Ex: (11) 98754-8798'/>
                </section>
                <section>
                    <label >Telefone:</label>
                    <input type="text" placeholder='Ex: (11) 5887-8585'/>
                </section>
                <section>
                    <label >Email:</label>
                    <div>
                        <input type="text" placeholder='email@email.com' disabled="true"/>
                        <img src={iconeEditar} alt="icone editar" height="23em" onClick={editarEmail}/>
                    </div>
                </section>
                <button>Alterar Senha</button>
            </section>
            )} 
            <section className="container-dados-endereco">
                <h3>Endereço:</h3>
                <section>
                    <label >CEP:</label>
                    <div className='box-cep'>
                        <img src={iconePesquisar} alt="" height="20em"/>
                        <input type="text" placeholder='12345-258' className='input-cep'/>
                    </div>
                </section>
                <section>
                    <label >Rua:</label>
                    <input type="text" placeholder='Ex.: Rua são joaquim'/>
                </section>
                <section>
                    <label >Número:</label>
                    <input type="text" placeholder='Ex.: (11) 98754-8798'/>
                </section>
                <section>
                    <label >Bairro:</label>
                    <input type="text" placeholder='Ex.: (11) 5887-8585'/>
                </section>
                <section>
                    <div className='box-cidade'>
                        <label >Cidade:</label>
                        <input type="text" placeholder='São Paulo'/>
                    </div>
                    <div className='box-estado'>
                        <label >Estado:</label>
                        <input type="text" placeholder='SP'/>
                    </div>
                </section>  
                <section>
                    <label >Complemento:</label>
                    <input type="text" placeholder='Complemento'/>
                </section>
            </section>
            <section className="container-eventos">
                <a href='/perfil'>Cancelar</a>
                <button>Confirmar</button>
            </section>
        </div>
    </div>
    ) 
}

function editarEmail(){
       
}

export { EditarPerfil }