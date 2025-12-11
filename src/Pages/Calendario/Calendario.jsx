import { useState, useEffect } from "react";
import './Calendario.css';
import { api } from "../../provider/apiInstance";
import { ROUTERS } from "../../routers/routers";
import { ENDPOINTS } from "../../routers/endpoints";
import { bloquearAcessoGerencia } from "../../utils/token";
import { exibirAvisoAcessoNegado } from "../../utils/exibirModalAviso";
import { useNavigate } from "react-router-dom";

function gerarDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();

  const dias = [];

  for (let i = 0; i < diaSemanaInicio; i++) {
    dias.push(null);
  }

  for (let i = 1; i <= diasNoMes; i++) {
    dias.push(new Date(ano, mes, i));
  }

  while (dias.length % 7 !== 0) {
    dias.push(null);
  }

  return dias;
}

const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const nomesDias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export function Calendario() {
  const ano = 2025;
  const [mesAtual, setMesAtual] = useState(new Date().getFullYear() === ano ? new Date().getMonth() : 0);
  const [pedidos, setPedidos] = useState({});
  const dias = gerarDiasDoMes(ano, mesAtual);

  const hoje = new Date();
  const hojeLimpo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  const navegar = useNavigate();
  useEffect(() => {
      api.get(ENDPOINTS.PEDIDOS)
      .then(response => {
        const pedidosRecebidos = response.data;
        console.log(pedidosRecebidos.content)
        const pedidosFiltrados = pedidosRecebidos.content.filter(pedido =>
          pedido.situacao === 'APROVADO' || pedido.situacao === 'EM_EVENTO'
        );
        pedidosFiltrados.sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));
        const mapeados = {};
        pedidosFiltrados.forEach(pedido => {
          const data = new Date(pedido.dataEntrega);
          const dataFormatada = data.toLocaleDateString('fr-CA');
          if (!mapeados[dataFormatada]) mapeados[dataFormatada] = [];
          mapeados[dataFormatada].push(`Pedido #${pedido.id}`);
        });
        setPedidos(mapeados);
      })
      .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
      });
    }
  , []);

  const anterior = () => {
    if (mesAtual > 0) setMesAtual(mesAtual - 1);
  };

  const proximo = () => {
    if (mesAtual < 11) setMesAtual(mesAtual + 1);
  };

  return (
    <div className="calendario-container"> <h2 className="calendario-titulo"> <span className="calendario-mes">{nomesMeses[mesAtual]}</span> <span className="calendario-ano">{ano}</span> </h2> <div className="calendario-grid"> {nomesDias.map((dia) => ( <div key={dia} className="calendario-dia-nome">{dia}</div> ))} {dias.map((data, index) => { const chave = data ? data.toLocaleDateString('fr-CA') : ""; const pedidosDoDia = pedidos[chave]; const isHoje = data && data.toDateString() === hoje.toDateString(); const isPassado = data && data < hojeLimpo; return ( <div key={index} className={`calendario-dia ${isHoje ? "calendario-dia-hoje" : ""} ${isPassado ? "calendario-dia-passado" : ""}`} > {data && ( <> <div className="calendario-dia-numero">{data.getDate()}</div> {pedidosDoDia && pedidosDoDia.map((pedidoTexto, idx) => ( <a key={idx} href={`${ROUTERS.DETALHARPEDIDOS}?id=${pedidoTexto.substr(pedidoTexto.indexOf('#') + 1)}`} className="calendario-pedido" title={pedidoTexto} > {pedidoTexto} </a> ))} </> )} </div> ); })} </div>

      <div className="paginacao"> <span onClick={anterior} className={`paginacao-seta ${mesAtual === 0 ? "disabled" : ""}`}>&laquo;</span> {Array.from({ length: 12 }, (_, index) => ( <span key={index} onClick={() => setMesAtual(index)} className={`paginacao-mes ${mesAtual === index ? "pagina-ativa" : ""}`} > {index + 1} </span> ))} <span onClick={proximo} className={`paginacao-seta ${mesAtual === 11 ? "disabled" : ""}`}>&raquo;</span> </div>
    </div>
  );
}