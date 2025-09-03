<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <a href="/dashboard" class="text-gray-600 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <h1 class="text-2xl font-bold text-gray-900">Mi Lista</h1>
          </div>
          <button @click="showAddModal = true"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Agregar a Lista</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando tu lista...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error al cargar tu lista</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <div class="mt-6">
          <button @click="fetchPendientes"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
            Reintentar
          </button>
        </div>
      </div>

      <!-- Content when loaded -->
      <div v-else>
        <!-- Stats y Filtros -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <!-- Total Pendientes -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Total Pendientes</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
                </div>
              </div>
            </div>

            <!-- Libros -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Libros</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.libros }}</p>
                </div>
              </div>
            </div>

            <!-- Series -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Series</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.series }}</p>
                </div>
              </div>
            </div>

            <!-- Películas -->
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-center">
                <div class="p-2 bg-red-100 rounded-lg">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Películas</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.peliculas }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Search y Filtros -->
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input v-model="searchTerm" type="text" placeholder="Buscar en mi lista..."
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary">
              <!-- Botón para limpiar búsqueda -->
              <div v-if="searchTerm" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button @click="clearSearch" class="text-gray-400 hover:text-gray-600" type="button">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
            <select v-model="selectedType"
              class="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
              <option value="">Todos los tipos</option>
              <option value="libro">Libros</option>
              <option value="serie">Series</option>
              <option value="pelicula">Películas</option>
            </select>
          </div>

          <!-- Indicador de búsqueda -->
          <div v-if="isSearching && searchTerm" class="mt-2 text-sm text-gray-500">
            Buscando: "{{ searchTerm }}"
            <span v-if="filteredItems.length > 0"> - {{ filteredItems.length }} resultado(s) encontrado(s)</span>
          </div>
        </div>

        <!-- Mensaje de resultados de búsqueda -->
        <div v-if="isSearching && filteredItems.length === 0 && !loading"
          class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800">No se encontraron items que coincidan con "{{ searchTerm }}"</p>
          <button @click="clearSearch" class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todos los items
          </button>
        </div>

        <!-- Lista Grid -->
        <div v-if="filteredItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Items de la lista -->
          <div v-for="item in filteredItems" :key="item.id" :data-tipo="item.tipo"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            :class="{ 'opacity-60': item.confirma }" @click="openItemDetails(item)">
            <div class="h-32 relative" :class="getGradientClass(item.tipo)">
              <div class="absolute top-4 left-4">
                <span class="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  {{ getTipoLabel(item.tipo) }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ item.titulo }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ getAutorDirectorLabel(item.tipo) }}: {{ item.autorDirector }}</p>
              <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ item.descripcion }}</p>
              <div class="flex items-center justify-between">
                <button @click.stop="mostrarConfirmacionCompletado(item)" :class="[
                  'text-sm font-medium flex items-center space-x-1',
                  item.confirma
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-green-600 hover:text-green-700'
                ]" :disabled="item.confirma">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ getCompletadoText(item.tipo, item.confirma) }}</span>
                </button>
                <div class="flex space-x-2">
                  <button @click.stop="editarItem(item)" class="text-blue-600 hover:text-blue-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click.stop="eliminarItem(item)" class="text-red-600 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay items en tu lista</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primer item a la lista.</p>
          <div class="mt-6">
            <button @click="showAddModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Agregar Item
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.totalPages > 1" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
              class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Anterior
            </button>

            <span class="text-sm text-gray-600">
              Página {{ pagination.currentPage }} de {{ pagination.totalPages }}
            </span>

            <button @click="changePage(pagination.currentPage + 1)"
              :disabled="pagination.currentPage === pagination.totalPages"
              class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Siguiente
            </button>
          </nav>
        </div>
      </div>
    </main>

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Agregar a Mi Lista</h2>

        <!-- Formulario -->
        <form @submit.prevent="submitItemForm">
          <div class="space-y-4">
            <!-- Título -->
            <div>
              <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input v-model="newItem.titulo" type="text" id="titulo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Título del item">
            </div>

            <!-- Tipo -->
            <div>
              <label for="tipo" class="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <select v-model="newItem.tipo" id="tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                <option value="">Seleccionar tipo</option>
                <option value="libro">Libro</option>
                <option value="serie">Serie</option>
                <option value="pelicula">Película</option>
              </select>
            </div>

            <!-- Autor/Director -->
            <div>
              <label for="autorDirector" class="block text-sm font-medium text-gray-700 mb-1">Autor/Director</label>
              <input v-model="newItem.autorDirector" type="text" id="autorDirector"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Nombre del autor o director">
            </div>

            <!-- Descripción -->
            <div>
              <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="newItem.descripcion" id="descripcion" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Descripción o comentarios..."></textarea>
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

    <!-- Modal de Detalles -->
    <ModalDetallePendienteView v-if="selectedPendienteId" :pendienteId="selectedPendienteId"
      @close="selectedPendienteId = null" @editar-pendiente="abrirEdicion"
      @pendiente-eliminado="handlePendienteEliminado" @marcar-como-completado="mostrarConfirmacionCompletado" />

    <!-- Modal de Edición -->
    <ModalEditarPendienteView v-if="pendienteAEditar" :pendiente="pendienteAEditar" @close="pendienteAEditar = null"
      @pendiente-editado="handlePendienteEditado" />

    <!-- Modal de Confirmación para Eliminar -->
    <ModalConfirmacion v-if="showConfirmacionEliminar" titulo="Eliminar item"
      :mensaje="itemAEliminar ? getMensajeEliminacion(itemAEliminar) : ''" @confirmar="confirmarEliminacion"
      @cancelar="cancelarEliminacion" />

    <!-- Modal de Confirmación para Completar -->
    <ModalConfirmacion v-if="showConfirmacionCompletado" :titulo="getTituloCompletado(itemAEliminar)"
      :mensaje="getMensajeCompletado(itemAEliminar)" @confirmar="confirmarMarcarCompletado"
      @cancelar="cancelarMarcarCompletado" />

    <!-- Modal de Exito -->
    <ModalExitoView v-if="showModalExitoView" :titulo="modalExitoConfig.titulo" :mensaje="modalExitoConfig.mensaje"
      @close="showModalExitoView = false" />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import ModalDetallePendienteView from '../components/ModalDetallePendienteView.vue'
