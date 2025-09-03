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
            <h1 class="text-2xl font-bold text-gray-900">Mis Películas</h1>
          </div>
          <button @click="showAddMovieModal = true"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
            <span>Agregar Película</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando películas...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error al cargar películas</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <div class="mt-6">
          <button @click="fetchMovies"
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
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Buscar películas por título, director..."
              class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary">
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
            <span v-if="pagination.totalPeliculas > 0"> - {{ pagination.totalPeliculas }} resultado(s)
              encontrado(s)</span>
          </div>
        </div>

        <!-- Mensaje de resultados de búsqueda -->
        <div v-if="isSearching && pagination.totalPeliculas === 0 && !loading"
          class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800">No se encontraron películas que coincidan con "{{ searchQuery }}"</p>
          <button @click="clearSearch" class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todas las películas
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
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalWatched }}</p>
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
                <p class="text-2xl font-semibold text-gray-900">{{ stats.averageRating }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Movies Grid -->
        <div v-if="filteredMovies.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="movie in filteredMovies" :key="movie.id"
            class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            @click="openMovieDetails(movie)">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div
                  :class="`w-16 h-20 bg-gradient-to-br ${getMovieGradient(movie)} rounded-lg flex items-center justify-center`">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z" />
                  </svg>
                </div>
                <div class="flex text-yellow-400" v-if="movie.valuacion">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ movie.valuacion }}</span>
                </div>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ movie.titulo }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ movie.director }}</p>
              <p class="text-xs text-gray-500 mb-4">Vista el {{ formatDate(movie.fecha) }}</p>
              <div class="flex items-center justify-between">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completada
                </span>
                <button @click="openMovieMenu(movie)" class="text-gray-400 hover:text-gray-600">
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay películas</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primera película vista.</p>
          <div class="mt-6">
            <button @click="showAddMovieModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                </path>
              </svg>
              Agregar Película
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

    <!-- Add Movie Modal -->
    <ModalAgregarPelicula v-if="showAddMovieModal" @close="showAddMovieModal = false" @success="handlePeliculaAgregada" />

    <!-- Modal de Detalles -->
    <ModalDetallePelicula v-if="selectedMovieId" :peliculaId="selectedMovieId" @close="selectedMovieId = null"
      @editar-pelicula="abrirEdicion" @pelicula-eliminada="handlePeliculaEliminada" />

    <!-- Modal de Edición -->
    <ModalEditarPelicula v-if="peliculaAEditar" :pelicula="peliculaAEditar" @close="peliculaAEditar = null"
      @pelicula-editada="handlePeliculaEditada" />

    <!-- Modal de Exito -->
    <ModalExitoView v-if="showModalExitoView" :titulo="modalExitoConfig.titulo" :mensaje="modalExitoConfig.mensaje"
      @close="showModalExitoView = false" />

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'

// Estado reactivo
const searchQuery = ref('')
const showAddMovieModal = ref(false)
const showModalExitoView = ref(false)
const modalExitoConfig = ref({
  titulo: '',
  mensaje: ''
})
const loading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const authStore = useAuthStore()
const selectedMovieId = ref(null)
const peliculaAEditar = ref(null)
const isSearching = ref(false)

// Datos de películas desde el backend
const movies = ref([])

const handlePeliculaAgregada = () => {
  showAddMovieModal.value = false
  mostrarExitoCreacion()
  fetchMovies(currentPage.value)
}

// Paginación
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalPeliculas: 0
})

// Estadísticas
const stats = reactive({
  totalWatched: 0,
  thisMonth: 0,
  averageRating: 0
})

// Computed: Filtrar películas según búsqueda
const filteredMovies = computed(() => {
  return movies.value
})

let searchTimeout = null

