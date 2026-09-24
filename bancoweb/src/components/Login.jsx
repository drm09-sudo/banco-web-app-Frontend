import React, { useState } from 'react';
import { login } from '../services/authService';
import logo from '../assets/LogoApp.png'

//Imports y el estado Local
export const Login =({onLoginSuccess, onIrARegistro})=> {
    //Variables de estado para los inputs de texto
    //setEmail, setPassword = funciones creadas por React
    /*Para actualizar el valor de la variable correspondiente */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //Estado para capturar y mostrar errores en pantalla
    const [error, setError] = useState('');


    //Manejo de eventos "HandleSubmit"
    const handleSubmit = async (e) => {
        e.preventDefault(); //Evito que la pagina se recargue por defecto al eviar el formulario
        setError(''); //para limpiar errores previos

        try {
            await login({ email, password });
            if(onLoginSuccess){
                onLoginSuccess();
            }
            //alert('Inicio de sesión exitoso, Token guardado en localStorage');
        } catch (err) {
            setError('Credenciales invalidas o problema de conexion');
        }
    };

    //Renderizado de la interfaz
    return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      <div 
        className="card border-0 shadow-sm p-4 w-100" 
        style={{ maxWidth: '420px', borderRadius: '10px' }}
      >
        <div className="align-center mb-4">
        <img src={logo} alt="logoApp"  />
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold py-2" >
            Iniciar Sesión
          </button>
        </form>

        <hr className="my-4 text-muted opacity-25" />

        <div className="text-center">
          <span className="small text-muted me-1" >¿No tienes una cuenta?</span>
          <button 
            type="button" 
            className="btn btn-link p-0 small fw-light text-decoration-none"
            onClick={onIrARegistro}
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;