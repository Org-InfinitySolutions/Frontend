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
  <div className="pt-4 pb-6 pl-4 pr-4 bg-white min-h-screen">
      <MetricasKpis />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraficoLinha />
        <GraficoPizza />
      </div>
    </div>
  );
};

export default Dashboard;
