import React, { useState } from 'react';
import './ModalQuantidade.css';
import { FaPlus, FaMinus, FaCheck } from 'react-icons/fa';

export function ModalQuantidade({ produto, onConfirm, onClose }) {
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQuantidade = () => {
    if (quantidade < 999) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleInputChange = (e) => {
    let valor = parseInt(e.target.value) || 1;
    if (valor > 999) {
      valor = 999;
    }
    if (valor > 0) {
      setQuantidade(valor);
    }
  };

  const handleConfirm = () => {
    onConfirm(quantidade);
    onClose();
  };

  return (
    <div className="overlay-modal-quantidade" onClick={onClose}>
      <div className="modal-quantidade" onClick={(e) => e.stopPropagation()}>
        <div className="header-modal-quantidade">
          <h3>{produto.nome}</h3>
          <button className="btn-fechar" onClick={onClose}>×</button>
        </div>

        <div className="conteudo-modal-quantidade">
          <div className="controle-quantidade">
            <button className="btn-quantidade btn-diminuir" onClick={diminuirQuantidade}>
              <FaMinus />
            </button>

            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={handleInputChange}
              className="input-quantidade"
            />

            <button className="btn-quantidade btn-aumentar" onClick={aumentarQuantidade}>
              <FaPlus />
            </button>
          </div>

          <button className="btn-confirmar" onClick={handleConfirm}>
            <FaCheck /> Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
