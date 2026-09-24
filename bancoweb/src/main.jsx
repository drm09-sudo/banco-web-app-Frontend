import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
//Importo la libreria de bootstrap globalmente
import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
