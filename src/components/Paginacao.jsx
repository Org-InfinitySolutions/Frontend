import React from 'react';
import './Paginacao.css';

const Paginacao = ({ paginaAtual, totalPaginas, onChange }) => {
  if (totalPaginas <= 1) return null;

  const paginas = [];
  paginas.push(1);

  for (let i = paginaAtual - 2; i <= paginaAtual + 2; i++) {
    if (i > 1 && i < totalPaginas) {
      paginas.push(i);
    }
  }

  if (totalPaginas > 1) paginas.push(totalPaginas);

  const paginasUnicas = [...new Set(paginas)].sort((a, b) => a - b);

  const paginasComElipses = [];
  for (let i = 0; i < paginasUnicas.length; i++) {
    if (i > 0 && paginasUnicas[i] - paginasUnicas[i - 1] > 1) {
      paginasComElipses.push('...');
    }
    paginasComElipses.push(paginasUnicas[i]);
  }

  return (
    <div className="paginacao">
      <span
        onClick={() => onChange(Math.max(1, paginaAtual - 1))}
        style={{ cursor: paginaAtual > 1 ? 'pointer' : 'default', opacity: paginaAtual > 1 ? 1 : 0.5 }}
      >{'<'}</span>
      {paginasComElipses.map((p, idx) =>
        p === '...'
          ? <span key={"elipse-" + idx} className="paginacao-elipse">...</span>
          : <span
            key={p}
            className={p === paginaAtual ? 'pagina-ativa' : ''}
            style={{ cursor: p !== paginaAtual ? 'pointer' : 'default' }}
            onClick={() => typeof p === 'number' && p !== paginaAtual && onChange(p)}
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
