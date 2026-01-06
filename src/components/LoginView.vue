<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-6 py-12">
    <!-- Card -->
    <div class="w-full max-w-md">
      <div class="bg-white shadow-lg border-0 rounded-lg border border-gray-200">
        <!-- Header -->
        <div class="text-center pb-8 pt-6 px-6">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style="background-color: hsl(200 100% 50% / 0.1);">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2 text-foreground">Iniciar Sesión</h1>
          <p class="text-muted-foreground">
            Accede a tu cuenta para continuar organizando tu entretenimiento
          </p>
        </div>

        <!-- Formulario -->
        <div class="px-6 pb-6">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Email</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input type="email" v-model="email" placeholder="tu@email.com"
                  class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required />
              </div>
              <div v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Contraseña</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••"
                  class="w-full pl-10 pr-10 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required />
                <button type="button" @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-none border-none text-muted-foreground cursor-pointer transition-colors hover:text-foreground">
                  <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
              <div v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</div>
            </div>

            <!-- Opciones -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" class="rounded border-input text-primary focus:ring-primary"
                  v-model="rememberMe" />
                <span class="text-muted-foreground">Recordarme</span>
              </label>
              <router-link to="/olvide-password" class="text-primary hover:opacity-80 transition-opacity">
                ¿Olvidaste tu contraseña?
              </router-link>
            </div>

            <!-- Botón submit -->
            <button type="submit"
              class="w-full py-3 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading">
              {{ loading ? "Iniciando sesión..." : "Iniciar Sesión" }}
            </button>
          </form>

          <!-- Divider -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-border"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>

            <!-- Google login -->
            <button type="button" @click="onGoogleLogin"
              class="w-full mt-4 py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center border border-border bg-transparent text-foreground hover:bg-accent">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </button>
          </div>

          <!-- Registro -->
          <div class="mt-6 text-center">
            <p class="text-muted-foreground text-sm">
              ¿No tienes una cuenta?
              <button @click="goToRegister" class="text-primary hover:opacity-80 transition-opacity font-medium ml-1">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from '../api';
import { useAuthStore } from '../../stores/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult } from 'firebase/auth';

const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();
const auth = useAuthStore();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);

const errors = ref({
  email: "",
  password: "",
});

const goToRegister = () => {
  router.push('/register');
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
  errors.value.email = "";
  errors.value.password = "";

  let hasErrors = false;

  // Validación email
  if (!email.value) {
    errors.value.email = "El email es requerido";
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.value)) {
    errors.value.email = "Email inválido";
    hasErrors = true;
  }

  if (!password.value) {
    errors.value.password = "La contraseña es requerida";
    hasErrors = true;
  }

  if (hasErrors) return;

  loading.value = true;

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });

    if (response.data.error === null) {
      auth.login(response.data);

      router.push('/dashboard');
    } else {
      errors.value.email = response.data.error;
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    if (error.response?.data?.error) {
      errors.value.email = error.response.data.error;
    } else {
      errors.value.email = 'Error de conexión con el servidor';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const auth = getAuth();
    const result = await getRedirectResult(auth);

    if (result) {
      const user = result.user;
      const idToken = await user.getIdToken();

      console.log('Token obtenido via redirect:', idToken);

      const response = await api.post('/auth/google/firebase', {
        idToken: idToken
      });

      if (response.data.error === null) {
        useAuthStore().login(response.data);
        router.push('/dashboard');
      }
    }
  } catch (error) {
    console.error('Error en redirect result:', error);
  }
});

const onGoogleLogin = async () => {
  try {
    loading.value = true;
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    provider.addScope('email');
    provider.addScope('profile');

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    const response = await api.post('/auth/google/firebase', {
      idToken: idToken
    });

    if (response.data.error === "USER_NOT_REGISTERED") {
      const idToken = await result.user.getIdToken();

      router.push({
        path: '/register',
        query: {
          googleUser: encodeURIComponent(JSON.stringify(response.data.userData)),
          from: 'google',
          idToken: idToken 
        }
      });
      return;
    }

    if (response.data.error === null) {
      authStore.login(response.data);
      router.push('/dashboard');
    } else {
      errors.value.email = response.data.error;
    }

  } catch (error) {
    console.error('Error:', error);

    if (error.response?.data?.error === "USER_NOT_REGISTERED") {
      router.push({
        path: '/register',
        query: {
          googleUser: encodeURIComponent(JSON.stringify(error.response.data.userData)),
          from: 'google'
        }
      });
    } else {
      errors.value.email = 'Error en autenticación con Google';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const error = route.query.error;
  if (error === 'auth_failed') {
    errors.value.email = 'Error en la autenticación con Google. Intenta nuevamente.';
  }
});
</script>
