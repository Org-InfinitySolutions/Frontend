import React from 'react';
import './ModalEquipamento.css';

const ModalEquipamento = ({ produto, onClose }) => {
  if (!produto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="fechar-modal" onClick={onClose}>X</button>
        <div className="modal-conteudo">
          <img src={produto.imagem} alt={produto.nome} className="modal-imagem" />
          <div className="modal-info">
            <h2>{produto.nome}</h2>
            <strong>{produto.marca}</strong>
            <p>{produto.descricao}</p>
            <small>
              Para mais informações do equipamento. Consulte o{' '}
              <a href={produto.linkFabricante} target="_blank" rel="noreferrer">fabricante</a>.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEquipamento;