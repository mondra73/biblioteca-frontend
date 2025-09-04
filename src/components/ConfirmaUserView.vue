<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-6">
    <div class="max-w-md w-full">
      <!-- Estado: Cargando -->
      <div v-if="loading" class="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
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
        <h1 class="text-2xl font-bold text-foreground mb-4">Verificando cuenta...</h1>
        <p class="text-muted-foreground">Estamos confirmando tu dirección de email.</p>
      </div>

      <!-- Estado: Éxito -->
      <div v-else-if="!error" class="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <!-- Success Message -->
        <h1 class="text-2xl font-bold text-foreground mb-4 text-balance">¡Felicitaciones!</h1>
        <p class="text-lg text-muted-foreground mb-6 text-pretty">
          Tu cuenta ha sido verificada exitosamente.
        </p>
        <p class="text-sm text-muted-foreground mb-8 text-pretty">
          Ya puedes comenzar a organizar tus películas, series y libros favoritos.
        </p>

        <!-- Action Button -->
        <router-link to="/" class="inline-block w-full">
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Comenzar Ahora
          </button>
        </router-link>
      </div>

      <!-- Estado: Error -->
      <div v-else class="bg-card p-8 rounded-lg border border-border shadow-sm text-center">
        <!-- Error Icon -->
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        <!-- Error Message -->
        <h1 class="text-2xl font-bold text-foreground mb-4">Error de verificación</h1>
        <p class="text-muted-foreground mb-6">{{ errorMessage }}</p>
        
        <!-- Retry Button -->
        <button
          @click="retryVerification"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mb-4"
        >
          Reintentar
        </button>
        
        <!-- Contact Link -->
        <router-link to="/contacto" class="text-blue-500 hover:text-blue-600 font-medium">
          ¿Necesitas ayuda? Contáctanos
        </router-link>
      </div>

      <!-- Additional Info (solo en éxito) -->
      <div v-if="!loading && !error" class="mt-6 text-center">
        <p class="text-sm text-muted-foreground">
          ¿Necesitas ayuda?
          <router-link to="/contacto" class="text-blue-500 hover:text-blue-600 font-medium ml-1">
            Contáctanos
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from '../api'; // Asegúrate de que la ruta sea correcta

const route = useRoute();
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

const confirmAccount = async () => {
  try {
    loading.value = true;
    error.value = false;
    
    // Obtener parámetros de la RUTA (no query)
    const mail = route.params.mail;
    const token = route.params.token;

    console.log("Parámetros recibidos:", { mail, token }); // Para debugging

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

    // Éxito
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

// Ejecutar la verificación cuando el componente se monta
onMounted(() => {
  confirmAccount();
});
</script>

<style>
/* Puedes mantener tu configuración de Tailwind en main.js o tailwind.config.js */
</style>