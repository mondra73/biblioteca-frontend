<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Detalles</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando detalles...</p>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error al cargar detalles</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
      </div>

      <div v-else-if="pendiente" class="space-y-6">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Portada con color según tipo -->
          <div class="w-32 h-40 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="getPortadaClass(pendiente.tipo)">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="pendiente.tipo === 'libro'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
              </path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z">
              </path>
            </svg>
          </div>

          <!-- Información básica -->
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ pendiente.titulo }}</h3>

            <!-- Autor/Director según tipo -->
            <p class="text-lg text-gray-600 mb-4">
              {{ getAutorDirectorLabel(pendiente.tipo) }}:
              {{ pendiente.autorDirector || 'No especificado' }}
            </p>

            <!-- Tipo -->
            <div class="flex items-center mb-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Tipo: {{ getTipoLabel(pendiente.tipo) }}
              </span>
            </div>

            <!-- Estado -->
            <div class="flex items-center mb-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="pendiente.confirma ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ pendiente.confirma ? 'Completado' : 'Pendiente' }}
              </span>
            </div>

            <!-- Fecha de agregado -->
            <div class="flex items-center text-sm text-gray-500 mb-2">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Agregado el {{ formatDate(pendiente.fecha_agregado) }}
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div v-if="pendiente.descripcion" class="border-t pt-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">Descripción</h4>
          <p class="text-gray-600 leading-relaxed">{{ pendiente.descripcion }}</p>
        </div>

        <!-- Sin descripción -->
        <div v-else class="border-t pt-6 text-center text-gray-500">
          <p>No hay descripción disponible</p>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="border-t pt-6 flex justify-end space-x-3">
        <button @click="marcarComoCompletado" :disabled="loadingAction || pendiente?.confirma"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
          <span v-if="loadingAction">Procesando...</span>
          <span v-else>{{ pendiente?.confirma ? 'Ya completado' : 'Marcar como completado' }}</span>
        </button>

        <button @click="solicitarEliminacion" :disabled="loadingAction"
          class="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50">
          <span v-if="loadingAction">Eliminando...</span>
          <span v-else>Eliminar</span>
        </button>

        <button @click="abrirEdicion" :disabled="loadingAction"
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50">
          Editar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de Confirmación para Eliminar -->
  <ModalConfirmacion v-if="showConfirmacionEliminar" titulo="Eliminar item"
    mensaje="¿Estás seguro de que quieres eliminar este item de tu lista?" @confirmar="confirmarEliminacion"
    @cancelar="cancelarEliminacion" />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  pendienteId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'editar-pendiente', 'pendiente-eliminado', 'marcar-como-completado'])

const authStore = useAuthStore()
const pendiente = ref(null)
const loading = ref(false)
const loadingAction = ref(false)
const error = ref(null)
const showConfirmacionEliminar = ref(false)

const getPortadaClass = (tipo) => {
  const normalizedTipo = tipo ? tipo.toLowerCase() : ''

  const classes = {
    libro: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    serie: 'bg-gradient-to-br from-purple-500 to-pink-600',
    pelicula: 'bg-gradient-to-br from-red-500 to-orange-600',
    película: 'bg-gradient-to-br from-red-500 to-orange-600'
  }
  return classes[normalizedTipo] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

const getAutorDirectorLabel = (tipo) => {
  const normalizedTipo = tipo ? tipo.toLowerCase() : ''

  if (normalizedTipo === 'libro') return 'Autor'
  if (normalizedTipo === 'pelicula' || normalizedTipo === 'película') return 'Director'
  if (normalizedTipo === 'serie') return 'Director'
  return 'Autor/Director' // ← Valor por defecto
}

const getTipoLabel = (tipo) => {
  const normalizedTipo = tipo ? tipo.toLowerCase() : ''

  const labels = {
    libro: 'Libro',
    serie: 'Serie',
    pelicula: 'Película',
    película: 'Película'
  }
  return labels[normalizedTipo] || 'Item'
}

const fetchPendienteDetalles = async () => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pendiente/${props.pendienteId}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cargar los detalles del item')
    }

    pendiente.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching item details:', err)
  } finally {
    loading.value = false
  }
}

const solicitarEliminacion = () => {
  showConfirmacionEliminar.value = true
}

const confirmarEliminacion = async () => {
  showConfirmacionEliminar.value = false
  try {
    loadingAction.value = true
    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pendiente/${props.pendienteId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al eliminar el item')
    }

    await response.json()
    emit('pendiente-eliminado', props.pendienteId)
    emit('close')

  } catch (err) {
    error.value = err.message
    console.error('Error eliminando item:', err)
  } finally {
    loadingAction.value = false
  }
}

const cancelarEliminacion = () => {
  showConfirmacionEliminar.value = false
}

const marcarComoCompletado = () => {
  if (!pendiente.value?.confirma) {
    const pendienteNormalizado = {
      ...pendiente.value,
      id: pendiente.value.id || pendiente.value._id,
      tipo: pendiente.value.tipo ? pendiente.value.tipo.toLowerCase() : pendiente.value.tipo
    }
    emit('marcar-como-completado', pendienteNormalizado)
  }
}

const abrirEdicion = () => {
  emit('editar-pendiente', pendiente.value)
  emit('close')
}

const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchPendienteDetalles()
})
</script>
