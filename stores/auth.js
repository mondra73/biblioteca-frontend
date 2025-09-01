import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

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
    token, // Exportar el getter del token
    checkAuth,
    login,
    logout,
  }
})
