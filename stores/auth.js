import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode' // Importa jwt-decode

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userData = ref(null)

  const checkAuth = () => {
    const token = localStorage.getItem('auth-token')
    
    if (token) {
      isAuthenticated.value = true
      
      // Decodificar el token para obtener los datos del usuario
      try {
        const decodedToken = jwtDecode(token)
        userData.value = {
          name: decodedToken.name,
          id: decodedToken.id
        }
      } catch (error) {
        console.error('Error decodificando el token:', error)
        // Limpiar token inválido
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
      const token = responseData.data.token
      
      localStorage.setItem('auth-token', token)
      
      // Decodificar el token inmediatamente después del login
      try {
        const decodedToken = jwtDecode(token)
        userData.value = {
          name: decodedToken.name,
          id: decodedToken.id
        }
      } catch (error) {
        console.error('Error decodificando el token:', error)
      }
      
      isAuthenticated.value = true
    } else {
      console.error('No se encontró token en la respuesta:', responseData)
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    isAuthenticated.value = false
    userData.value = null
  }

  // Verificar autenticación al inicializar
  checkAuth()

  return {
    isAuthenticated,
    userData,
    checkAuth,
    login,
    logout
  }
})