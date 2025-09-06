import React, { useEffect, useRef } from 'react';
import { api } from '../../provider/apiInstance';

const GraficoLinha = () => {
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
        response = await api.get('dashboard/grafico/pedidos-por-mes', { headers });
      } catch (e) {
        response = { data: [] };
      }
      const meses = [
        'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
        'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
      ];
      const dataArr = [['Mês', 'Pedidos']];
      response.data.forEach(item => {
        const [ano, mes] = item.mes.split('-');
        dataArr.push([meses[parseInt(mes, 10) - 1], item.quantidadePedidos]);
      });
      const data = window.google.visualization.arrayToDataTable(dataArr);
      const options = {
        legend: { position: 'none' },
        colors: ['#0000ff'],
        hAxis: { textStyle: { fontSize: 14, fontFamily: 'inherit' } },
        vAxis: { minValue: 0, gridlines: { count: 6 }, textStyle: { fontSize: 14, fontFamily: 'inherit' } },
        chartArea: { width: '90%', height: '70%' },
        fontName: 'inherit',
      };
      new window.google.visualization.LineChart(chartRef.current).draw(data, options);
    }

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
  <div className="border-solid border-black rounded-lg p-4 bg-white min-h-[350px] flex flex-col shadow">
      <span className="text-xs font-bold mb-2">MESES COM MAIS PEDIDOS (Últimos 6 meses)</span>
  <div ref={chartRef} className="w-full h-64 bg-white" style={{boxSizing: 'border-box'}} />
    </div>
  );
};

export default GraficoLinha;
