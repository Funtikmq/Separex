import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './pages/configurator/constructor/styles/constructor.css'
import './pages/configurator/constructor/styles/axis.css'
import './pages/configurator/panels/panels.css'
import './pages/configurator/navigation/navigation.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
