<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <a href="/dashboard" class="text-gray-600 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </a>
            <h1 class="text-2xl font-bold text-gray-900">Mis Series</h1>
          </div>
          <button @click="showAddSerieModal = true"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
            <span>Agregar Serie</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando series...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error al cargar series</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <div class="mt-6">
          <button @click="fetchSeries"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
            Reintentar
          </button>
        </div>
      </div>

      <!-- Content when loaded -->
      <div v-else>
        <!-- Search Bar -->
        <div class="mb-8">
          <div class="relative max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
  <button type="button" @click="submitSearch" class="text-gray-400 hover:text-primary">
    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </button>
</div>

            <input
  v-model="searchQuery"
  @keyup.enter="submitSearch"
  type="text"
  placeholder="Buscar series por título, director..."
  class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
/>

            <!-- Botón para limpiar búsqueda -->
            <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button @click="clearSearch" class="text-gray-400 hover:text-gray-600" type="button">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Indicador de búsqueda -->
          <div v-if="isSearching && searchQuery" class="mt-2 text-sm text-gray-500">
            Buscando: "{{ searchQuery }}"
            <span v-if="pagination.totalSeries > 0"> - {{ pagination.totalSeries }} resultado(s)
              encontrado(s)</span>
          </div>
        </div>

        <!-- Mensaje de resultados de búsqueda -->
        <div v-if="isSearching && pagination.totalSeries === 0 && !loading"
          class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800">No se encontraron series que coincidan con "{{ searchQuery }}"</p>
          <button @click="clearSearch" class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todas las series
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6 border">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Vistas</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalRealSeries || stats.totalWatched }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadowSm p-6 border">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Este Mes</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.thisMonth }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6 border">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                    </path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Promedio Rating</p>
                <!-- Mostrar el promedio real si está disponible, si no el calculado -->
                <p class="text-2xl font-semibold text-gray-900">
                  {{ stats.averageRatingReal !== null ? stats.averageRatingReal : stats.averageRating }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Series Grid -->
        <div v-if="filteredSeries.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="serie in filteredSeries" :key="serie.id"
            class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            @click="openSerieDetails(serie)">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div
                  :class="`w-16 h-20 bg-gradient-to-br ${getSerieGradient(serie)} rounded-lg flex items-center justify-center`">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
                  </svg>
                </div>
                <div class="flex text-yellow-400" v-if="serie.valuacion">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ serie.valuacion }}</span>
                </div>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ serie.titulo }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ serie.director }}</p>
              <p class="text-xs text-gray-500 mb-4">Vista el {{ formatDate(serie.fecha) }}</p>
              <div class="flex items-center justify-between">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completada
                </span>
                <button @click="openSerieMenu(serie)" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay series</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primera serie vista.</p>
          <div class="mt-6">
            <button @click="showAddSerieModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                </path>
              </svg>
              Agregar Serie
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

    <!-- Add Serie Modal -->
    <ModalAgregarSerie v-if="showAddSerieModal" :show-modal="showAddSerieModal" @close="showAddSerieModal = false"
      @success="handleSerieAgregada" />

    <!-- Modal de Detalles -->
    <ModalDetalleSerie v-if="selectedSerieId" :serieId="selectedSerieId" @close="selectedSerieId = null"
      @editar-serie="abrirEdicion" @serie-eliminada="handleSerieEliminada" />

    <!-- Modal de Edición -->
    <ModalEditarSerie v-if="serieAEditar" :serie="serieAEditar" @close="serieAEditar = null"
      @serie-editada="handleSerieEditada" />

    <!-- Modal de Exito -->
    <ModalExitoView v-if="showModalExitoView" :titulo="modalExitoConfig.titulo" :mensaje="modalExitoConfig.mensaje"
      @close="showModalExitoView = false" />

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const searchQuery = ref('')
const showAddSerieModal = ref(false)
const showModalExitoView = ref(false)
const modalExitoConfig = ref({
  titulo: '',
  mensaje: ''
})
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const authStore = useAuthStore()
const selectedSerieId = ref(null)
const serieAEditar = ref(null)
const isSearching = ref(false)

const series = ref([])

const getUserIdFromToken = () => {
  try {
    const token = authStore.token
    if (!token) {
      throw new Error('No hay token disponible')
    }

    const payloadBase64 = token.split('.')[1]
    if (!payloadBase64) {
      throw new Error('Token con formato inválido')
    }

    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
    const payload = JSON.parse(payloadJson)

    if (!payload.id) {
      throw new Error('Token no contiene ID de usuario')
    }

    return payload.id
  } catch (err) {
    console.error('Error decodificando token:', err)
    throw new Error('No se pudo obtener el ID del usuario desde el token')
  }
}

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalSeries: 0
})

const stats = reactive({
  totalWatched: 0,
  thisMonth: 0,
  averageRating: '0.0',
  averageRatingReal: null,
  totalRealSeries: 0
})

const filteredSeries = computed(() => {
  return series.value
})


