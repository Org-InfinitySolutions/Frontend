import { useState } from 'react';
import { Input } from '../components/Input';
import './Cadastro.css';

function Cadastro() {
    const [etapa, setEtapa] = useState(1);

    const dadosBase = {
        nome: '',
        cep: '',
        numero: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        celular: '',
    }

    const [formularioCPF, setFormularioCPF] = useState({
        dadosBase,
        rg: '',
        cpf: '',
    });

    const [formularioCNPJ, setFormularioCNPJ] = useState({
        dadosBase,
        razaoSocial: '',
        cnpj: '',
        telefone: ''
    });

    
    const [tipoUsuario, setTipoUsuario] = useState('fisica');


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormularioCPF((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = () => {
    //     console.log('Formulário enviado:', formulario);
    //     alert('Cadastro finalizado!');
    // };

    return (
        <section className={`container-cadastro ${etapa === 2 ? 'etapa-dois' : ''}`}>
            {etapa === 1 && (
                <>
                    <form className='container-formulario' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <button onClick={() => {setTipoUsuario('fisica')}}>CPF</button>
                                <div className='barra'></div>
                            </div>
                            <div className='option'>
                                <button onClick={() => {setTipoUsuario('juridica')}}>CNPJ</button>
                                <div className='barra'></div>
                            </div>
                        </div>
                      {tipoUsuario == 'fisica' ? (
                            <>
                            <section>
                            <Input
                                id='nome'
                                name='nome'
                                label='* Nome Completo:'
                                tipo='text'
                                placeholder='Nome Completo'
                                value={formularioCPF.dadosBase.nome}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='rg'
                                name='rg'
                                label='* RG:'
                                tipo='text'
                                placeholder='RG'
                                value={formularioCPF.rg}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='cpf'
                                name='cpf'
                                label='* CPF:'
                                tipo='text'
                                placeholder='CPF'
                                value={formularioCPF.cpf}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='celular'
                                name='celular'
                                label='* Celular:'
                                tipo='text'
                                placeholder='Celular'
                                value={formularioCPF.dadosBase.celular}
                                // onChange={handleChange}
                            />
                        </section>
                        </>
                        ) : ( 
                        <>
                        <section>
                            <Input
                                id='nome-fantasia'
                                name='nome-fantasia'
                                label='* Nome Fantasia:'
                                tipo='text'
                                placeholder='Nome Fantasia'
                                value={formularioCNPJ.dadosBase.nome}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='razao-social'
                                name='razao-social'
                                label='* Razão Social:'
                                tipo='text'
                                placeholder='Razão Social'
                                value={formularioCNPJ.razaoSocial}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='cnpj'
                                name='cnpj'
                                label='* CNPJ:'
                                tipo='text'
                                placeholder='CNPJ'
                                value={formularioCNPJ.cnpj}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='celular'
                                name='celular'
                                label='* Celular:'
                                tipo='text'
                                placeholder='Celular'
                                value={formularioCNPJ.dadosBase.celular}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='telefone'
                                name='telefone'
                                label='* Telefone:'
                                tipo='text'
                                placeholder='Telefone'
                                value={formularioCNPJ.telefone}
                                // onChange={handleChange}
                            />
                        </section>
                        </>
                        )}

                        <div className="botao-continuar-bloco">
                            <button
                                type="button"
                                className="botao-continuar"
                                onClick={() => setEtapa(2)}
                            >
                                Continuar
                            </button>
                            <p className="aviso-obrigatorio">* Preenchimento obrigatório</p>
                        </div>
                    </form>
                </>
                
            )}
                    
            {etapa === 2 && (
                <>
                    <form className='container-formulario-2' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <p>CPF</p>
                                <div className='barra'></div>
                            </div>
                        </div>
                        <section className='etapa2-section'>
                            <Input
                                id='cep'
                                name='cep'
                                label='* CEP:'
                                tipo='text'
                                placeholder='CEP'
                                value={dadosBase.cep}
                                // onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='numero'
                                name='numero'
                                label='* Número:'
                                tipo='text'
                                placeholder='Número'
                                value={dadosBase.numero}
                                // onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='rua'
                                name='rua'
                                label='* Rua:'
                                tipo='text'
                                placeholder='Rua'
                                value={dadosBase.rua}
                                // onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='bairro'
                                name='bairro'
                                label='* Bairro:'
                                tipo='text'
                                placeholder='Bairro'
                                value={dadosBase.bairro}
                                // onChange={handleChange}
                            />
                        </section>
                        
                        <div className='linha-cidade-estado'>
                            <section className='etapa2-section cidade'>
                                <Input
                                    id='cidade'
                                    name='cidade'
                                    label='* Cidade:'
                                    tipo='text'
                                    placeholder='Cidade'
                                    value={dadosBase.cidade}
                                    // onChange={handleChange}
                                />
                            </section>

                            <section className='etapa2-section estado'>
                                <Input
                                    id='estado'
                                    name='estado'
                                    label='* Estado:'
                                    tipo='text'
                                    placeholder='Estado'
                                    value={dadosBase.estado}
                                    // onChange={handleChange}
                                />
                            </section>
                        </div>
                        <section className='etapa2-section'>
                            <Input
                                id='complemento'
                                name='complemento'
                                label='* Complemento:'
                                tipo='text'
                                placeholder='Complemento'
                                value={dadosBase.complemento}
                                // onChange={handleChange}
                            />
                        </section>
                        <div className="botoes-e-aviso-etapa-2">
                            <div className="botoes-alinhados-etapa-2">
                                <button
                                    type='button'
                                    className='botao-voltar-etapa-2'
                                    onClick={() => setEtapa(1)}>
                                    Voltar
                                </button>

                                <button
                                    type="button"
                                    className="botao-continuar-etapa-2"
                                    onClick={() => setEtapa(3)}>
                                    Continuar
                                </button>
                            </div>
                            <p className="aviso-obrigatorio-etapa-2">* Preenchimento obrigatório</p>
                        </div>
                    </form>
                </>
            )}

            {etapa === 3 && (
                <>
                    <form className='container-formulario-3' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <p>CPF</p>
                                <div className='barra'></div>
                            </div>
                        </div>
                        <section>
                            <Input
                                id='email'
                                name='email'
                                label='* E-mail:'
                                tipo='email'
                                placeholder='Digite seu e-mail'
                                value={dadosBase.email}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='senha'
                                name='senha'
                                label='* Senha:'
                                tipo='password'
                                placeholder='Crie uma senha'
                                value={dadosBase.senha}
                                // onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='confirmarSenha'
                                name='confirmarSenha'
                                label='* Confirmar Senha:'
                                tipo='password'
                                placeholder='Confirme sua senha'
                                value={dadosBase.confirmarSenha}
                                // onChange={handleChange}
                            />
                        </section>
                        <div className="botoes-e-aviso-etapa-3">
                            <div className="botoes-alinhados-etapa-3">
                                <button
                                    type='button'
                                    className='botao-voltar-etapa-3'
                                    onClick={() => setEtapa(2)}>
                                    Voltar
                                </button>

                                <button
                                    type="button"
                                    className="botao-continuar-etapa-3"
                                    onClick={() => setEtapa(3)}>
                                    Criar
                                </button>
                            </div>
                            <p className="aviso-obrigatorio-etapa-3">* Preenchimento obrigatório</p>
                        </div>
                    </form>
                </>
            )}
        </section>
    );
}

export { Cadastro };
