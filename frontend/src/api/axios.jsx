import axios from 'axios'; // Importamos Axios para hacer peticiones HTTP

// Creamos una instancia personalizada de Axios con una URL base
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3020/atom',
});

// Interceptor de solicitudes: se ejecuta antes de enviar cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuestas: se ejecuta al recibir una respuesta o error
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      console.warn('Token expirado o inválido');

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;