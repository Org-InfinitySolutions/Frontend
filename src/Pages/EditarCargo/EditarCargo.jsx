import { useNavigate, useParams } from 'react-router-dom'
import './EditarCargo.css'
import { useLocation } from 'react-router-dom';
import { ROUTERS } from '../../routers/routers';
import { useEffect, useState } from 'react';

function EditarCargo(){

    const { id } = useParams();
    const navegar = useNavigate();
    const location = useLocation();
    const { u } = location.state;

    const [cargo, setCargo] = useState(u.tipo);
    const [definirCargo, setDefinirCargo] = useState(cargo == "PJ" || cargo == "PF" ? 1 : 2);
    
    return(
        <div className='container-editar-cargo'>
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
                        <strong>CPF:</strong>
                        <span>{u.documento || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>Celular:</strong>
                        <span>{u.telefone_celular || "Não encontrado"}</span>
                    </div>
                    <div className='campo'>
                        <strong>Cargo:</strong>
                        <select value={definirCargo} onChange={(e) => { setDefinirCargo(e.target.value)}}>
                            <option value="1">Cliente</option>
                            <option value="2">Funcionário</option>
                        </select>
                    </div>
                </section>
                <section className='box-eventos'>
                    <button className='btn-voltar' onClick={() => { navegar(ROUTERS.GERENCIARUSUARIOS)}} >Voltar</button>
                    <button className='btn-alterar'>Alterar cargo</button>
                </section>
            </form>
        </div>
    )
}

export { EditarCargo }