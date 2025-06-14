import React, { useState } from 'react';
import './CardPedido.css';
import { api } from '../provider/apiInstance';

const statusLabel = {
  'EM ANÁLISE': 'Em Análise',
  'EM_ANALISE': 'Em Análise',
  'EM EVENTO': 'Em Evento',
  'EM_EVENTO': 'Em Evento',
  'FINALIZADO': 'Finalizado',
  'CANCELADO': 'Cancelado',
  'APROVADO': 'Aprovado',
};

const normalizarStatus = (status) => {
  if (!status) return '';
  return status
    .normalize('NFD')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .toUpperCase();
};

const exibirStatus = (status) => {
  if (statusLabel[status]) return statusLabel[status];
  const normalizado = normalizarStatus(status);
  if (statusLabel[normalizado]) return statusLabel[normalizado];
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
};

export function CardPedido({ pedido, tipoUsuario, onDetalhes }) {
  const [status, setStatus] = useState(pedido.status);
  const [cancelando, setCancelando] = useState(false);

  const podeCancelar = () => {
    const statusNormalizado = normalizarStatus(status);
    if (tipoUsuario === 'ROLE_ADMIN' || tipoUsuario === 'ROLE_FUNCIONARIO') {
      return statusNormalizado === 'APROVADO' || statusNormalizado === 'EM_ANALISE';
    } else {
      return statusNormalizado === 'EM_ANALISE';
    }
  };

  const cancelarPedido = async () => {
    setCancelando(true);
    const token = sessionStorage.TOKEN;
    try {
      await api.put(`/pedidos/${pedido.id}/situacao`, { situacao: 'CANCELADO' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus('CANCELADO');
    } catch (e) {
      alert('Erro ao cancelar o pedido.');
    }
    setCancelando(false);
  };

  const statusClass = {
    'EM ANÁLISE': 'status-btn status-cinza',
    'EM_ANALISE': 'status-btn status-cinza',
    'EM EVENTO': 'status-btn status-azul',
    'EM_EVENTO': 'status-btn status-azul',
    'FINALIZADO': 'status-btn status-vermelho',
    'CANCELADO': 'status-btn status-vermelho',
    'APROVADO': 'status-btn status-verde',
  }[status] || 'status-btn status-cinza';

  return (
    <section className="card-pedido">
      <h3>Pedido {pedido.id}</h3>
      <p><b>Items:</b> {pedido.itens}</p>
      <p><b>Pedido feito em:</b> {pedido.data}</p>
      <p><b>Nome:</b> {pedido.cliente}</p>
      <div className="acoes">
        {podeCancelar() && status !== 'CANCELADO' && (
          <button className="btn-cancelar" onClick={cancelarPedido} disabled={cancelando}>
            {cancelando ? 'Cancelando...' : 'Cancelar'}
          </button>
        )}
        <div className="acoes-direita">
          <span className={statusClass} disabled>{exibirStatus(status)}</span>
          <button className="btn-detalhes" onClick={() => onDetalhes(pedido)}>Detalhes</button>
        </div>
      </div>
    </section>
  );
}
