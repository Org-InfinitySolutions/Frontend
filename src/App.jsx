import { BarraNavegacao } from './components/BarraNavegacao'
import { Rodape } from './components/Rodape'
import './App.css'

// Dependências do Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando página
import { Login } from './Pages/Login'
import { Cadastro } from './Pages/Cadastro'


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
          </Routes>
        </Router>
      <Rodape />
    </>
  )
}

export default App
