import React, { useEffect, useState } from "react";
import {obtenerHistorial,realizarTransferencia, obtenerUsuario } from "../services/bancoService";
import { logout } from "../services/authService";
import LogoApp from '../assets/LogoApp.png'

function Dashboard({onLogout}){
    //Estados para datos recibidos desde el backend
    const [usuario, setUsuario] = useState({
         email: '',documento: '', nombre: '', saldo: 0
    });
    const [historial,setHistorial] = useState([]);

    //estados para el formulario de transferencia
    const [emailReceptor, setEmailReceptor] = useState('');
    const [cantidad, setCantidad] = useState('');

    //estados para mensajes de feedback
    const [mensaje ,setMensaje] = useState('');
    const[error, setError] = useState('');

    //para que el monto solo acepte numeros
    const handleCantidadChange = (e) => {
      const valor = e.target.value;
      if(/^\d*\.?\d*$/.test(valor)){
        setCantidad(valor)
      }
    };

    //carga inicial de datos
    const cargarDatos = async () =>{
        try{
            const datosUsuario = await obtenerUsuario();
            console.log("Datos del usuario recibidos de java: ", datosUsuario);

            //mapeo al usuario
            setUsuario({
                documento: datosUsuario.documento || 'documento',
                nombre: datosUsuario.nombre || 'usuario',
                saldo: datosUsuario.saldo ?? 0,
                email: datosUsuario.email || 'email'
            });
            setError('');
        }catch(err){
            console.error("error cargando perfíl: " , err);
            setError('Error al cargar la información de la cuenta');
        }
        try{
            const datosHistorial = await obtenerHistorial();
            setHistorial(datosHistorial);
        }catch(err){
            console.error("Error cargando historial: ", err)
        }
    };

    useEffect(()=>{
        cargarDatos();
    },[]);//paso el arreglo vacio del useEffect

    //Manejador del envío de transferencias
    const handleTransferir = async (e) =>{
        e.preventDefault();
        setError('');
        setMensaje('');
    
    try{
        await realizarTransferencia({emailReceptor, cantidad: parseFloat(cantidad)});
        setMensaje('Transferencia realizada con exito');
        setEmailReceptor('');
        setCantidad('');
        //recargar el historial para reflejar el cambio
        cargarDatos();
        }catch(error){
        setError('No se pudo realizar la transferencia.');
        }
    };

    return (
      <div className="min-vh-100 bg-light p-4">
        <div className="container-fluid" style={{maxWidth: '1200px'}}>

          {/* Header superior con logo */}
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <img src={LogoApp} alt="logoApp" width={'150px'} />
            </div>
            <button className="btn btn-outline-danger" onClick={onLogout}>Cerrar Sesión</button>
          </header>
          <div className="row g-4">
            <div className="col-md-5">
              <div className="card border-0 shadow-sm p-4 mb-4" style={{borderRadius: '6px'}}>
                <span className="text-uppercase text-muted small fw-bold tracking-wide">
                  Mi cuenta
                </span>
                <h4 className="fw-bold mt-1 mb-1" style={{color: '#2b2b2b'}}>
                  {usuario.nombre|| 'Usuario'}
                </h4>
                <p className="text-secondary mb-0 small">
                  Cuenta N°: <span className="fw-semibold text-dark">{usuario.documento}</span>
                </p>
                <p className= "text-secondary mb-0 small">
                  Email: <span className="fw-semibold text-dark">{usuario.email}</span>
                </p>
              </div>
              <div className="card border-0 shadow-sm p-4 mb-4" style={{borderRadius: '6px'}}>
              <div className="text-white p-3 mb-4 rounded-3 bg-primary bg-gradient">
                <span className="text-white-50 small text-uppercase fw-semibold">Saldo Disponible</span>
                <h2 className="fw-bold mb-0">${usuario.saldo ? usuario.saldo.toLocaleString(): '0'}</h2>
              </div>
              <h5 className="fw-bold mb-3" style={{color: '#2b2b2b'}}>Realizar Transferencia</h5>
              <form onSubmit={handleTransferir}>
                <div className="mb-3">
                  <label className="form-label small text-muted">Cuenta Destino</label>
                  <input 
                  type="email"
                  className="form-control"
                  placeholder="correo@gmail.com"
                  value={emailReceptor}
                  onChange={(e) => setEmailReceptor(e.target.value)}
                  required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted">Cantidad a Transferir</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input 
                    type="text" 
                    inputMode="decimal"
                    className="form-control"
                    placeholder="0.00"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100 fw-semibold mt-2">
                  Transferir Dinero
                </button>
              </form>
            </div>
            </div>
          {/*Aqui termino la columna izquierda*/ }
          <div className="col-md-7">
            <div className="card border-0 shadow-sm p-4 h-100" style={{borderRadius: '6px'}}>
              <h5 className="fw-bold-mb-3">
                Historial de Movimientos
              </h5>
              {!historial || historial.length === 0 ?(
                <div className="text-center text-muted my-auto py-5">
                  <p className="mb-0">No hay movimientos registrados en tu cuenta.</p>
                </div>
              ):(
                <div className="table-responsive">
                  <table className="table table-hover allign-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="small text-muted">Cuenta</th>
                        <th scope="col" className="small text-muted">Cantidad</th>
                        <th scope="col" className="small text-muted">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map((t,index) =>(
                        <tr key={t.id || index}>
                          <td>
                            <div className="fw-semibold small">
                              {t.cuentaDestino || t.emailReceptor || 'Transferencia'}
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold text-dark">
                              ${t.cantidad ? t.cantidad.toLocaleString(): '0'}
                            </span>
                          </td>
                          <td className="small text-muted text-end">
                            {t.fecha ? new Date(t.fecha).toLocaleDateString() : 'Reciente'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
