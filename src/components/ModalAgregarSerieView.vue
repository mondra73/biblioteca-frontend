<template>
  <div v-if="mostrarModalSerie" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Agregar Nueva Serie</h2>

      <!-- Formulario -->
      <form @submit.prevent="submitSerieForm">
        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="newSerie.titulo" type="text" id="titulo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Título de la serie">
          </div>

          <!-- Director -->
          <div>
            <label for="director" class="block text-sm font-medium text-gray-700 mb-1">Director *</label>
            <input v-model="newSerie.director" type="text" id="director" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Director de la serie">
          </div>

          <!-- Fecha -->
          <div>
            <label for="fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha de visualización *</label>
            <input v-model="newSerie.fecha" type="date" id="fecha" required :max="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Valoración -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valoración</label>
            <div class="flex space-x-1">
              <button v-for="rating in 5" :key="rating" type="button" @click="newSerie.valuacion = rating"
                class="w-10 h-10 rounded-full border-2 transition-all duration-200" :class="{
                  'border-yellow-400 bg-yellow-100 text-yellow-600': rating <= newSerie.valuacion,
                  'border-gray-300 text-gray-400 hover:border-yellow-400 hover:text-yellow-500': rating > newSerie.valuacion
                }">
                {{ rating }}
              </button>
            </div>
            <div class="mt-1 text-sm text-gray-500">
              {{ newSerie.valuacion ? `Seleccionado: ${newSerie.valuacion} estrellas` : 'Sin valorar' }}
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea v-model="newSerie.descripcion" id="descripcion" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Reseña o comentarios sobre la serie..."></textarea>
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
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()
const loadingSubmit = ref(false)
const formError = ref(null)

const mostrarModalSerie = ref(true)

const newSerie = reactive({
  titulo: '',
  director: '',
  fecha: '',
  valuacion: null,
  descripcion: ''
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  newSerie.titulo = ''
  newSerie.director = ''
  newSerie.fecha = ''
  newSerie.valuacion = null
  newSerie.descripcion = ''
  formError.value = null
}

const submitSerieForm = async () => {
  try {
    loadingSubmit.value = true
    formError.value = null

    if (!newSerie.titulo.trim()) {
      throw new Error('El título es requerido')
    }

    if (!newSerie.director.trim()) {
      throw new Error('El director es requerido')
    }

    if (!newSerie.fecha) {
      throw new Error('La fecha es requerida')
    }

    const selectedDate = new Date(newSerie.fecha)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate > today) {
      throw new Error('La fecha no puede ser futura')
    }

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/carga-series`, {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: newSerie.titulo.trim(),
        director: newSerie.director.trim(),
        fecha: newSerie.fecha,
        valuacion: newSerie.valuacion,
        descripcion: newSerie.descripcion.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || data.error || 'Error al guardar la serie')
    }

    emit('success')
    resetForm()

  } catch (err) {
    formError.value = err.message
    console.error('Error al guardar serie:', err)
  } finally {
    loadingSubmit.value = false
  }
}
</script>