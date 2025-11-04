import { useNavigate, useParams } from 'react-router-dom'
import './EditarCargo.css'
import { useLocation } from 'react-router-dom';
import { ROUTERS } from '../../routers/routers';
import { useEffect, useState } from 'react';
import { api } from '../../provider/apiInstance';
import { ENDPOINTS } from '../../routers/endpoints';
import { exibirAviso } from '../../utils/exibirModalAviso';
import LoadingBar from 'react-top-loading-bar';

function EditarCargo(){

    const { id } = useParams();
    const navegar = useNavigate();
    const location = useLocation();
    const { u } = location.state;

    const [definirCargo, setDefinirCargo] = useState(u.tipo);
    const [barraCarregamento, setBarraCarregamento] = useState(0);
    
    const alterarCargoUsuario = () => {
        if(definirCargo == "CLIENTE"){
            rebaixarUsuario();
        } else if (definirCargo == "FUNCIONÁRIO"){
            promoverUsuario();
        } else {
            exibirAviso('Ocorreu um erro, tente novamente mais tarde', 'error');
        }
    }

    const promoverUsuario = () => {
        setBarraCarregamento(30);
        api.put(ENDPOINTS.PUTPROMOVERUSUARIO.replace(":id", id), {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.TOKEN}`
            }
        }).then((res) => {
            setBarraCarregamento(100);
            exibirAviso('Usuário promovido com sucesso!', 'success');
        }).catch((err) => {
            setBarraCarregamento(100);
            exibirAviso(err.response.data.error, 'error');
        })
    }

    const rebaixarUsuario = () => {
        setBarraCarregamento(30);
        api.put(ENDPOINTS.PUTREBAIXARUSUARIO.replace(":id", id), {},
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.TOKEN}`
            }
        }).then((res) => {
            setBarraCarregamento(100);
            exibirAviso('Usuário rebaixado com sucesso!', 'success');
        }).catch((err) => {
            setBarraCarregamento(100);
            exibirAviso(err.response.data.error, 'error');
        })
    }

    return(
        <div className='container-editar-cargo'>
            <LoadingBar
                progress={barraCarregamento}
                height={3}
                color="#f11946"
            />
            <form className='formulario-perfil' onSubmit={(e) => e.preventDefault()}>
                <section className='box-titulo'>
                    <h2 className='titulo-perfil'>Perfil do usuário</h2>
                    <div className='linha-colorida'></div>
                </section>
                <section className='box-campos'>
                    <div className='campo'>
                        <strong>Nome:</strong>
                        <span>{u.nome || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>Email:</strong>
                        <span>{u.email || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>{u.documento.length == "14" ? "CPF:" : "CNPJ:"}</strong>
                        <span>{u.documento || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>Celular:</strong>
                        <span>{u.telefone_celular || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>Cargo:</strong>
                        <select value={definirCargo} onChange={(e) => { setDefinirCargo(e.target.value)}}>
                            <option value="CLIENTE">Cliente</option>
                            <option value="FUNCIONÁRIO">Funcionário</option>
                        </select>
                    </div>
                </section>
                <section className='box-eventos'>
                    <button className='btn-voltar' onClick={() => { navegar(ROUTERS.GERENCIARUSUARIOS)}} >Voltar</button>
                    <button className='btn-alterar' onClick={alterarCargoUsuario}>Alterar cargo</button>
                </section>
            </form>
        </div>
    )
}

export { EditarCargo }