import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from './pages/Login.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <App />
    {/* <Login/> */}
    </ThemeProvider>
  </React.StrictMode>,
)
