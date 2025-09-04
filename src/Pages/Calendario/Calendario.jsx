import { useState, useEffect } from "react";
import './Calendario.css';
import { api } from "../../provider/apiInstance";
import { ROUTERS } from "../../routers/routers";
import { ENDPOINTS } from "../../routers/endpoints";

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

  useEffect(() => {
    api.get(ENDPOINTS.PEDIDOS)
    .then(response => {
      const pedidosRecebidos = response.data;

      const pedidosFiltrados = pedidosRecebidos.filter(pedido =>
        pedido.situacao === 'APROVADO' || pedido.situacao === 'EM_EVENTO'
      );

      pedidosFiltrados.sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));

      const mapeados = {};
      pedidosFiltrados.forEach(pedido => {
        const data = new Date(pedido.dataEntrega);
        const dataFormatada = data.toLocaleDateString('fr-CA'); // Formato: YYYY-MM-DD

        if (!mapeados[dataFormatada]) {
          mapeados[dataFormatada] = [];
        }

        mapeados[dataFormatada].push(`Pedido #${pedido.id}`);
      });

      setPedidos(mapeados);
    })
    .catch(error => {
      console.error('Erro ao buscar pedidos:', error);
    });
  }, []);

  const anterior = () => {
    if (mesAtual > 0) setMesAtual(mesAtual - 1);
  };

  const proximo = () => {
    if (mesAtual < 11) setMesAtual(mesAtual + 1);
  };

  return (
    <div className="max-w-8xl mx-auto p-4 font-sans">
      <style>{`
        .hoje {
          background-color: #e0f2fe;
          border: 2px solid #2563eb;
        }
        .dia-passado {
          background-color: #f3f4f6;
          color: #9ca3af;
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>

      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        {nomesMeses[mesAtual]} de {ano}
      </h2>

      <div className="grid grid-cols-7 gap-px bg-gray-300 rounded overflow-hidden shadow mb-4">
        {nomesDias.map((dia) => (
          <div
            key={dia}
            className="bg-gray-100 text-gray-700 font-semibold text-sm text-center py-2"
          >
            {dia}
          </div>
        ))}

        {dias.map((data, index) => {
          const chave = data ? data.toLocaleDateString('fr-CA') : "";
          const pedidosDoDia = pedidos[chave];
          const isHoje = data && data.toDateString() === hoje.toDateString();
          const isPassado = data && data < hojeLimpo;

          return (
            <div
              key={index}
              className={`min-h-[80px] text-sm text-gray-800 p-2 border border-gray-200 
                ${isHoje ? "hoje" : ""} 
                ${isPassado ? "dia-passado" : ""} 
                bg-white`}
            >
              {data && (
                <>
                  <div className="font-semibold">{data.getDate()}</div>
                  {pedidosDoDia && pedidosDoDia.map((pedidoTexto, idx) => (
                    <a key={idx} href={`${ROUTERS.DETALHARPEDIDOS}?id=${pedidoTexto.substr(pedidoTexto.indexOf('#') + 1)}`} className="text-blue-600 text-xs mt-1">{pedidoTexto}</a>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="paginacao">
        <span onClick={anterior} className={mesAtual === 0 ? "disabled" : ""}>{'<'}</span>
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={mesAtual === index ? "pagina-ativa" : ""}
            onClick={() => setMesAtual(index)}
          >
            {index + 1}
          </span>
        ))}
        <span onClick={proximo} className={mesAtual === 11 ? "disabled" : ""}>{'>'}</span>
      </div>
    </div>
  );
}