const fetchRealStats = async () => {
  try {
    const token = authStore.token

    if (!token) {
      return
    }

    const userId = getUserIdFromToken()

    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/estadisticas-series/${userId}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas reales')
    }

    const data = await response.json()

    stats.totalRealSeries = data.totalSeries
    stats.averageRatingReal = data.promedioRating || null

  } catch (err) {
    console.error('Error fetching real stats:', err)
  }
}

const performSearch = async (texto, page = 1) => {
  try {
    loading.value = true
    isSearching.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    const textoCodificado = texto.replace(/ /g, '_')
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/serie/buscar/${textoCodificado}?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (response.status === 404 && errorData.mensaje?.includes('No se encontraron')) {
        series.value = []
        pagination.totalSeries = 0
        pagination.totalPages = 0
        pagination.currentPage = 1
        calculateStats([])
        return
      }

      throw new Error(errorData.mensaje || errorData.error || 'Error en la búsqueda')
    }

    const data = await response.json()

    series.value = data.series
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalSeries = data.totalSeries

    calculateStats(data.series)

  } catch (err) {
    if (!err.message.includes('No se encontraron')) {
      error.value = err.message
    }
    console.error('Error en búsqueda:', err)
  } finally {
    loading.value = false
  }
}

const submitSearch = () => {
  const query = searchQuery.value.trim()

  if (!query) {
    isSearching.value = false
    fetchSeries(1)
    return
  }

  performSearch(query, 1)
}


const fetchSeries = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/series?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    })

    const responseText = await response.text()

    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('❌ El servidor devolvió HTML en lugar de JSON')
      throw new Error('Error del servidor: respuesta en formato incorrecto. Status: ' + response.status)
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError)
      throw new Error('Respuesta del servidor en formato inválido: ' + responseText.substring(0, 100))
    }

    if (!response.ok) {
      throw new Error(data.error || data.mensaje || `Error ${response.status}: ${response.statusText}`)
    }

    series.value = data.series
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalSeries = data.totalSeries

    calculateStats(data.series)

    await fetchRealStats()

  } catch (err) {
    error.value = err.message
    console.error('❌ Error fetching series:', err)

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

const openSerieDetails = (serie) => {
  selectedSerieId.value = serie.id
}

const abrirEdicion = (serie) => {
  serieAEditar.value = serie
  selectedSerieId.value = null
}

const mostrarExitoCreacion = () => {
  modalExitoConfig.value = {
    titulo: 'Serie agregada',
    mensaje: 'La serie se ha agregado exitosamente a tu biblioteca.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEdicion = () => {
  modalExitoConfig.value = {
    titulo: 'Serie actualizada',
    mensaje: 'La serie se ha editado exitosamente.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEliminacion = () => {
  modalExitoConfig.value = {
    titulo: 'Serie eliminada',
    mensaje: 'La serie se ha eliminado correctamente.'
  }
  showModalExitoView.value = true
}

const handleSerieEditada = () => {
  fetchSeries(currentPage.value)
  serieAEditar.value = null
  mostrarExitoEdicion()
  fetchRealStats()
}

const handleSerieEliminada = () => {
  fetchSeries(currentPage.value)
  selectedSerieId.value = null
  mostrarExitoEliminacion()
  fetchRealStats()
}


const calculateStats = (series) => {
  stats.totalWatched = series.length

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  stats.thisMonth = series.filter(serie => {
    const serieDate = new Date(serie.fecha)
    return serieDate.getMonth() === currentMonth && serieDate.getFullYear() === currentYear
  }).length

  const seriesConRating = series.filter(serie => serie.valuacion !== null && serie.valuacion !== undefined)
  if (seriesConRating.length > 0) {
    const totalRating = seriesConRating.reduce((sum, serie) => sum + serie.valuacion, 0)
    stats.averageRating = (totalRating / seriesConRating.length).toFixed(1)
  } else {
    stats.averageRating = '0.0'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getSerieGradient = (serie) => {
  const gradients = [
    'from-red-500 to-orange-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-pink-600',
    'from-indigo-500 to-purple-600',
    'from-yellow-500 to-red-600'
  ]

  let hash = 0
  for (let i = 0; i < serie.titulo.length; i++) {
    hash = serie.titulo.charCodeAt(i) + ((hash << 5) - hash)
  }

  return gradients[Math.abs(hash) % gradients.length]
}

const openSerieMenu = (serie) => {
  console.log('Abrir menú para:', serie.titulo)
}

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.totalPages) {
    currentPage.value = newPage

    if (isSearching.value && searchQuery.value.trim()) {
      performSearch(searchQuery.value.trim(), newPage)
    } else {
      fetchSeries(newPage)
    }
  }
}

const handleSerieAgregada = () => {
  showAddSerieModal.value = false
  mostrarExitoCreacion()
  fetchSeries(currentPage.value)
  fetchRealStats()
}

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  fetchSeries(1)
}

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isAuthenticated) {
    fetchSeries(1)
  } else {
    error.value = 'No estás autenticado. Por favor inicia sesión.'
  }
})


</script>

<style scoped>
.dashboard-container {
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>
