import { useState } from 'react';
import { Input } from '../components/Input';
import './Cadastro.css';

function Cadastro() {
    const [etapa, setEtapa] = useState(1);

    const [formulario, setFormulario] = useState({
        nome: '',
        rg: '',
        cpf: '',
        celular: '',
        cep: '',
        numero: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        complemento: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Formulário enviado:', formulario);
        alert('Cadastro finalizado!');
    };

    return (
        <section className={`container-cadastro ${etapa === 2 ? 'etapa-dois' : ''}`}>
            {etapa === 1 && (
                <>
                    <form className='container-formulario' onSubmit={(e) => e.preventDefault()}>
                        <h1>CADASTRO</h1>
                        <div className='barra-divisoria-cadastro'></div>
                        <div className='options-cadastro'>
                            <div className='option'>
                                <p>CPF</p>
                                <div className='barra'></div>
                            </div>
                            <div className='option'>
                                <p>CNPJ</p>
                                <div className='barra'></div>
                            </div>
                        </div>
                        <section>
                            <Input
                                id='nome'
                                name='nome'
                                label='* Nome Completo:'
                                tipo='text'
                                placeholder='Nome Completo'
                                value={formulario.nome}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='rg'
                                name='rg'
                                label='* RG:'
                                tipo='text'
                                placeholder='RG'
                                value={formulario.rg}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='cpf'
                                name='cpf'
                                label='* CPF:'
                                tipo='text'
                                placeholder='CPF'
                                value={formulario.cpf}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='celular'
                                name='celular'
                                label='* Celular:'
                                tipo='text'
                                placeholder='Celular'
                                value={formulario.celular}
                                onChange={handleChange}
                            />
                        </section>
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
                                value={formulario.cep}
                                onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='numero'
                                name='numero'
                                label='* Número:'
                                tipo='text'
                                placeholder='Número'
                                value={formulario.numero}
                                onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='rua'
                                name='rua'
                                label='* Rua:'
                                tipo='text'
                                placeholder='Rua'
                                value={formulario.rua}
                                onChange={handleChange}
                            />
                        </section>
                        <section className='etapa2-section'>
                            <Input
                                id='bairro'
                                name='bairro'
                                label='* Bairro:'
                                tipo='text'
                                placeholder='Bairro'
                                value={formulario.bairro}
                                onChange={handleChange}
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
                                    value={formulario.cidade}
                                    onChange={handleChange}
                                />
                            </section>

                            <section className='etapa2-section estado'>
                                <Input
                                    id='estado'
                                    name='estado'
                                    label='* Estado:'
                                    tipo='text'
                                    placeholder='Estado'
                                    value={formulario.estado}
                                    onChange={handleChange}
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
                                value={formulario.complemento}
                                onChange={handleChange}
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
                                value={formulario.email}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='senha'
                                name='senha'
                                label='* Senha:'
                                tipo='password'
                                placeholder='Crie uma senha'
                                value={formulario.senha}
                                onChange={handleChange}
                            />
                        </section>
                        <section>
                            <Input
                                id='confirmarSenha'
                                name='confirmarSenha'
                                label='* Confirmar Senha:'
                                tipo='password'
                                placeholder='Confirme sua senha'
                                value={formulario.confirmarSenha}
                                onChange={handleChange}
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
