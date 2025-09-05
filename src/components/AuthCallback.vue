<template>
  <div class="min-h-screen bg-white flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <h2 class="text-lg font-medium text-foreground mb-2">Procesando inicio de sesión...</h2>
      <p class="text-muted-foreground">Por favor espera, te estamos redirigiendo.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const token = route.query.token;
  const name = route.query.name;

  if (token) {
    try {
      // Usar el método del store para hacer login con el token
      authStore.loginWithToken(token);
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error procesando login con Google:', error);
      router.push('/login?error=auth_failed');
    }
  } else {
    // Si no hay token, verificar si hay un error
    const error = route.query.error;
    if (error) {
      router.push(`/login?error=${error}`);
    } else {
      router.push('/login?error=auth_failed');
    }
  }
});
</script>