// Métodos
const performSearch = async (texto, page = 1) => {
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

    const response = await fetch(`${API_BASE}/api/admin/user/pelicula/buscar/${textoCodificado}?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Si no hay resultados, es normal, no es un error
      if (response.status === 404 && errorData.mensaje?.includes('No se encontraron')) {
        movies.value = []
        pagination.totalPeliculas = 0
        pagination.totalPages = 0
        pagination.currentPage = 1
        calculateStats([])
        return
      }

      throw new Error(errorData.mensaje || errorData.error || 'Error en la búsqueda')
    }

    const data = await response.json()

    movies.value = data.peliculas
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalPeliculas = data.totalPeliculas

    calculateStats(data.peliculas)

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

const fetchMovies = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    // Usar la variable de entorno VITE_API_BASE
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/peliculas?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    })

    // Leer la respuesta como texto primero
    const responseText = await response.text()

    // Verificar si es HTML (error)
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('❌ El servidor devolvió HTML en lugar de JSON')
      throw new Error('Error del servidor: respuesta en formato incorrecto. Status: ' + response.status)
    }

    // Intentar parsear como JSON
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

    // Éxito - procesar datos
    movies.value = data.peliculas
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalPeliculas = data.totalPeliculas

    calculateStats(data.peliculas)

  } catch (err) {
    error.value = err.message
    console.error('❌ Error fetching movies:', err)

    // Manejar errores de autenticación
    if (err.message.includes('denegado') || err.message.includes('token') ||
      err.message.includes('401') || err.message.includes('403')) {
      authStore.logout()
      // Redirigir al login después de un breve delay
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    }
  } finally {
    loading.value = false
  }
}

const openMovieDetails = (movie) => {
  selectedMovieId.value = movie.id
}

const abrirEdicion = (pelicula) => {
  peliculaAEditar.value = pelicula
  selectedMovieId.value = null
}

// Métodos para mostrar diferentes tipos de éxito
const mostrarExitoCreacion = () => {
  modalExitoConfig.value = {
    titulo: 'Película agregada',
    mensaje: 'La película se ha agregado exitosamente a tu biblioteca.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEdicion = () => {
  modalExitoConfig.value = {
    titulo: 'Película actualizada',
    mensaje: 'La película se ha editado exitosamente.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEliminacion = () => {
  modalExitoConfig.value = {
    titulo: 'Película eliminada',
    mensaje: 'La película se ha eliminado correctamente.'
  }
  showModalExitoView.value = true
}

const handlePeliculaEditada = () => {
  fetchMovies(currentPage.value)
  peliculaAEditar.value = null
  mostrarExitoEdicion()
}

const handlePeliculaEliminada = (peliculaId) => {
  fetchMovies(currentPage.value)
  selectedMovieId.value = null
  mostrarExitoEliminacion()
}

const calculateStats = (peliculas) => {
  // Total de películas vistas
  stats.totalWatched = peliculas.length

  // Películas vistas este mes
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  stats.thisMonth = peliculas.filter(movie => {
    const movieDate = new Date(movie.fecha)
    return movieDate.getMonth() === currentMonth && movieDate.getFullYear() === currentYear
  }).length

  // Promedio de rating (solo películas con valoración)
  const peliculasConRating = peliculas.filter(movie => movie.valuacion !== null && movie.valuacion !== undefined)
  if (peliculasConRating.length > 0) {
    const totalRating = peliculasConRating.reduce((sum, movie) => sum + movie.valuacion, 0)
    stats.averageRating = (totalRating / peliculasConRating.length).toFixed(1)
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

const getMovieGradient = (movie) => {
  // Asignar gradientes basados en el título para consistencia
  const gradients = [
    'from-red-500 to-orange-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-pink-600',
    'from-indigo-500 to-purple-600',
    'from-yellow-500 to-red-600'
  ]

  // Crear un hash simple basado en el título para asignar colores consistentes
  let hash = 0
  for (let i = 0; i < movie.titulo.length; i++) {
    hash = movie.titulo.charCodeAt(i) + ((hash << 5) - hash)
  }

  return gradients[Math.abs(hash) % gradients.length]
}

const openMovieMenu = (movie) => {
  console.log('Abrir menú para:', movie.titulo)
  // Aquí podrías mostrar un menú contextual con opciones
}

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.totalPages) {
    currentPage.value = newPage

    if (isSearching.value && searchQuery.value.trim()) {
      // Si estamos en modo búsqueda, buscar en la página específica
      performSearch(searchQuery.value.trim(), newPage)
    } else {
      // Si no, cargar página normal
      fetchMovies(newPage)
    }
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  fetchMovies(1)
}

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isAuthenticated) {
    fetchMovies(1)
  } else {
    error.value = 'No estás autenticado. Por favor inicia sesión.'
  }
})

watch(searchQuery, (newQuery, oldQuery) => {
  // Esperar 500ms después de que el usuario deje de escribir
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (newQuery.trim() !== oldQuery.trim()) {
      if (newQuery.trim() === '') {
        // Si la búsqueda está vacía, cargar películas normales
        fetchMovies(1)
      } else {
        // Si hay texto, realizar búsqueda
        performSearch(newQuery.trim(), 1)
      }
    }
  }, 500)
})

</script>

<style scoped></style>