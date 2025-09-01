import axios from 'axios'

// Función para detectar la URL base automáticamente
const getApiBase = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api'
  }
  return 'https://backbibloteca.onrender.com/api'
}

const api = axios.create({
  baseURL: getApiBase(), // ← Usa la detección automática
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    // También agrega el header que espera tu backend
    config.headers['auth-token'] = token
  }
  return config
})

// Interceptor de responses
api.interceptors.response.use(
  (response) => {
    let token = null

    if (response.data.token) {
      token = response.data.token
    } else if (response.data.data && response.data.data.token) {
      token = response.data.data.token
    } else if (response.data.accessToken) {
      token = response.data.accessToken
    }

    if (token) {
      localStorage.setItem('auth-token', token)
    }

    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/login?sessionExpired=true'
    }
    return Promise.reject(error)
  },
)

export default api
