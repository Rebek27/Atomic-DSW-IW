import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3020/atom',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes detectar errores globales, por ejemplo token expirado
    if (error.response?.status === 401) {
      console.warn('Token expirado o inválido');
      // Aquí podrías redirigir al login si quieres:
      window.location.href = '/login';
    }
    return Promise.reject(error); // Reenvía el error para que el frontend lo maneje
  }
);

export default API;