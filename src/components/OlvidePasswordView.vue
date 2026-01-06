<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card principal -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Estado: Formulario -->
        <div v-if="!emailSent">
          <!-- Ícono -->
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
            </div>
          </div>

          <!-- Título y descripción -->
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">¿Olvidaste tu contraseña?</h1>
            <p class="text-gray-600 text-sm">
              No te preocupes. Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <!-- Formulario -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none"
                placeholder="tu@email.com"
                :disabled="loading"
              >
              <div v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</div>
            </div>

            <button 
              type="submit"
              class="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
            </button>
          </form>

          <!-- Enlaces adicionales -->
          <div class="mt-6 text-center">
            <router-link to="/login" class="text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200">
              ← Volver al inicio de sesión
            </router-link>
          </div>
        </div>

        <!-- Estado: Email enviado -->
        <div v-else class="text-center py-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">¡Solicitud recibida!</h3>
          <p class="text-gray-600 text-sm mb-4">
            Si el email <strong>{{ email }}</strong> existe en nuestro sistema, 
            recibirás un enlace para restablecer tu contraseña en los próximos minutos.
          </p>
          <p class="text-gray-500 text-xs mb-6">
            💡 <strong>Consejo:</strong> Revisa tu carpeta de spam si no encuentras el email.
          </p>
          <div class="space-y-3">
            <router-link 
              to="/login" 
              class="block w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Volver al inicio de sesión
            </router-link>
            <button 
              @click="resetForm"
              class="text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200"
            >
              Solicitar otro enlace
            </button>
          </div>
        </div>
      </div>

      <!-- Información adicional -->
      <div v-if="!emailSent" class="mt-6 text-center">
        <p class="text-xs text-gray-500">
          ¿Problemas? 
          <router-link to="/contacto" class="text-primary hover:text-primary-dark font-medium">
            Contacta con soporte
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from '../api';

const router = useRouter();
const email = ref("");
const loading = ref(false);
const emailSent = ref(false);
const errors = ref({
  email: ""
});

const validateEmail = (email) => {
  if (!email) return 'El email es requerido';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) return 'Email inválido';
  return null;
};

const resetForm = () => {
  emailSent.value = false;
  errors.value.email = "";
};

const handleSubmit = async () => {
  errors.value.email = "";

  const emailError = validateEmail(email.value);
  if (emailError) {
    errors.value.email = emailError;
    return;
  }

  loading.value = true;

  try {
    const response = await api.post('/user/olvido-password', {
      email: email.value.toLowerCase().trim()
    });

    emailSent.value = true;
    
  } catch (error) {
    console.error('Error en la petición:', error);
    
    if (error.response?.status === 429) {
      errors.value.email = error.response.data.error;
    } else if (error.response?.data?.error) {
      errors.value.email = error.response.data.error;
    } else {
      errors.value.email = 'Error de conexión. Intenta nuevamente.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

</style>