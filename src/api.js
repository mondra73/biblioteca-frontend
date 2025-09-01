import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Interceptor de responses - VERSIÓN MEJORADA
api.interceptors.response.use(
  response => {
    // Buscar el token en diferentes ubicaciones posibles
    let token = null;

    if (response.data.token) {
      token = response.data.token;
    } else if (response.data.data && response.data.data.token) {
      token = response.data.data.token;
    } else if (response.data.accessToken) {
      token = response.data.accessToken;
    }

    if (token) {
      localStorage.setItem('auth-token', token);
    }

    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth-token');
      window.location.href = '/login?sessionExpired=true';
    }
    return Promise.reject(error);
  }
);

export default api
