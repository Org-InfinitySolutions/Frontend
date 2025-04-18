import { BarraNavegacao } from './components/BarraNavegacao'
import { Rodape } from './components/Rodape'

// Dependências do Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando página
import { Login } from './Pages/Login'
import { Cadastro } from './Pages/Cadastro'
import { Perfil } from './Pages/Perfil'
import { Pedidos } from './Pages/Pedidos';
import { EditarPerfil } from './Pages/EditarPerfil';
import { Carrinho } from './Pages/Carrinho';
import { DefinirEndereco } from './Pages/DefinirEndereco';
import { FinalizarPedido } from './Pages/FinalizarPedido';

function App() {

  return (
    <>      
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
          </Routes>
        </Router>
      <Rodape />
    </>
  )
}

export default App