import ModalEditarPendienteView from '../components/ModalEditarPendienteView.vue'
import ModalExitoView from '../components/ModalExitoView.vue'
import ModalConfirmacion from '../components/ModalConfirmacionView.vue'

// Estado reactivo
const searchTerm = ref('')
const selectedType = ref('')
const showAddModal = ref(false)
const showModalExitoView = ref(false)
const modalExitoConfig = ref({
  titulo: '',
  mensaje: ''
})
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const authStore = useAuthStore()
const loadingSubmit = ref(false)
const formError = ref(null)
const isSearching = ref(false)
const selectedPendienteId = ref(null)
const pendienteAEditar = ref(null)
const showConfirmacionEliminar = ref(false)
const itemAEliminar = ref(null)
const showConfirmacionCompletado = ref(false)
const loadingAction = ref(false)

// Datos de pendientes desde el backend
const pendientes = ref([])

// Datos del nuevo item
const newItem = reactive({
  titulo: '',
  tipo: '',
  autorDirector: '',
  descripcion: ''
})

// Paginación
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalPendientes: 0
})

// Estadísticas
const stats = computed(() => {
  const total = pendientes.value.length
  const libros = pendientes.value.filter(item => item.tipo === 'libro').length
  const series = pendientes.value.filter(item => item.tipo === 'serie').length
  const peliculas = pendientes.value.filter(item => item.tipo === 'pelicula').length

  return { total, libros, series, peliculas }
})

// Items filtrados
const filteredItems = computed(() => {
  return pendientes.value.filter(item => {
    const matchesSearch = item.titulo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.autorDirector.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (item.descripcion && item.descripcion.toLowerCase().includes(searchTerm.value.toLowerCase()))
    const matchesType = selectedType.value === '' || item.tipo === selectedType.value
    return matchesSearch && matchesType
  })
})

let searchTimeout = null

