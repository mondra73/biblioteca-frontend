<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card principal -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Ícono -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v4h1a2 2 0 012 2v3a2 2 0 01-2 2H8a2 2 0 01-2-2v-3a2 2 0 012-2h1v-4z"></path>
            </svg>
          </div>
        </div>

        <!-- Título y descripción -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Restablecer contraseña</h1>
          <p class="text-gray-600 text-sm">
            Ingresa tu nueva contraseña y confírmala para actualizar tu cuenta.
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none"
              placeholder="********"
            >
            <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none"
              placeholder="********"
            >
            <p v-if="confirmPasswordError" class="text-xs text-red-500 mt-1">{{ confirmPasswordError }}</p>
          </div>

          <button 
            type="submit"
            class="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Cambiar contraseña
          </button>
        </form>

        <!-- Mensaje de éxito -->
        <div v-if="successMessage" class="mt-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ successMessage }}</h3>
          <p class="text-gray-600 text-sm">
            Ahora puedes iniciar sesión con tu nueva contraseña.
          </p>
        </div>

        <!-- Enlaces adicionales -->
        <div class="mt-6 text-center">
          <a href="#" class="text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200">
            ← Volver al inicio de sesión
          </a>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500">
          Asegúrate de que tu contraseña tenga al menos 8 caracteres y contenga letras y números.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const successMessage = ref('')

// Validación en tiempo real
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
})

function handleSubmit() {
  if (passwordError.value || confirmPasswordError.value || !password.value || !confirmPassword.value) {
    alert('Corrige los errores antes de continuar.')
    return
  }

  // Aquí iría la lógica para enviar la nueva contraseña al backend
  successMessage.value = '¡Contraseña actualizada con éxito!'
  
  // Limpiar inputs
  password.value = ''
  confirmPassword.value = ''
}
</script>

<style>
/* Colores primarios extendidos si quieres usarlos fuera de Tailwind */
.text-primary { color: #3b82f6; }
.bg-primary { background-color: #3b82f6; }
.hover\:bg-primary-dark:hover { background-color: #2563eb; }

</style>
