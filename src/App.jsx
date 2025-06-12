import { BarraNavegacao } from './components/BarraNavegacao'
import { Rodape } from './components/Rodape'


// Dependências do Router
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importando página
import { Login } from './Pages/Login'
import { Cadastro } from './Pages/Cadastro'
import { Perfil } from './Pages/Perfil'
import { Pedidos } from './Pages/Pedidos';
import { Equipamentos } from './Pages/Equipamentos';
import { Produto } from './Pages/Produto';
import { EditarPerfil } from './Pages/EditarPerfil';
import { Carrinho } from './Pages/Carrinho';
import { DefinirEndereco } from './Pages/DefinirEndereco';
import { FinalizarPedido } from './Pages/FinalizarPedido';
import { Home } from './Pages/Home';

import { PedidosAdm } from './Pages/PedidosAdm' 
import { DetalharPedidosAdm } from './Pages/DetalharPedidosAdm';
import { AdicionarEquipamento } from './Pages/AdicionarEquipamento';
import { Calendario } from './Pages/Calendario';
import { EditarEquipamento } from './Pages/EditarEquipamento';

import './App.css'

function App(){

  return(
    <Router>
      <MainComponent />
    </Router>
  )
}

function MainComponent() {

  const location = useLocation();
  return (
    <>      
      <BarraNavegacao key={location.pathname}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/editar-perfil' element={<EditarPerfil />} />
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/carrinho/endereco' element={<DefinirEndereco />} />
          <Route path='/carrinho/finalizar' element={<FinalizarPedido />} />
          <Route path='/pedidos' element={<Pedidos />} />
          <Route path='/equipamentos' element={<Equipamentos />} />
          <Route path='/produto' element={<Produto />} />
          <Route path='/produto/:id' element={<Produto />} />
          <Route path='/pedidos-adm' element={<PedidosAdm />}/>
          <Route path='/detalhar-pedidos-adm' element={<DetalharPedidosAdm />}/>
          <Route path='/adicionar-equipamento' element={<AdicionarEquipamento />}/>
          <Route path='/calendario' element={<Calendario />}/>
          <Route path='/editar-equipamento/:id' element={<EditarEquipamento/>}></Route>
        </Routes>
      <Rodape />
    </>
  )
}
export default App