// Métodos
const fetchPendientes = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pendientes?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.mensaje || errorData.error || `Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    pendientes.value = data.pendientes
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalPendientes = data.totalPendientes

  } catch (err) {
    error.value = err.message
    console.error('Error fetching pendientes:', err)

    // Manejar errores de autenticación
    if (err.message.includes('denegado') || err.message.includes('token') ||
      err.message.includes('401') || err.message.includes('403')) {
      authStore.logout()
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    }
  } finally {
    loading.value = false
  }
}

const performSearch = async (texto) => {
  try {
    loading.value = true
    isSearching.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    // Reemplazar espacios con guiones bajos para la URL
    const textoCodificado = texto.replace(/ /g, '_')
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pendiente/buscar/${textoCodificado}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Si no hay resultados, es normal, no es un error
      if (response.status === 404 && errorData.message?.includes('No se encontraron')) {
        pendientes.value = []
        return
      }

      throw new Error(errorData.mensaje || errorData.error || 'Error en la búsqueda')
    }

    const data = await response.json()
    pendientes.value = data

  } catch (err) {
    // No mostrar error si es que no hay resultados
    if (!err.message.includes('No se encontraron')) {
      error.value = err.message
    }
    console.error('Error en búsqueda:', err)
  } finally {
    loading.value = false
  }
}

// Funciones auxiliares
const getGradientClass = (tipo) => {
  const gradients = {
    libro: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    serie: 'bg-gradient-to-r from-purple-500 to-pink-600',
    pelicula: 'bg-gradient-to-r from-red-500 to-orange-600'
  }
  return gradients[tipo] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

const getTipoLabel = (tipo) => {
  const labels = {
    libro: 'Libro',
    serie: 'Serie',
    pelicula: 'Película'
  }
  return labels[tipo] || 'Item'
}

const getAutorDirectorLabel = (tipo) => {
  return tipo === 'libro' ? 'Autor' : 'Director'
}

const getCompletadoText = (tipo, completado) => {
  if (completado) return 'Completado'

  const textos = {
    libro: 'Marcar como leído',
    serie: 'Marcar como vista',
    pelicula: 'Marcar como vista'
  }
  return textos[tipo] || 'Marcar como completado'
}

// Métodos para mostrar diferentes tipos de éxito
const mostrarExitoCreacion = () => {
  modalExitoConfig.value = {
    titulo: 'Item agregado',
    mensaje: 'El item se ha agregado exitosamente a tu lista.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEliminacion = () => {
  modalExitoConfig.value = {
    titulo: 'Item eliminado',
    mensaje: 'El item se ha eliminado correctamente de tu lista.'
  }
  showModalExitoView.value = true
}

const mostrarExitoCompletado = () => {
  modalExitoConfig.value = {
    titulo: 'Item completado',
    mensaje: 'El item se ha marcado como completado.'
  }
  showModalExitoView.value = true
}

// Funciones de acciones
const openItemDetails = (item) => {
  selectedPendienteId.value = item._id || item.id
}

const abrirEdicion = (pendiente) => {
  pendienteAEditar.value = pendiente
}

const handlePendienteEditado = () => {
  fetchPendientes(currentPage.value)
  pendienteAEditar.value = null
  mostrarExitoCreacion()
}

const handlePendienteEliminado = () => {
  fetchPendientes(currentPage.value)
  selectedPendienteId.value = null
  mostrarExitoEliminacion()
}

const confirmarMarcarCompletado = async () => {
  try {
    loadingAction.value = true
    await moverPendienteACompletado(itemAEliminar.value)

    // ✅ FORZAR ACTUALIZACIÓN DE LA LISTA (importante!)
    await fetchPendientes(currentPage.value)

  } catch (err) {
    console.error('Error en confirmarMarcarCompletado:', err)
    error.value = err.message

    // ✅ Si falla, igual refrescar la lista por si acaso
    await fetchPendientes(currentPage.value)

  } finally {
    loadingAction.value = false
    showConfirmacionCompletado.value = false
    itemAEliminar.value = null
  }
}

const cancelarMarcarCompletado = () => {
  showConfirmacionCompletado.value = false
  itemAEliminar.value = null
}

const eliminarItem = (item) => {
  itemAEliminar.value = item
  showConfirmacionEliminar.value = true
}

const confirmarEliminacion = async () => {
  try {
    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/pendiente/${itemAEliminar.value.id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.mensaje || errorData.error || 'Error al eliminar el item')
    }

    // Eliminar del estado local
    await fetchPendientes(currentPage.value)
    mostrarExitoEliminacion()

  } catch (err) {
    console.error('Error al eliminar item:', err)
    error.value = err.message
  } finally {
    showConfirmacionEliminar.value = false
    itemAEliminar.value = null
  }
}

const cancelarEliminacion = () => {
  showConfirmacionEliminar.value = false
  itemAEliminar.value = null
}

const getMensajeEliminacion = (item) => {
  const tipos = {
    libro: 'libro',
    serie: 'serie',
    pelicula: 'película'
  }
  return `¿Estás seguro de que quieres eliminar este ${tipos[item.tipo] || 'item'} de tu lista?`
}

const closeModal = () => {
  showAddModal.value = false
  resetForm()
}

const mostrarConfirmacionCompletado = (item) => {

  // ✅ Normalizar también por si acaso
  const itemNormalizado = {
    ...item,
    id: item.id || item._id
  }

  if (itemNormalizado.confirma) return
  itemAEliminar.value = itemNormalizado
  showConfirmacionCompletado.value = true

  // Cerrar modal de detalles si está abierto
  if (selectedPendienteId.value) {
    selectedPendienteId.value = null
  }
}

const resetForm = () => {
  newItem.titulo = ''
  newItem.tipo = ''
  newItem.autorDirector = ''
  newItem.descripcion = ''
  formError.value = null
}

const moverPendienteACompletado = async (item) => {
  try {
    const itemId = item.id || item._id
    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    let endpoint = ''
    let payload = {
      fecha: new Date().toISOString().split('T')[0],
      titulo: item.titulo,
      descripcion: item.descripcion || '',
      valuacion: null
    }

    if (item.tipo === 'libro') {
      endpoint = '/carga-libros'  // ← MANTENER así
      payload.autor = item.autorDirector || ''
      payload.genero = ''
    } else if (item.tipo === 'pelicula') {
      endpoint = '/carga-peliculas'  // ← MANTENER así
      payload.director = item.autorDirector || ''
    } else if (item.tipo === 'serie') {
      endpoint = '/carga-series'  // ← MANTENER así
      payload.director = item.autorDirector || ''
    }

    // ✅ SOLO CAMBIAR ESTA LÍNEA - usar el mismo patrón que funciona
    const responseCarga = await fetch(`${API_BASE}/api/admin/user${endpoint}`, {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const cargaData = await responseCarga.json()

    if (!responseCarga.ok) {
      throw new Error(cargaData.mensaje || cargaData.error || 'Error al mover el item')
    }

    // 2. ✅ INTENTAR eliminar de pendientes, pero si falla no es crítico
    try {
      const responseEliminar = await fetch(`${API_BASE}/api/admin/user/pendiente/${itemId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      })

      if (!responseEliminar.ok) {
        const eliminarData = await responseEliminar.json().catch(() => ({}))
        console.warn('⚠️ El pendiente ya no existe:', eliminarData)
      }
    } catch (eliminarError) {
      console.warn('⚠️ Error no crítico al eliminar pendiente:', eliminarError)
    }

    // 3. Actualizar la lista local
    pendientes.value = pendientes.value.filter(i => (i.id || i._id) !== itemId)
    mostrarExitoCompletado()

  } catch (err) {
    console.error('Error completo al mover pendiente:', err)
    error.value = err.message
    throw err
  }
}

