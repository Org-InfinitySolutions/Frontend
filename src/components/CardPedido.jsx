import React, { useState } from 'react';
import './CardPedido.css';

const statusLabel = {
  'EM ANÁLISE': 'Em análise',
  'EM EVENTO': 'Em evento',
  'FINALIZADO': 'Finalizado',
  'CANCELADO': 'Cancelado',
};

export function CardPedido({ pedido, tipoUsuario, onDetalhes }) {
  const [status, setStatus] = useState(pedido.status);

  const podeCancelar = () => {
    if (tipoUsuario === 'ROLE_ADMIN') {
      return status === 'EM EVENTO' || status === 'FINALIZADO';
    } else {
      return status === 'EM ANÁLISE';
    }
  };

  const cancelarPedido = () => {
    setStatus('CANCELADO');
  };

  const statusClass = {
    'EM ANÁLISE': 'status-btn status-cinza',
    'EM EVENTO': 'status-btn status-azul',
    'FINALIZADO': 'status-btn status-verde',
    'CANCELADO': 'status-btn status-vermelho',
  }[status] || 'status-btn status-cinza';

  return (
    <section className="card-pedido">
      <h3>Pedido {pedido.id}</h3>
      <p><b>Items:</b> {pedido.itens}</p>
      <p><b>Data:</b> {pedido.data}</p>
      <p><b>Nome:</b> {pedido.cliente}</p>
      <div className="acoes">
        {podeCancelar() && status !== 'CANCELADO' && (
          <button className="btn-cancelar" onClick={cancelarPedido}>Cancelar</button>
        )}
        <div className="acoes-direita">
          <span className={statusClass} disabled>{statusLabel[status] || status}</span>
          <button className="btn-detalhes" onClick={() => onDetalhes(pedido)}>Detalhes</button>
        </div>
      </div>
    </section>
  );
}
