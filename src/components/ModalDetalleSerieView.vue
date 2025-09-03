<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

    <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Detalles de la Serie</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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

      <div v-else-if="serie" class="space-y-6">
        <!-- Portada y info básica -->
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Portada -->
          <div
            class="w-32 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>

          <!-- Información básica -->
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ serie.titulo }}</h3>
            <p class="text-lg text-gray-600 mb-4">creada por {{ serie.creador || 'Desconocido' }}</p>

            <!-- Valoración -->
            <div v-if="serie.valuacion" class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg v-for="star in 5" :key="star" class="w-5 h-5 fill-current"
                  :class="{ 'text-gray-300': star > serie.valuacion }" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">{{ serie.valuacion }}/5</span>
            </div>

            <!-- Fecha -->
            <div class="flex items-center text-sm text-gray-500 mb-2">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Vista el {{ formatDate(serie.fecha) }}
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div v-if="serie.descripcion" class="border-t pt-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">Descripción</h4>
          <p class="text-gray-600 leading-relaxed">{{ serie.descripcion }}</p>
        </div>

        <!-- Sin descripción -->
        <div v-else class="border-t pt-6 text-center text-gray-500">
          <p>No hay descripción disponible</p>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="border-t pt-6 flex justify-end space-x-3">
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
  <ModalConfirmacion v-if="showConfirmacionEliminar" titulo="Eliminar serie"
    mensaje="¿Estás seguro de que quieres eliminar esta serie? Esta acción no se puede deshacer."
    @confirmar="confirmarEliminacion" @cancelar="cancelarEliminacion" />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const props = defineProps({
  serieId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'editar-serie', 'serie-eliminada'])

const authStore = useAuthStore()
const serie = ref(null)
const loading = ref(false)
const loadingAction = ref(false)
const error = ref(null)
const showConfirmacionEliminar = ref(false)

const fetchSerieDetalles = async () => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/serie/${props.serieId}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cargar los detalles de la serie')
    }

    serie.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching series details:', err)
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

    const response = await fetch(`${API_BASE}/api/admin/user/serie/${props.serieId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al eliminar la serie')
    }

    await response.json()
    emit('serie-eliminada', props.serieId)
    emit('close')

  } catch (err) {
    error.value = err.message
    console.error('Error eliminando serie:', err)
  } finally {
    loadingAction.value = false
  }
}

const cancelarEliminacion = () => {
  showConfirmacionEliminacion.value = false
}

const abrirEdicion = () => {
  emit('editar-serie', serie.value)
  emit('close')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const closeModal = () => {
  emit('close')
}

onMounted(() => {
  fetchSerieDetalles()
})
</script>