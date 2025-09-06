import React, { useEffect, useState } from 'react';
import { api } from '../../provider/apiInstance';

const MetricasKpis = () => {
  const [categoria, setCategoria] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [tempoMedio, setTempoMedio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.TOKEN;
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      api.get('dashboard/kpi/categoria-popular', { headers }),
      api.get('dashboard/kpi/tipo-evento-popular', { headers }),
      api.get('dashboard/kpi/tempo-medio-atendimento', { headers })
    ]).then(([catRes, tipoRes, tempoRes]) => {
      setCategoria(catRes.data);
      setTipo(tipoRes.data);
      setTempoMedio(tempoRes.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="grid grid-cols-3 gap-4 mb-8">Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="border-solid border-black rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-white min-h-[90px] shadow">
        <span className="text-xs font-bold leading-tight">CATEGORIA MAIS PROCURADA <br />(últimos 6 meses)</span>
        <div className="flex gap-4 mt-2">
          <span className="text-green-700 text-base font-semibold">{categoria?.nome || '-'} <span className="text-xs font-normal">({categoria?.percentual ? categoria.percentual.toFixed(1) : '-'}%)</span></span>
        </div>
      </div>
  <div className="border-solid border-black rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-white min-h-[90px] shadow">
        <span className="text-xs font-bold leading-tight">TIPO MAIS PROCURADO <br />(últimos 6 meses)</span>
        <div className="flex gap-4 mt-2">
          <span className="text-green-700 text-base font-semibold">{tipo?.nome || '-'} <span className="text-xs font-normal">({tipo?.percentual ? tipo.percentual.toFixed(1) : '-'}%)</span></span>
        </div>
      </div>
  <div className="border-solid border-black rounded-lg p-4 flex flex-col items-center justify-center bg-white min-h-[90px] shadow">
        <span className="text-xs font-bold text-center leading-tight">TEMPO MÉDIO PARA SITUAÇÃO SAIR DE "EM ANÁLISE" PARA "APROVADO"</span>
        <span className="text-2xl font-extrabold mt-2">{tempoMedio?.tempoMedioDias ? tempoMedio.tempoMedioDias.toFixed(1) : '-'} dias</span>
      </div>
    </div>
  );
};

export default MetricasKpis;
