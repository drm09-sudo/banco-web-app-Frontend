import Login from './components/Login';
import Register from './components/Register';
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { logout } from './services/authService';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mostrarLogin, setMostrarLogin] = useState(true);

  const handleLogout = () => {
    logout();
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        mostrarLogin ? ( //evaluo que pantalla mostrar si no hay token
          <div className='d-flex flex-column align-items-center'>
            <Login 
            onLoginSuccess={() => setToken(localStorage.getItem('token'))} 
            onIrARegistro={() => setMostrarLogin(false)}/>
          </div>
        ) : (
          <div className='d-flex flex-column align-items-center'>
            <Register 
            onIrALogin = {() => setMostrarLogin(true)}/>
          </div>
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  )

}

export default App;
