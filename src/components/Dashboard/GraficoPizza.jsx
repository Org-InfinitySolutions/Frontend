import React, { useEffect, useRef } from 'react';
import { api } from '../../provider/apiInstance';

const GraficoPizza = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const token = sessionStorage.TOKEN;
    const headers = { Authorization: `Bearer ${token}` };
    let script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = async () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawChart);
    };
    document.body.appendChild(script);

    async function drawChart() {
      let response;
      try {
        response = await api.get('/dashboard/grafico/equipamentos-populares', { headers });
      } catch (e) {
        response = { data: [] };
      }
      const dataArr = [['Equipamento', 'Procuras']];
      response.data.forEach(item => {
        dataArr.push([item.nomeEquipamento, item.quantidadeSolicitacoes]);
      });
      const data = window.google.visualization.arrayToDataTable(dataArr);
      const options = {
        legend: { position: 'right', textStyle: { fontSize: 14, fontFamily: 'inherit' } },
        pieSliceText: 'none',
        chartArea: { width: '90%', height: '80%' },
        fontName: 'inherit',
      };
      new window.google.visualization.PieChart(chartRef.current).draw(data, options);
    }

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="border-2 border-black rounded-lg p-6 flex flex-col items-center bg-white min-h-[350px]">
      <span className="text-xs font-bold mb-2">EQUIPAMENTOS MAIS PROCURADOS (Últimos 6 meses)</span>
      <div ref={chartRef} className="w-full h-64" />
    </div>
  );
};

export default GraficoPizza;
