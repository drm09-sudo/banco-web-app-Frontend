import api from '../api/axios';

export const login = async (credenciales) => {
    const response = await api.post('/auth/login',credenciales);
    if(response.data.token){
        localStorage.setItem('token',response.data.token);
    }
    return response.data;
};

export const registrar = async (datosUsuario) =>{
    const response = await api.post('/auth/registro', datosUsuario);
    if(response.data.token){
        localStorage.setItem('token',response.data.token);
    }
    return response.data;
};

export const logout = () =>{
    localStorage.removeItem('token');
}