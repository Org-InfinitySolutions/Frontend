import { IoCartSharp } from "react-icons/io5";
import './CardProdutoEquipamentos.css'
import { RiPencilFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../routers/routers";
import { retornarCargos, isAdmin, isFuncionario } from "../../utils/usuario";
import { ModalQuantidade } from "../ModalQuantidade/ModalQuantidade";

export function CardProdutoEquipamentos({ 
    produto,
    adicionarNoCarrinho,
    abrirModal
}){

    const navegar = useNavigate();
    const [cargo, setCargo] = useState(retornarCargos(sessionStorage.CARGO));
    const [mostrarModalQuantidade, setMostrarModalQuantidade] = useState(false);

    const handleAdicionarComQuantidade = (quantidade) => {
        adicionarNoCarrinho(quantidade);
        setMostrarModalQuantidade(false);
    };

    return(
        <section className="card-produto">
            <img src={produto.imagem} alt={produto.nome} />
            <div className="info-produto">
                <div className="box-nome-produto">
                    <a className='nomeProduto' onClick={() => navegar(ROUTERS.PRODUTOID.replace(':id', produto.id))} style={{ cursor: 'pointer' }} title={produto.nome}>{produto.nome}</a>
                </div>
                {isAdmin(cargo) || isFuncionario(cargo) ? (
                    <div className="box-dados-gerenciais">
                        <span className="qtd-estoque">Estoque: {produto.qtd_estoque}</span>
                        <span className={ produto.is_ativo ? "situacao-ativo" : "situacao-inativo"}>{ produto.is_ativo ? "ATIVO" : "INATIVO" }</span>
                        <button className="btn-editar" onClick={() => navegar(ROUTERS.GERENCIAREQUIPAMENTOID.replace(':id', produto.id))}><RiPencilFill size={20}/></button>
                    </div>
                ) : (
                    <>
                        <div className="botoes-card">
                            <button className="botao-adicionar" onClick={abrirModal}><BsThreeDots /></button>
                            <button className="botao-carrinho" onClick={() => setMostrarModalQuantidade(true)}>
                                <FaPlus />
                            </button>
                        </div>
                        {mostrarModalQuantidade && (
                            <ModalQuantidade 
                                produto={produto} 
                                onConfirm={handleAdicionarComQuantidade}
                                onClose={() => setMostrarModalQuantidade(false)}
                            />
                        )}
                    </>
                ) }
            </div>
        </section>
    )
}
