import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import api from '../src/api.js'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userData = ref(null)

  // Getter para obtener el token
  const token = computed(() => {
    return localStorage.getItem('auth-token')
  })

  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth-token')

    if (storedToken) {
      isAuthenticated.value = true

      try {
        const decodedToken = jwtDecode(storedToken)
        userData.value = {
          name: decodedToken.name,
          id: decodedToken.id,
        }
      } catch (error) {
        console.error('Error decodificando el token:', error)
        localStorage.removeItem('auth-token')
        isAuthenticated.value = false
        userData.value = null
      }
    } else {
      isAuthenticated.value = false
      userData.value = null
    }
  }

  const login = (responseData) => {
    if (responseData && responseData.data && responseData.data.token) {
      const newToken = responseData.data.token

      localStorage.setItem('auth-token', newToken)
      
      // Configurar el token en las cabeceras de axios
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

      try {
        const decodedToken = jwtDecode(newToken)
        userData.value = {
          name: decodedToken.name,
          id: decodedToken.id,
        }
      } catch (error) {
        console.error('Error decodificando el token:', error)
      }

      isAuthenticated.value = true
    } else {
      console.error('No se encontró token en la respuesta:', responseData)
    }
  }

  const loginWithToken = (token) => {
    localStorage.setItem('auth-token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('auth-token')
    // Eliminar el token de las cabeceras de axios
    delete api.defaults.headers.common['Authorization']
    isAuthenticated.value = false
    userData.value = null
  }

  // 🔹 Nueva función para renovar el token
  const refreshAccessToken = async () => {
    try {
      const res = await api.post('/user/refresh-token') 
      if (res.data.token) {
        login({ data: { token: res.data.token } }) 
        return true
      }
    } catch (err) {
      console.error('No se pudo refrescar el token', err)
      logout()
      return false
    }
  }

  // Verificar autenticación al inicializar
  checkAuth()

  return {
    isAuthenticated,
    userData,
    token,
    checkAuth,
    login,
    loginWithToken,
    logout,
    refreshAccessToken, 
  }
})