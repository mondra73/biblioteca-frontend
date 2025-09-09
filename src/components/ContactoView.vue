<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-2xl">
      <div class="bg-card shadow-lg rounded-lg border border-gray-200">
        <!-- Encabezado -->
        <div class="text-center pb-8 pt-6 px-6">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :style="{ backgroundColor: 'hsl(200 100% 50% / 0.1)' }">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-2 text-foreground">Contáctanos</h1>
          <p class="text-muted-foreground">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte
          </p>
        </div>

        <!-- Formulario -->
        <div class="px-6 pb-6">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nombre -->
              <div>
                <label class="block text-sm font-medium mb-2 text-foreground">Nombre completo</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input v-model="form.nombre" type="text" placeholder="Tu nombre completo"
                    class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required />
                </div>
                <div v-if="errors.nombre" class="text-red-600 text-sm mt-1">{{ errors.nombre }}</div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium mb-2 text-foreground">Email</label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input v-model="form.email" type="email" placeholder="tu@email.com"
                    class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required />
                </div>
                <div v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</div>
              </div>
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Teléfono (opcional)</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input v-model="form.telefono" type="tel" placeholder="+54 11 1234-5678"
                  class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" />
              </div>
            </div>

            <!-- Asunto -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Asunto</label>
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                  <polyline points="9,11 12,14 15,11" />
                  <path d="M12 2v12" />
                </svg>
                <select v-model="form.asunto"
                  class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                  required>
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta-general">Consulta general</option>
                  <option value="soporte-tecnico">Soporte técnico</option>
                  <option value="sugerencia">Sugerencia de mejora</option>
                  <option value="problema-cuenta">Problema con mi cuenta</option>
                  <option value="colaboracion">Propuesta de colaboración</option>
                  <option value="otro">Otro</option>
                </select>
                <svg
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </div>
              <div v-if="errors.asunto" class="text-red-600 text-sm mt-1">{{ errors.asunto }}</div>
            </div>

            <!-- Mensaje -->
            <div>
              <label class="block text-sm font-medium mb-2 text-foreground">Mensaje</label>
              <div class="relative">
                <svg class="absolute left-3 top-3 text-muted-foreground w-4 h-4" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <textarea v-model="form.mensaje" rows="5" placeholder="Escribe tu mensaje aquí..."
                  class="w-full pl-10 pr-3 py-2 rounded-md transition-colors bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  required></textarea>
              </div>
              <div v-if="errors.mensaje" class="text-red-600 text-sm mt-1">{{ errors.mensaje }}</div>
              <div class="text-xs text-muted-foreground mt-1">{{ form.mensaje.length }}/500 caracteres</div>
            </div>

            <!-- Botón -->
            <button type="submit"
              class="w-full py-3 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              :disabled="loading || cooldownTimer">
              <span v-if="cooldownTimer">Espera {{ Math.floor(timeLeft / 60) }}:{{ (timeLeft %
                60).toString().padStart(2, '0') }}</span>
              <span v-else-if="loading">Enviando...</span>
              <span v-else>Enviar mensaje</span>
              <svg v-if="loading" class="animate-spin -ml-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de éxito -->
  <div v-if="successModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
    @click.self="successModal = false">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          :style="{ backgroundColor: 'hsl(142 76% 36% / 0.1)' }">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-foreground mb-2">¡Mensaje enviado!</h3>
        <p class="text-muted-foreground mb-4">Gracias por contactarnos. Te responderemos en las próximas 24 horas.</p>
        <button @click="successModal = false"
          class="w-full py-2 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90">
          Cerrar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de error -->
  <div v-if="errorModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
    @click.self="errorModal = false">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          :style="{ backgroundColor: 'hsl(0 76% 51% / 0.1)' }">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-foreground mb-2">Error al enviar</h3>
        <p class="text-muted-foreground mb-4">{{ errorMessage }}</p>
        <button @click="errorModal = false"
          class="w-full py-2 px-4 rounded-md font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90">
          Intentar nuevamente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
});

const errors = reactive({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
});

const loading = ref(false);
const successModal = ref(false);
const errorModal = ref(false);
const errorMessage = ref('');
const mensaje = ref('')
const cooldownTimer = ref(0) 

const validateForm = () => {
  let isValid = true;
  errors.nombre = '';
  errors.email = '';
  errors.asunto = '';
  errors.mensaje = '';

  if (form.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Por favor ingresa un email válido';
    isValid = false;
  }

  if (!form.asunto) {
    errors.asunto = 'Por favor selecciona un asunto';
    isValid = false;
  }

  if (form.mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:3000'}/api/user/contacto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (data.success) {
      successModal.value = true;
      // Limpiar formulario
      form.nombre = '';
      form.email = '';
      form.telefono = '';
      form.asunto = '';
      form.mensaje = '';

      // Guardar timestamp del último envío exitoso
      localStorage.setItem('lastContactSubmit', Date.now().toString());
    } else {
      errorMessage.value = data.message || 'Error al enviar el mensaje';
      errorModal.value = true;

      // Si es error 429 (rate limit), iniciar contador
      if (response.status === 429) {
        startCooldown(5 * 60); // 5 minutos en segundos
      }
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error de conexión. Por favor, intenta nuevamente.';
    errorModal.value = true;
  } finally {
    loading.value = false;
  }
};

// Limitar caracteres a 500
watch(
  () => form.mensaje,
  (newVal) => {
    if (newVal.length > 500) form.mensaje = newVal.substring(0, 500);
  }
);
</script>
