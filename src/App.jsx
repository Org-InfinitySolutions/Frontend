import { BarraNavegacao } from './components/BarraNavegacao'
import { Rodape } from './components/Rodape'
import './App.css'
import './App.jsx'


// Dependências do Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando página
import { Login } from './Pages/Login'
import { Perfil } from './Pages/Perfil'
import { EditarPerfil } from './Pages/EditarPerfil'
import { Pedidos } from './Pages/Pedidos'
import { Index } from './Pages/Index'

function App() {

  return (
    <>      
      <BarraNavegacao />
        {/* Adicionei esse router para conseguir visualizar a pagina */}
        <Router>
          <Routes>
            {/* Caso precise faça o mesmo, copie o codigo abaixo e defina a rota desejada */}
            <Route path='/login' element={<Login />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/editar-perfil' element={<EditarPerfil />} />
            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='/index' element={<Index />} />
          </Routes>
        </Router>
      <Rodape />
    </>
  )
}

export default App
