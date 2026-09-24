import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
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