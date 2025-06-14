import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MetricasKpis from '../components/Dashboard/MetricasKpis';
import GraficoLinha from '../components/Dashboard/GraficoLinha';
import GraficoPizza from '../components/Dashboard/GraficoPizza';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (sessionStorage.CARGO !== 'ROLE_ADMIN') {
      navigate('/');
      return;
    }
  }, [navigate]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex gap-6 mb-8 justify-center">
        <button className={`border-2 border-black px-10 py-3 rounded font-bold text-lg transition-colors duration-200 ${location.pathname === '/equipamentos' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/equipamentos')}>ESTOQUE</button>
        <button className={`border-2 border-black px-10 py-3 rounded font-bold text-lg transition-colors duration-200 ${location.pathname === '/pedidos' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/pedidos')}>PEDIDOS</button>
        <button
          className={`border-2 border-black px-10 py-3 rounded font-bold text-lg transition-colors duration-200 ${location.pathname === '/calendario' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/calendario')}>CALENDÁRIO</button>
        <button className={`border-2 border-black px-10 py-3 rounded font-bold text-lg transition-colors duration-200 ${location.pathname === '/dashboard' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          onClick={() => navigate('/dashboard')}>DASHBOARD</button>
      </div>
      <MetricasKpis />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraficoLinha />
        <GraficoPizza />
      </div>
    </div>
  );
};

export default Dashboard;
