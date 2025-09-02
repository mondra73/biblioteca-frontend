<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Editar Libro</h2>

      <form @submit.prevent="solicitarGuardado">
        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label for="edit-titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="libroEditado.titulo" type="text" id="edit-titulo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Autor -->
          <div>
            <label for="edit-autor" class="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
            <input v-model="libroEditado.autor" type="text" id="edit-autor" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Género -->
          <div>
            <label for="edit-genero" class="block text-sm font-medium text-gray-700 mb-1">Género</label>
            <input v-model="libroEditado.genero" type="text" id="edit-genero"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Fecha -->
          <div>
            <label for="edit-fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha de lectura *</label>
            <input v-model="libroEditado.fecha" type="date" id="edit-fecha" required :max="today"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Valoración -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valoración</label>
            <div class="flex space-x-1">
              <button v-for="rating in 5" :key="rating" type="button" @click="libroEditado.valuacion = rating"
                class="w-10 h-10 rounded-full border-2 transition-all duration-200" :class="{
                  'border-yellow-400 bg-yellow-100 text-yellow-600': rating <= libroEditado.valuacion,
                  'border-gray-300 text-gray-400 hover:border-yellow-400 hover:text-yellow-500': rating > libroEditado.valuacion
                }">
                {{ rating }}
              </button>
            </div>
            <div class="mt-1 text-sm text-gray-500">
              {{ libroEditado.valuacion ? `Seleccionado: ${libroEditado.valuacion} estrellas` : 'Sin valorar' }}
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="edit-descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea v-model="libroEditado.descripcion" id="edit-descripcion" rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"></textarea>
          </div>
        </div>

        <!-- Mensajes de error -->
        <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {{ error }}
        </div>

        <!-- Botones -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
            Cancelar
          </button>
          <button type="submit" :disabled="loading"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50">
            <span v-if="loading">Guardando...</span>
            <span v-else>Guardar Cambios</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de Confirmación para Guardar -->
  <ModalConfirmacion v-if="showConfirmacionGuardar" titulo="Guardar cambios"
    mensaje="¿Estás seguro de que quieres guardar los cambios realizados en este libro?" @confirmar="confirmarGuardado"
    @cancelar="cancelarGuardado" />

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  libro: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'libro-editado'])

const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)
const showConfirmacionGuardar = ref(false)

const libroEditado = reactive({
  titulo: props.libro.titulo,
  autor: props.libro.autor,
  genero: props.libro.genero || '',
  fecha: new Date(props.libro.fecha).toISOString().split('T')[0],
  valuacion: props.libro.valuacion || null,
  descripcion: props.libro.descripcion || ''
})

const today = new Date().toISOString().split('T')[0]

const validarFormulario = () => {
  if (!libroEditado.titulo.trim()) {
    error.value = 'El título es requerido'
    return false
  }
  if (!libroEditado.autor.trim()) {
    error.value = 'El autor es requerido'
    return false
  }
  if (!libroEditado.fecha) {
    error.value = 'La fecha es requerida'
    return false
  }

  // Validar fecha futura
  const selectedDate = new Date(libroEditado.fecha)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate > today) {
    error.value = 'La fecha no puede ser futura'
    return false
  }

  error.value = null
  return true
}

const solicitarGuardado = () => {
  if (validarFormulario()) {
    showConfirmacionGuardar.value = true
  }
}

const confirmarGuardado = async () => {
  showConfirmacionGuardar.value = false
  try {
    loading.value = true
    error.value = null

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/libro/${props.libro.id}`, {
      method: 'PUT',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(libroEditado)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al editar el libro')
    }

    emit('libro-editado')
    emit('close')

  } catch (err) {
    error.value = err.message
    console.error('Error editando libro:', err)
  } finally {
    loading.value = false
  }
}


const cancelarGuardado = () => {
  showConfirmacionGuardar.value = false
}

</script>
