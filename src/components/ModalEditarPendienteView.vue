<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Editar Pendiente</h2>

      <form @submit.prevent="solicitarGuardado">
        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label for="edit-titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="pendienteEditado.titulo" type="text" id="edit-titulo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Autor/Director -->
          <div>
            <label for="edit-autorDirector" class="block text-sm font-medium text-gray-700 mb-1">Autor/Director
              *</label>
            <input v-model="pendienteEditado.autorDirector" type="text" id="edit-autorDirector" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          </div>

          <!-- Tipo -->
          <div>
            <label for="edit-tipo" class="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <select v-model="pendienteEditado.tipo" id="edit-tipo" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
              <option value="">Selecciona un tipo</option>
              <option value="libro">Libro</option>
              <option value="pelicula">Película</option>
              <option value="serie">Serie</option>
            </select>
          </div>

          <!-- Descripción -->
          <div>
            <label for="edit-descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea v-model="pendienteEditado.descripcion" id="edit-descripcion" rows="3"
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
    mensaje="¿Estás seguro de que quieres guardar los cambios realizados en este pendiente?"
    @confirmar="confirmarGuardado" @cancelar="cancelarGuardado" />

</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  pendiente: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'pendiente-editado'])

const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)
const showConfirmacionGuardar = ref(false)

const pendienteEditado = reactive({
  titulo: props.pendiente.titulo || '',
  autorDirector: props.pendiente.autorDirector || '',
  tipo: normalizeTipo(props.pendiente.tipo) || '', // ← Normalizar al cargar
  descripcion: props.pendiente.descripcion || ''
})

const normalizeTipo = (tipo) => {
  if (!tipo) return ''

  const normalized = tipo.toLowerCase()
  // Mapear variaciones a los valores esperados por el select
  if (normalized === 'pelicula' || normalized === 'película') {
    return 'pelicula'
  }
  return normalized
}

const validarFormulario = () => {
  if (!pendienteEditado.titulo.trim()) {
    error.value = 'El título es requerido'
    return false
  }
  if (!pendienteEditado.autorDirector.trim()) {
    error.value = 'El autor/director es requerido'
    return false
  }
  if (!pendienteEditado.tipo) {
    error.value = 'El tipo es requerido'
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

    // ✅ Asegurar que el tipo esté normalizado antes de enviar
    const tipoNormalizado = normalizeTipo(pendienteEditado.tipo)

    const response = await fetch(`${API_BASE}/api/admin/user/pendiente/${props.pendiente._id}`, {
      method: 'PUT',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: pendienteEditado.titulo,
        autorDirector: pendienteEditado.autorDirector,
        tipo: tipoNormalizado, // ← Usar el tipo normalizado
        descripcion: pendienteEditado.descripcion
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al editar el pendiente')
    }

    emit('pendiente-editado')
    emit('close')

  } catch (err) {
    error.value = err.message
    console.error('Error editando pendiente:', err)
  } finally {
    loading.value = false
  }
}

const cancelarGuardado = () => {
  showConfirmacionGuardar.value = false
}
</script>
