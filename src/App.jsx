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
import { Index } from './Pages/Index';

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
<<<<<<< HEAD
      <BarraNavegacao />
        {/* Adicionei esse router para conseguir visualizar a pagina */}
        <Router>
          <Routes>
            {/* Caso precise faça o mesmo, copie o codigo abaixo e defina a rota desejada */}
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
          </Routes>
        </Router>
=======
      <BarraNavegacao key={location.pathname}/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Cadastro />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/editar-perfil' element={<EditarPerfil />} />
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/carrinho/endereco' element={<DefinirEndereco />} />
          <Route path='/carrinho/finalizar' element={<FinalizarPedido />} />
          <Route path='/pedidos' element={<Pedidos />} />
        </Routes>
>>>>>>> c687d066e020cf14161d706c8e3f6af5714445f0
      <Rodape />
    </>
  )
}

export default App
