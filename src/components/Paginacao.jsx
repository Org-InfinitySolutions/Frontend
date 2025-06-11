import React from 'react';
import './Paginacao.css';

const Paginacao = ({ paginaAtual, totalPaginas, onChange }) => {
  if (totalPaginas <= 1) return null;
  const paginas = [];
  paginas.push(1);
  let left = paginaAtual - 1;
  let right = paginaAtual + 1;
  if (left > 2) paginas.push('...');
  for (let i = Math.max(2, left); i <= Math.min(right, totalPaginas - 1); i++) {
    paginas.push(i);
  }
  if (right < totalPaginas - 1) paginas.push('...');
  if (totalPaginas > 1) paginas.push(totalPaginas);
  return (
    <div className="paginacao">
      <span
        onClick={() => onChange(Math.max(1, paginaAtual - 1))}
        style={{ cursor: paginaAtual > 1 ? 'pointer' : 'default', opacity: paginaAtual > 1 ? 1 : 0.5 }}
      >{'<'}</span>
      {paginas.map((p, idx) =>
        p === '...'
          ? <span key={idx} className="paginacao-elipse">...</span>
          : <span
            key={p}
            className={p === paginaAtual ? 'pagina-ativa' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => typeof p === 'number' && onChange(p)}
          >{p}</span>
      )}
      <span
        onClick={() => onChange(Math.min(totalPaginas, paginaAtual + 1))}
        style={{ cursor: paginaAtual < totalPaginas ? 'pointer' : 'default', opacity: paginaAtual < totalPaginas ? 1 : 0.5 }}
      >{'>'}</span>
    </div>
  );
};

export default Paginacao;
