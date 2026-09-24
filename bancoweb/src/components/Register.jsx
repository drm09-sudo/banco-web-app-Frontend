import React, { useState } from "react";
import { registrar } from "../services/authService";
import logo from '../assets/LogoApp.png'


export const Register = ({ onIrALogin }) => {
  
  const[formData,setFormData] = useState({
    documento: '',
    nombre: '',
    email: '',
    password: '',
    saldo: ''
  });

  const[error,setError] = useState('');
  const[exito,setExito] = useState(false);
  const[mensaje,setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      await registrar(formData);
      setExito(true);
      setMensaje('Usuario registrado, ya estás autenticado')
    } catch (err) {
      setError('Ocurrio un error en el registro, intenta de nuevo')
      setExito(false)
    }
  };
  
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
        <div
          className="card border-0 shadow-sm p-4 w-100"
          style={{ maxWidth: '460px', borderRadius: 9 }}
        >
          <div className="text-center mb-4">
            <img src={logo} alt="logoApp" />
            <h3 className="fw-bold mb-1" style={{ color: '#2b2b2b' }}>Crear Cuenta</h3>
            <span className="text-muted small">Completa tus datos para empezar</span>
          </div>
          {error && (
            <div className="alert alert-danger py-2 small mb-3" role="alert">
              {error}
            </div>
          )}
          {exito && (
            <div className="alert alert-success py-2 small mb-3" role="alert">
              Registro Exitoso!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="documento"
                className="form-control"
                placeholder="Número de documento"
                value={formData.documento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre y Apellido"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input 
              type="email" 
              name="email"
              className="form-control"
              placeholder="Correo Electronico"
              value={formData.email}
              onChange={handleChange}
              required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="saldo"
                className="form-control"
                placeholder="Saldo Inicial"
                value={formData.saldo}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-semibold py-2" style={{marginBottom:'10px'}} >Registrarme</button>
            <button type="button" className="btn btn-outline-primary w-100 fw-semibold py-2" onClick={onIrALogin}>Volver</button>
          </form>
        </div>  
        </div>     
    );    
}
export default Register;