import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MetricasKpis from '../../components/Dashboard/MetricasKpis';
import GraficoLinha from '../../components/Dashboard/GraficoLinha';
import GraficoPizza from '../../components/Dashboard/GraficoPizza';
import { bloquearAcessoGerencia } from '../../utils/token';
import { exibirAvisoAcessoNegado } from '../../utils/exibirModalAviso';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(bloquearAcessoGerencia(true)){
      exibirAvisoAcessoNegado(navigate);
    }
  }, []);

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
