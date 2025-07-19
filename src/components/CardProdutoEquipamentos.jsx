import { IoCartSharp } from "react-icons/io5";
import './CardProdutoEquipamentos.css'
import { RiPencilFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../routers/routers";

export function CardProdutoEquipamentos({ 
    produto,
    adicionarNoCarrinho,
    abrirModal
}){

    const navegar = useNavigate();
    const [cargo, setCargo] = useState(sessionStorage.CARGO);

    return(
        <section className="card-produto">
            <img src={produto.imagem} alt={produto.nome} />
            <div className="info-produto">
                <div className="box-nome-produto">
                    <a className='nomeProduto' onClick={() => navegar(ROUTERS.PRODUTOID.replace(':id', produto.id))} style={{ cursor: 'pointer' }} title={produto.nome}>{produto.nome}</a>
                </div>
                { cargo == "ROLE_ADMIN" || cargo == "ROLE_FUNCIONARIO" ? (
                    <div className="box-dados-gerenciais">
                        <span className="qtd-estoque">Estoque: {produto.qtd_estoque}</span>
                        <span className={ produto.is_ativo ? "situacao-ativo" : "situacao-inativo"}>{ produto.is_ativo ? "ATIVO" : "INATIVO" }</span>
                        <button className="btn-editar" onClick={() => navegar(ROUTERS.EDITAREQUIPAMENTOID.replace(':id', produto.id))}><RiPencilFill size={20}/></button>
                    </div>
                ) : (
                    <div className="botoes-card">
                        <button className="botao-adicionar" onClick={abrirModal}><FaPlus /></button>
                        <button className="botao-carrinho" onClick={adicionarNoCarrinho}>
                            <IoCartSharp className="icone-carrinho-miniatura" size={24} />
                        </button>
                    </div>
                ) }
            </div>
        </section>
    )
}
