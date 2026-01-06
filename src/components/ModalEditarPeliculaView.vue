<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">Editar Película</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="confirmarGuardado">
        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="peliculaEditada.titulo" type="text" id="titulo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Director -->
          <div>
            <label for="director" class="block text-sm font-medium text-gray-700 mb-1">Director *</label>
            <input v-model="peliculaEditada.director" type="text" id="director" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Fecha -->
          <div>
            <label for="fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha de visualización *</label>
            <input v-model="peliculaEditada.fecha" type="date" id="fecha" required :max="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Valoración -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valoración</label>
            <div class="flex space-x-1">
              <button v-for="rating in 5" :key="rating" type="button" @click="peliculaEditada.valuacion = rating"
                class="w-10 h-10 rounded-full border-2 transition-all duration-200" :class="{
                  'border-yellow-400 bg-yellow-100 text-yellow-600': rating <= peliculaEditada.valuacion,
                  'border-gray-300 text-gray-400 hover:border-yellow-400 hover:text-yellow-500': rating > peliculaEditada.valuacion
                }">
                {{ rating }}
              </button>
            </div>
            <div class="mt-1 text-sm text-gray-500">
              {{ peliculaEditada.valuacion ? `Seleccionado: ${peliculaEditada.valuacion} estrellas` : 'Sin valorar' }}
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea v-model="peliculaEditada.descripcion" id="descripcion" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Reseña o comentarios sobre la película..."></textarea>
          </div>
        </div>

        <!-- Mensajes de error -->
        <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {{ error }}
        </div>

        <!-- Botones -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
            Cancelar
          </button>
          <button type="submit" :disabled="loading"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loading">Guardando...</span>
            <span v-else>Guardar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  pelicula: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'pelicula-editada'])

const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)

const peliculaEditada = reactive({
  ...props.pelicula,
  fecha: props.pelicula.fecha ? new Date(props.pelicula.fecha).toISOString().split('T')[0] : ''
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const confirmarGuardado = async () => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pelicula/${props.pelicula._id}`, {
      method: 'PUT',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(peliculaEditada)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al editar la película')
    }

    emit('pelicula-editada')
    emit('close')

  } catch (err) {
    error.value = err.message
    console.error('Error editando película:', err)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emit('close')
}
</script>