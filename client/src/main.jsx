import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './constructor/styles/constructor.css'
import './constructor/styles/axis.css'
import './panels/panels.css'
import './navigation/navigation.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
