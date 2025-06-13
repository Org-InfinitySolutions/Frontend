import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.CARGO !== 'ROLE_ADMIN') {
      navigate('/');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawCharts);
    };
    document.body.appendChild(script);

    function drawCharts() {
      const lineData = window.google.visualization.arrayToDataTable([
        ['Mês', 'Pedidos'],
        ['JANEIRO', 10],
        ['FEVEREIRO', 12],
        ['MARÇO', 18],
        ['ABRIL', 15],
        ['MAIO', 25],
        ['JUNHO', 30],
      ]);
      const lineOptions = {
        legend: { position: 'none' },
        colors: ['#0000ff'],
        hAxis: { textStyle: { fontSize: 12 } },
        vAxis: { minValue: 0, gridlines: { count: 6 } },
        chartArea: { width: '80%', height: '70%' },
      };
      const lineChart = new window.google.visualization.LineChart(document.getElementById('line_chart'));
      lineChart.draw(lineData, lineOptions);

      const pieData = window.google.visualization.arrayToDataTable([
        ['Equipamento', 'Procuras'],
        ['Notebook', 43],
        ['Projetor', 43],
        ['Servidor', 11],
        ['Lente', 7],
      ]);
      const pieOptions = {
        legend: { position: 'right', textStyle: { fontSize: 14 } },
        pieSliceText: 'label',
        chartArea: { width: '90%', height: '80%' },
        slices: {
          0: { color: '#bdbdbd' },
          1: { color: '#e0e0e0' },
          2: { color: '#9e9e9e' },
          3: { color: '#757575' },
        },
      };
      const pieChart = new window.google.visualization.PieChart(document.getElementById('pie_chart'));
      pieChart.draw(pieData, pieOptions);
    }
  }, [navigate]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex gap-4 mb-8">
        <button className={`border px-8 py-2 rounded font-bold transition-colors duration-200 ${location.pathname === '/equipamentos' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/equipamentos')}>EQUIPAMENTOS</button>
        <button className={`border px-8 py-2 rounded font-bold transition-colors duration-200 ${location.pathname === '/pedidos' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/pedidos')}>PEDIDOS</button>
        <button
          className={`border px-8 py-2 rounded font-bold transition-colors duration-200 ${location.pathname === '/calendario' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/calendario')}>CALENDÁRIO</button>
        <button className={`border px-8 py-2 rounded font-bold transition-colors duration-200 ${location.pathname === '/usuarios' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/usuarios')}>USUÁRIOS</button>
        <button className={`border px-8 py-2 rounded font-bold transition-colors duration-200 ${location.pathname === '/dashboard' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/dashboard')}>DASHBOARD</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border-[2px] border-black rounded-2xl p-6 flex flex-col gap-2 bg-white">
          <span className="text-xs font-semibold">CATEGORIA MAIS PROCURADA <br />(últimos 6 meses)</span>
          <div className="flex gap-4">
            <span className="text-green-700 text-sm">Projeção <span className="text-xs">(89.1%)</span> <span>▲</span></span>
            <span className="text-red-700 text-sm">Informática <span className="text-xs">(11.9%)</span> <span>▼</span></span>
          </div>
        </div>
        <div className="border-[2px] border-black rounded-2xl p-6 flex flex-col gap-2 bg-white">
          <span className="text-xs font-semibold">TIPO MAIS PROCURADO <br />(últimos 6 meses)</span>
          <div className="flex gap-4">
            <span className="text-green-700 text-sm">INDOOR <span className="text-xs">(89.1%)</span> <span>▲</span></span>
            <span className="text-red-700 text-sm">OUTDOOR <span className="text-xs">(11.9%)</span> <span>▼</span></span>
          </div>
        </div>
        <div className="border-[2px] border-black rounded-2xl p-6 flex flex-col gap-2 items-center justify-center bg-white">
          <span className="text-xs font-semibold text-center">TEMPO MÉDIO PARA SITUAÇÃO SAIR DE "EM ANÁLISE" PARA "APROVADO"</span>
          <span className="text-2xl font-bold">2,7 dias</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-[2px] border-black rounded-2xl p-6 bg-white">
          <span className="text-xs font-semibold">MESES COM MAIS PEDIDOS (Últimos 6 meses)</span>
          <div id="line_chart" className="w-full h-64" />
        </div>
        <div className="border-[2px] border-black rounded-2xl p-6 flex flex-col items-center bg-white">
          <span className="text-xs font-semibold mb-2">EQUIPAMENTOS MAIS PROCURADOS (Últimos 6 meses)</span>
          <div id="pie_chart" className="w-full h-64" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
