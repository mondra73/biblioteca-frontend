<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
    <!-- Estado: Cargando -->
    <div v-if="loading" class="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Verificando cuenta...</h1>
      <p class="text-gray-600">Estamos confirmando tu dirección de email.</p>
    </div>

    <!-- Estado: Éxito -->
<div v-else-if="!error" class="max-w-md w-full bg-white rounded-lg shadow-sm overflow-hidden">
  <div class="bg-primary px-6 py-6 text-center">
    <h1 class="text-2xl font-bold text-white">Biblioteca Multimedia</h1>
  </div>
  
  <div class="px-6 py-8">
    <div class="text-center mb-6">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
    </div>
    
    <h2 class="text-2xl font-bold text-gray-900 text-center mb-4">
      ¡Bienvenido a Biblioteca Multimedia!
    </h2>
    
    <p class="text-gray-600 text-center leading-relaxed mb-8">
      Tu cuenta ha sido verificada exitosamente. Ya puedes comenzar a disfrutar de todos 
      los beneficios de nuestra plataforma y organizar tu entretenimiento favorito.
    </p>

    <router-link to="/" class="block w-full">
      <button class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
        Comenzar Ahora
      </button>
    </router-link>
  </div>
</div>


    <!-- Estado: Error -->
    <div v-else class="max-w-md w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="bg-red-600 px-6 py-6 text-center">
        <h1 class="text-2xl font-bold text-white">Tu Plataforma</h1>
      </div>
      
      <div class="px-6 py-8">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-4">
          Error de verificación
        </h2>
        
        <p class="text-gray-600 text-center leading-relaxed mb-6">
          {{ errorMessage }}
        </p>

        <div class="space-y-3">
          <button
            @click="retryVerification"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Reintentar
          </button>
          
          <router-link to="/contacto" class="block w-full">
            <button class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Contactar Soporte
            </button>
          </router-link>
        </div>
      </div>
      
      <div class="bg-gray-50 px-6 py-6 text-center border-t border-gray-200">
        <p class="text-sm text-gray-600 mb-2">
          © 2025 Biblioteca Multimedia. Todos los derechos reservados.
        </p>
        <div class="text-sm">
          <router-link to="/contacto" class="text-blue-600 hover:text-blue-700">
            Contacto
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from '../api';

const route = useRoute();
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

const confirmAccount = async () => {
  try {
    loading.value = true;
    error.value = false;
    
    const mail = route.params.mail;
    const token = route.params.token;

    if (!mail || !token) {
      throw new Error("Faltan parámetros necesarios para la verificación");
    }

    const response = await api.post('/user/confirmar/', {
      mail: mail,
      token: token
    });

    if (response.data.error) {
      throw new Error(response.data.mensaje);
    }

    loading.value = false;
    
  } catch (err) {
    loading.value = false;
    error.value = true;
    errorMessage.value = err.response?.data?.mensaje || err.message || "Error al verificar la cuenta";
    console.error("Error en verificación:", err);
  }
};

const retryVerification = () => {
  confirmAccount();
};

onMounted(() => {
  confirmAccount();
});
</script>

<style>

</style>