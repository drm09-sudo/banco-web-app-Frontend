import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mi-banco-backend.onrender.com'
});

//Creo el interceptor para adjuntar automaticamente el token
//si existe en localStorage

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token && !config.url.includes('/auth/')){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;