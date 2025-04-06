import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Dependências do Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando página de Login
import { Login } from './Pages/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
