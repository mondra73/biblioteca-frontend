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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2 text-foreground">Crear Cuenta</h1>
          <p class="text-muted-foreground">
            Únete y comienza a organizar tu entretenimiento favorito
          </p>
        </div>

        <!-- Formulario -->
        <div class="px-6 pb-6">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Nombre completo</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input type="text" v-model="name" placeholder="Tu nombre completo"
                  class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required />
              </div>
              <div v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Email</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••"
                  class="w-full pl-10 pr-10 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required />
                <button type="button" @click="togglePassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-none border-none text-muted-foreground cursor-pointer transition-colors hover:text-foreground">
                  <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </button>
              </div>
              <div v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Confirmar contraseña</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
                  placeholder="••••••••"
                  class="w-full pl-10 pr-10 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required />
                <button type="button" @click="toggleConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-none border-none text-muted-foreground cursor-pointer transition-colors hover:text-foreground">
                  <svg v-if="!showConfirmPassword" class="w-4 h-4" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </button>
              </div>
              <div v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">{{ errors.confirmPassword }}</div>
            </div>

            <!-- Botón submit -->
            <button type="submit"
              class="w-full py-3 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="loading">
              {{ loading ? "Creando cuenta..." : "Crear Cuenta" }}
            </button>
          </form>

          <!-- Divider -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-border"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">O regístrate con</span>
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

          <!-- Login -->
          <div class="mt-6 text-center">
            <p class="text-muted-foreground text-sm">
              ¿Ya tienes una cuenta?
              <button @click="goToLogin" class="text-primary hover:opacity-80 transition-opacity font-medium ml-1">
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Registro Exitoso -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="text-center">
          <!-- Ícono de éxito -->
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <!-- Mensaje principal -->
          <h3 class="mt-4 text-lg font-medium text-gray-900">
            ¡Registro exitoso!
          </h3>

          <!-- Mensaje secundario -->
          <p class="mt-2 text-sm text-gray-500">
            Revisa tu email para confirmar tu cuenta y comenzar a disfrutar de la plataforma.
          </p>

          <!-- Botón -->
          <div class="mt-6">
            <button @click="closeModal"
              class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import api from '../api';

const route = useRoute();
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const showSuccessModal = ref(false);

const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const goBack = () => {
  router.push('/');
};

const goToLogin = () => {
  router.push('/login');
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const closeModal = () => {
  showSuccessModal.value = false;
  router.push('/');
};

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && showSuccessModal.value) {
    closeModal();
  }
};

const validateName = (name) => {
  if (!name) return 'El nombre es requerido';
  if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
  return null;
};

const validateEmail = (email) => {
  if (!email) return 'El email es requerido';
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) return 'Email inválido';
  return null;
};

const validatePassword = (password) => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Confirma tu contraseña';
  if (password !== confirmPassword) return 'Las contraseñas no coinciden';
  return null;
};

const onSubmit = async () => {
  errors.value = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let hasErrors = false;

  // Validaciones
  const nameError = validateName(name.value);
  if (nameError) {
    errors.value.name = nameError;
    hasErrors = true;
  }

  const emailError = validateEmail(email.value);
  if (emailError) {
    errors.value.email = emailError;
    hasErrors = true;
  }

  const passwordError = validatePassword(password.value);
  if (passwordError) {
    errors.value.password = passwordError;
    hasErrors = true;
  }

  const confirmPasswordError = validateConfirmPassword(password.value, confirmPassword.value);
  if (confirmPasswordError) {
    errors.value.confirmPassword = confirmPasswordError;
    hasErrors = true;
  }

  if (hasErrors) return;

  loading.value = true;

  try {
    const payload = {
      name: name.value,
      email: email.value,
      password1: password.value,
      password2: confirmPassword.value
    };

    // ✅ SI VIENE DE GOOGLE, agregar datos adicionales
    const googleUser = route.query.googleUser;
    if (googleUser) {
      const userData = JSON.parse(decodeURIComponent(googleUser));
      payload.googleId = userData.googleId;
      payload.authProvider = 'google';
      payload.avatar = userData.avatar;
    }

    const response = await api.post('/auth/register', payload);

    if (response.data.error === null) {
      showSuccessModal.value = true;
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

const onGoogleLogin = () => {
  console.log("Google register clicked");
  alert("Google OAuth se implementaría aquí");
};

onMounted(() => {
  const googleUser = route.query.googleUser;
  const fromGoogle = route.query.from === 'google';

  if (fromGoogle && googleUser) {
    try {
      const userData = JSON.parse(decodeURIComponent(googleUser));

      // Autorellenar formulario con datos de Google
      name.value = userData.name;
      email.value = userData.email;

      // Deshabilitar edición de email (viene verificado de Google)
      document.querySelector('input[type="email"]').setAttribute('readonly', true);

      // Mostrar mensaje informativo
      console.log('Usuario de Google detectado. Complete el registro.');

    } catch (error) {
      console.error('Error parsing Google user data:', error);
    }
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
});
</script>
