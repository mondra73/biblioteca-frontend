<template>
  <div v-if="mostrarModalPelicula" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Agregar Nueva Película</h2>

      <!-- Formulario -->
      <form @submit.prevent="submitMovieForm">
        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="newMovie.titulo" type="text" id="titulo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Título de la película">
          </div>

          <!-- Director -->
          <div>
            <label for="director" class="block text-sm font-medium text-gray-700 mb-1">Director *</label>
            <input v-model="newMovie.director" type="text" id="director" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Director de la película">
          </div>

          <!-- Fecha -->
          <div>
            <label for="fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha de visualización *</label>
            <input v-model="newMovie.fecha" type="date" id="fecha" required :max="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Valoración -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valoración</label>
            <div class="flex space-x-1">
              <button v-for="rating in 5" :key="rating" type="button" @click="newMovie.valuacion = rating"
                class="w-10 h-10 rounded-full border-2 transition-all duration-200" :class="{
                  'border-yellow-400 bg-yellow-100 text-yellow-600': rating <= newMovie.valuacion,
                  'border-gray-300 text-gray-400 hover:border-yellow-400 hover:text-yellow-500': rating > newMovie.valuacion
                }">
                {{ rating }}
              </button>
            </div>
            <div class="mt-1 text-sm text-gray-500">
              {{ newMovie.valuacion ? `Seleccionado: ${newMovie.valuacion} estrellas` : 'Sin valorar' }}
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea v-model="newMovie.descripcion" id="descripcion" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Reseña o comentarios sobre la película..."></textarea>
          </div>
        </div>

        <!-- Mensajes de error -->
        <div v-if="formError" class="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {{ formError }}
        </div>

        <!-- Botones -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="closeModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
            Cancelar
          </button>
          <button type="submit" :disabled="loadingSubmit"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="loadingSubmit">Guardando...</span>
            <span v-else>Guardar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue' // ✅ ELIMINAR watch
import { useAuthStore } from '../../stores/auth'

// ✅ DEFINIR EMITS (esto te faltaba)
const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()
const loadingSubmit = ref(false)
const formError = ref(null)

// ✅ CONTROLAR LA VISIBILIDAD INTERNAMENTE (como el modal de libros)
const mostrarModalPelicula = ref(true)

// Datos de la nueva película
const newMovie = reactive({
  titulo: '',
  director: '',
  fecha: '',
  valuacion: null,
  descripcion: ''
})

// Fecha actual para limitar el input de fecha
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const closeModal = () => {
  // ✅ USAR emit PARA CERRAR
  emit('close')
  resetForm()
}

const resetForm = () => {
  newMovie.titulo = ''
  newMovie.director = ''
  newMovie.fecha = ''
  newMovie.valuacion = null
  newMovie.descripcion = ''
  formError.value = null
}

const submitMovieForm = async () => {
  try {
    loadingSubmit.value = true
    formError.value = null

    // Validaciones básicas
    if (!newMovie.titulo.trim()) {
      throw new Error('El título es requerido')
    }

    if (!newMovie.director.trim()) {
      throw new Error('El director es requerido')
    }

    if (!newMovie.fecha) {
      throw new Error('La fecha es requerida')
    }

    // Validar que la fecha no sea futura
    const selectedDate = new Date(newMovie.fecha)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate > today) {
      throw new Error('La fecha no puede ser futura')
    }

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/carga-peliculas`, {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: newMovie.titulo.trim(),
        director: newMovie.director.trim(),
        fecha: newMovie.fecha,
        valuacion: newMovie.valuacion,
        descripcion: newMovie.descripcion.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || data.error || 'Error al guardar la película')
    }

    // ✅ USAR emit PARA ÉXITO
    emit('success')
    resetForm()

  } catch (err) {
    formError.value = err.message
    console.error('Error al guardar película:', err)
  } finally {
    loadingSubmit.value = false
  }
}
</script>