const submitItemForm = async () => {
  try {
    loadingSubmit.value = true
    formError.value = null

    // Validaciones básicas
    if (!newItem.titulo.trim()) {
      throw new Error('El título es requerido')
    }

    if (!newItem.tipo) {
      throw new Error('El tipo es requerido')
    }

    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/carga-pendientes`, {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: newItem.titulo.trim(),
        tipo: newItem.tipo,
        autorDirector: newItem.autorDirector.trim(),
        descripcion: newItem.descripcion.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || data.error || 'Error al guardar el item')
    }

    showAddModal.value = false
    resetForm()

    mostrarExitoCreacion()

    // Recargar la lista de pendientes
    fetchPendientes(currentPage.value)

  } catch (err) {
    formError.value = err.message
    console.error('Error al guardar item:', err)
  } finally {
    loadingSubmit.value = false
  }
}

const getTituloCompletado = (item) => {
  if (!item) return 'Marcar como completado'

  const acciones = {
    libro: 'Marcar como leído',
    pelicula: 'Marcar como vista',
    serie: 'Marcar como vista'
  }
  return acciones[item.tipo] || 'Marcar como completado'
}

const getMensajeCompletado = (item) => {
  if (!item) return '¿Estás seguro de que quieres marcar este item como completado?'

  const tipos = {
    libro: 'libro',
    pelicula: 'película',
    serie: 'serie'
  }
  return `¿Estás seguro de que quieres marcar este ${tipos[item.tipo] || 'item'} como ${item.tipo === 'libro' ? 'leído' : 'visto'}? Se moverá a tu biblioteca.`
}

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.totalPages) {
    currentPage.value = newPage

    if (isSearching.value && searchTerm.value.trim()) {
      // Si estamos en modo búsqueda, buscar en la página específica
      performSearch(searchTerm.value.trim(), newPage)
    } else {
      // Si no, cargar página normal
      fetchPendientes(newPage)
    }
  }
}

const clearSearch = () => {
  searchTerm.value = ''
  selectedType.value = ''
  isSearching.value = false
  fetchPendientes(1)
}

const editarItem = (item) => {
  pendienteAEditar.value = item
}

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isAuthenticated) {
    fetchPendientes(1)
  } else {
    error.value = 'No estás autenticado. Por favor inicia sesión.'
  }
})

watch(searchTerm, (newQuery, oldQuery) => {
  // Esperar 500ms después de que el usuario deje de escribir
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (newQuery.trim() !== oldQuery.trim()) {
      if (newQuery.trim() === '') {
        // Si la búsqueda está vacía, cargar pendientes normales
        fetchPendientes(1)
        isSearching.value = false
      } else {
        // Si hay texto, realizar búsqueda
        performSearch(newQuery.trim(), 1)
      }
    }
  }, 500)
})

watch(selectedType, () => {
  // Cuando cambia el tipo, no necesitamos hacer una nueva petición al servidor
  // ya que el filtrado se hace localmente con computed properties
})

</script>

<style scoped></style>
