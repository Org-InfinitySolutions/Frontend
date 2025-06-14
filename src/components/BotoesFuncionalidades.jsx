import { useState } from 'react';
import './BotoesFuncionalidades.css';
import { useLocation } from 'react-router-dom';

function BotoesFuncionalidades(){

    const [habilitarFuncoesGerenciais, setHabilitarFuncoesGerenciais] = useState(sessionStorage.CARGO == "ROLE_ADMIN" || sessionStorage.CARGO == "ROLE_FUNCIONARIO");
    const location = useLocation();
    const url = location.pathname;

    return(
    <div className="botoes-toggle">
        <a href='/equipamentos' className={url == '/equipamentos' ? "ativo" : "inativo"}>EQUIPAMENTOS</a>
        <a href="/pedidos" className={url == '/pedidos' ? "ativo" : "inativo"}>PEDIDOS</a>
        { habilitarFuncoesGerenciais ? (
        <>
            <a href="/calendario" className={url == '/calendario' ? "ativo" : "inativo"}>CALENDÁRIO</a>
            <a href="/dashboard" className={url == '/dashboard' ? "ativo" : "inativo"}>DASHBOARD</a>
        </>
        ) : (<></>) }
    </div>
    )
}

export { BotoesFuncionalidades }