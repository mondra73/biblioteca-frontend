import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/refresh-token`,
      {},
      { withCredentials: true } 
    )
    const newAccessToken = response.data.accessToken
    if (newAccessToken) {
      localStorage.setItem('auth-token', newAccessToken)
      return newAccessToken
    }
  } catch (err) {
    console.error('Error refrescando token', err)
    return null
  }
}

// Interceptor de requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
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
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newToken = await refreshAccessToken()

      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        originalRequest.headers['auth-token'] = newToken
        return api(originalRequest) 
      } else {
        localStorage.removeItem('auth-token')
        window.location.href = '/login?sessionExpired=true'
      }
    }

    return Promise.reject(error)
  }
)

export default api
