import api from "../api/axios";

//aqui concentro las llamadas a los controladores del backend
export const obtenerUsuario = async() =>{
    const response = await api.get('/principal');
    return response.data;
}

export const obtenerHistorial = async() =>{
    const response = await api.get('/transacciones/historial');
   return response.data;
}
export const realizarTransferencia = async(datosTransferencia) =>{
    //datos transferencia = cuentaDestino(email), cantidad
    const response = await api.post('/transacciones/transferir', datosTransferencia);
    return response.data;
}