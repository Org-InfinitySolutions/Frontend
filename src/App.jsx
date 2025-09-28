import { BarraNavegacao } from './components/BarraNavegacao/BarraNavegacao'
import { Rodape } from './components/Rodape/Rodape'

// Dependências do Router
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ROUTERS } from './routers/routers';

// Importando página
import { Login } from './Pages/Login/Login'
import { Cadastro } from './Pages/Cadastro/Cadastro'
import { Perfil } from './Pages/Perfil/Perfil'
import { Pedidos } from './Pages/Pedidos/Pedidos';
import { Equipamentos } from './Pages/Equipamentos/Equipamentos';
import { Produto } from './Pages/Produto/Produto';
import { EditarPerfil } from './Pages/EditarPerfil/EditarPerfil';
import { Carrinho } from './Pages/Carrinho/Carrinho';
import { DefinirEndereco } from './Pages/DefinirEndereco/DefinirEndereco';
import { FinalizarPedido } from './Pages/FinalizarPedido/FinalizarPedido';
import { Home } from './Pages/Home/Home';
import  Dashboard  from './Pages/Dashboard/Dashboard';
import { DetalharPedidos } from './Pages/DetalharPedidos/DetalharPedidos';
import { Calendario } from './Pages/Calendario/Calendario';
import { GerenciarEquipamento } from './Pages/GerenciarEquipamento/GerenciarEquipamento';
import {RecuperarSenha} from './Pages/RecuperarSenha/RecuperarSenha';
import {GerenciarUsuarios} from './Pages/GerenciamentoUsuarios/GerenciarUsuarios';


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
        <Route path={ROUTERS.DETALHARPEDIDOS} element={<DetalharPedidos />}/>
        <Route path={ROUTERS.CALENDARIO} element={<Calendario />}/>
        <Route path={ROUTERS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTERS.GERENCIAREQUIPAMENTOID} element={<GerenciarEquipamento/>}></Route>
        <Route path={ROUTERS.RECUPERARSENHA} element={<RecuperarSenha/>}></Route>
        <Route path={ROUTERS.GERENCIARUSUARIOS} element={<GerenciarUsuarios/>}></Route>
      </Routes>
      <Rodape/>
    </>
  )
}
export default App
