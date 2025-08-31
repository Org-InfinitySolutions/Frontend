import { BarraNavegacao } from './components/BarraNavegacao'
import { Rodape } from './components/Rodape'

// Dependências do Router
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ROUTERS } from './routers/routers';

// Importando página
import { Login } from './Pages/Login'
import { Cadastro } from './Pages/Cadastro/Cadastro'
import { Perfil } from './Pages/Perfil'
import { Pedidos } from './Pages/Pedidos';
import { Equipamentos } from './Pages/Equipamentos';
import { Produto } from './Pages/Produto';
import { EditarPerfil } from './Pages/EditarPerfil';
import { Carrinho } from './Pages/Carrinho';
import { DefinirEndereco } from './Pages/DefinirEndereco';
import { FinalizarPedido } from './Pages/FinalizarPedido';
import { Home } from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { PedidosAdm } from './Pages/PedidosAdm' 
import { DetalharPedidos } from './Pages/DetalharPedidos';
import { AdicionarEquipamento } from './Pages/AdicionarEquipamento';
import { Calendario } from './Pages/Calendario';
import { EditarEquipamento } from './Pages/EditarEquipamento';
import {RecuperarSenha} from './Pages/RecuperarSenha';

import './App.css'

function App(){

  return(
    <Router>
      <MainComponent />
    </Router>
  )
}

function MainComponent() {

  const localizacao = useLocation().pathname;

  return (
    <>      
      <BarraNavegacao key={localizacao}/>
      <Routes>
        <Route path={ROUTERS.HOME} element={<Home/>} />
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.CADASTRO} element={<Cadastro />} />
        <Route path={ROUTERS.PERFIL} element={<Perfil />} />
        <Route path={ROUTERS.EDITARPERFIL} element={<EditarPerfil />} />
        <Route path={ROUTERS.CARRINHO} element={<Carrinho />} />
        <Route path={ROUTERS.CARRINHOENDERECO} element={<DefinirEndereco />} />
        <Route path={ROUTERS.CARRINHOFINALIZAR} element={<FinalizarPedido />} />
        <Route path={ROUTERS.PEDIDOS} element={<Pedidos />} />
        <Route path={ROUTERS.EQUIPAMENTOS} element={<Equipamentos />} />
        <Route path={ROUTERS.PRODUTO} element={<Produto />} />
        <Route path={ROUTERS.PRODUTOID} element={<Produto />} />
        <Route path={ROUTERS.PEDIDOSADM} element={<PedidosAdm />}/>
        <Route path={ROUTERS.DETALHARPEDIDOS} element={<DetalharPedidos />}/>
        <Route path={ROUTERS.ADICIONAREQUIPAMENTO} element={<AdicionarEquipamento />}/>
        <Route path={ROUTERS.CALENDARIO} element={<Calendario />}/>
        <Route path={ROUTERS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTERS.EDITAREQUIPAMENTOID} element={<EditarEquipamento/>}></Route>
        <Route path={ROUTERS.RECUPERARSENHA} element={<RecuperarSenha/>}></Route>
      </Routes>
      <Rodape/>
    </>
  )
}
export default App
