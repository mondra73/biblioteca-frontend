<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card principal -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Ícono -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v4h1a2 2 0 012 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3a2 2 0 012-2h1v-4z">
              </path>
            </svg>
          </div>
        </div>

        <!-- Título y descripción -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Restablecer contraseña</h1>
          <p class="text-gray-600 text-sm">
            Ingresa tu nueva contraseña y confírmala para actualizar tu cuenta.
          </p>
          <p v-if="userEmail" class="text-blue-600 text-sm mt-2 font-medium">
            Para: {{ userEmail }}
          </p>
        </div>

        <!-- Mensaje de éxito  -->
        <div v-if="successMessage" class="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-center">
          <div class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-green-800 mb-2">{{ successMessage }}</h3>
          <p class="text-green-700 text-sm mb-3">
            Ahora puedes iniciar sesión con tu nueva contraseña.
          </p>
          <button @click="redirectToLogin"
            class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
            Ir a Iniciar Sesión
          </button>
        </div>

        <!-- Formulario  -->
        <form v-if="!successMessage" @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input type="password" id="password" v-model="password"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none"
              placeholder="********" required>
            <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <input type="password" id="confirmPassword" v-model="confirmPassword"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none"
              placeholder="********" required>
            <p v-if="confirmPasswordError" class="text-xs text-red-500 mt-1">{{ confirmPasswordError }}</p>
          </div>

          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="p-3 bg-red-100 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <button type="submit" :disabled="loading || !isTokenValid"
            class="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loading">Procesando...</span>
            <span v-else>Cambiar contraseña</span>
          </button>
        </form>

        <!-- Mensaje de token inválido -->
        <div v-if="!isTokenValid && !successMessage" class="mt-6 p-4 bg-yellow-100 border border-yellow-200 rounded-lg">
          <p class="text-sm text-yellow-800">
            El enlace de restablecimiento es inválido o ha expirado. Por favor, solicita un nuevo enlace.
          </p>
          <div class="mt-3 text-center">
            <a href="/solicitar-restablecimiento" class="text-primary hover:underline text-sm font-medium">
              Solicitar nuevo enlace
            </a>
          </div>
        </div>

        <!-- Enlaces adicionales (solo se muestra si no hay éxito) -->
        <div v-if="!successMessage && isTokenValid" class="mt-6 text-center">
          <a href="/login"
            class="text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200">
            ← Volver al inicio de sesión
          </a>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500">
          La contraseña debe tener al menos 6 caracteres.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loading = ref(false)
const userEmail = ref('')
const userId = ref('')
const isTokenValid = ref(true)

const redirectToLogin = () => {
  router.push('/login')
}

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decodificando el token:', error)
    return null
  }
}

onMounted(() => {
  const pathParts = route.path.split('/')
  const tokenIndex = pathParts.findIndex(part => part === 'nuevo-password') + 2

  if (tokenIndex < pathParts.length) {
    const token = pathParts[tokenIndex]

    try {
      const decodedToken = decodeJWT(token)

      if (decodedToken && decodedToken.purpose === 'password_reset') {
        const currentTime = Math.floor(Date.now() / 1000)
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          userId.value = decodedToken.id

          const emailIndex = tokenIndex - 1
          if (emailIndex < pathParts.length) {
            userEmail.value = decodeURIComponent(pathParts[emailIndex])
          }

          isTokenValid.value = true
          return
        }
      }
    } catch (error) {
      console.error('Error procesando el token:', error)
    }
  }

  isTokenValid.value = false
})

watch(password, (newVal) => {
  if (newVal.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres.'
  } else {
    passwordError.value = ''
  }
})

watch([password, confirmPassword], () => {
  if (confirmPassword.value && password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.'
  } else {
    confirmPasswordError.value = ''
  }

  if (errorMessage.value) {
    errorMessage.value = ''
  }
})

async function handleSubmit() {
  // Validaciones
  if (passwordError.value || confirmPasswordError.value) {
    errorMessage.value = 'Por favor, corrige los errores en el formulario.'
    return
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden.'
    return
  }

  if (password.value.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  if (!isTokenValid.value) {
    errorMessage.value = 'El enlace de restablecimiento es inválido o ha expirado.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  passwordError.value = '' 
  confirmPasswordError.value = '' 

  try {
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
    const response = await fetch(`${API_BASE}/api/user/restablecer-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mail: userEmail.value,
        nuevaContrasena: password.value,
        nuevaContrasena2: confirmPassword.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error al cambiar la contraseña')
    }

    successMessage.value = `¡Contraseña actualizada con éxito, ${data.nombre || ''}!`

  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = error.message || 'Ocurrió un error al cambiar la contraseña. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style>
.text-primary {
  color: #3b82f6;
}

.bg-primary {
  background-color: #3b82f6;
}

.hover\:bg-primary-dark:hover {
  background-color: #2563eb;
}
</style>
