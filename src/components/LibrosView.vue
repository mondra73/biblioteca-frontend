<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header (sin cambios) -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <a href="/dashboard" class="text-gray-600 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </a>
            <h1 class="text-2xl font-bold text-gray-900">Mis Libros</h1>
          </div>
          <button @click="showAddBookModal = true"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
            <span>Agregar Libro</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando libros...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Error al cargar libros</h3>
        <p class="mt-1 text-sm text-gray-500">{{ error }}</p>
        <div class="mt-6">
          <button @click="fetchBooks"
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
            <input v-model="searchQuery" type="text" placeholder="Buscar libros por título, autor, género..."
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
            <span v-if="pagination.totalLibros > 0"> - {{ pagination.totalLibros }} resultado(s) encontrado(s)</span>
          </div>
        </div>

        <!-- Mensaje de resultados de búsqueda -->
        <div v-if="isSearching && pagination.totalLibros === 0 && !loading"
          class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-blue-800">No se encontraron libros que coincidan con "{{ searchQuery }}"</p>
          <button @click="clearSearch" class="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver todos los libros
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Leídos</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalRead }}</p>
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

        <!-- Books Grid -->
        <div v-if="filteredBooks.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="book in filteredBooks" :key="book.id"
            class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            @click="openBookDetails(book)">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div
                  :class="`w-16 h-20 bg-gradient-to-br ${getBookGradient(book)} rounded-lg flex items-center justify-center`">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                </div>
                <div class="flex text-yellow-400" v-if="book.valuacion">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ book.valuacion }}</span>
                </div>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ book.titulo }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ book.autor }}</p>
              <p class="text-xs text-gray-500 mb-4">Leído el {{ formatDate(book.fecha) }}</p>
              <div class="flex items-center justify-between">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completado
                </span>
                <button @click="openBookMenu(book)" class="text-gray-400 hover:text-gray-600">
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
            </path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay libros</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primer libro leído.</p>
          <div class="mt-6">
            <button @click="showAddBookModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                </path>
              </svg>
              Agregar Libro
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

    <!-- Add Book Modal (simplified) -->
    <div v-if="showAddBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Agregar Nuevo Libro</h2>

        <!-- Formulario -->
        <form @submit.prevent="submitBookForm">
          <div class="space-y-4">
            <!-- Título -->
            <div>
              <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input v-model="newBook.titulo" type="text" id="titulo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Título del libro">
            </div>

            <!-- Autor -->
            <div>
              <label for="autor" class="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
              <input v-model="newBook.autor" type="text" id="autor" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Autor del libro">
            </div>

            <!-- Género -->
            <div>
              <label for="genero" class="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <input v-model="newBook.genero" type="text" id="genero"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Género literario">
            </div>

            <!-- Fecha -->
            <div>
              <label for="fecha" class="block text-sm font-medium text-gray-700 mb-1">Fecha de lectura *</label>
              <input v-model="newBook.fecha" type="date" id="fecha" required :max="today"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
            </div>

            <!-- Valoración -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Valoración</label>
              <div class="flex space-x-1">
                <button v-for="rating in 5" :key="rating" type="button" @click="newBook.valuacion = rating"
                  class="w-10 h-10 rounded-full border-2 transition-all duration-200" :class="{
                    'border-yellow-400 bg-yellow-100 text-yellow-600': rating <= newBook.valuacion,
                    'border-gray-300 text-gray-400 hover:border-yellow-400 hover:text-yellow-500': rating > newBook.valuacion
                  }">
                  {{ rating }}
                </button>
              </div>
              <div class="mt-1 text-sm text-gray-500">
                {{ newBook.valuacion ? `Seleccionado: ${newBook.valuacion} estrellas` : 'Sin valorar' }}
              </div>
            </div>

            <!-- Descripción -->
            <div>
              <label for="descripcion" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="newBook.descripcion" id="descripcion" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Reseña o comentarios sobre el libro..."></textarea>
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
    <ModalDetalleLibro v-if="selectedBookId" :libroId="selectedBookId" @close="selectedBookId = null"
      @editar-libro="abrirEdicion" @libro-eliminado="handleLibroEliminado" />

    <!-- Modal de Edición -->
    <ModalEditarLibro v-if="libroAEditar" :libro="libroAEditar" @close="libroAEditar = null"
      @libro-editado="handleLibroEditado" />

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
const showAddBookModal = ref(false)
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
const selectedBookId = ref(null)
const libroAEditar = ref(null)
const isSearching = ref(false)

// Datos de libros desde el backend
const books = ref([])

// Datos del nuevo libro
const newBook = reactive({
  titulo: '',
  autor: '',
  genero: '',
  fecha: '',
  valuacion: null,
  descripcion: ''
})

// Fecha actual para limitar el input de fecha
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Paginación
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalLibros: 0
})

// Estadísticas
const stats = reactive({
  totalRead: 0,
  thisMonth: 0,
  averageRating: 0
})

// Computed: Filtrar libros según búsqueda
const filteredBooks = computed(() => {
  return books.value
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

    const response = await fetch(`/api/admin/user/libro/buscar/${textoCodificado}?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Si no hay resultados, es normal, no es un error
      if (response.status === 404 && errorData.mensaje?.includes('No se encontraron')) {
        books.value = []
        pagination.totalLibros = 0
        pagination.totalPages = 0
        pagination.currentPage = 1
        calculateStats([])
        return
      }

      throw new Error(errorData.mensaje || errorData.error || 'Error en la búsqueda')
    }

    const data = await response.json()

    books.value = data.libros
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalLibros = data.totalLibros

    calculateStats(data.libros)

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

const fetchBooks = async (page = 1) => {
  try {
    loading.value = true
    error.value = null

    const token = authStore.token

    if (!token) {
      throw new Error('No hay token de autenticación disponible')
    }

    console.log('🔍 Fetch URL:', `/api/admin/user/libros?page=${page}`)
    console.log('🔍 Token:', token)

    const response = await fetch(`/api/admin/user/libros?page=${page}`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    console.log('🔍 Response status:', response.status)
    console.log('🔍 Response headers:', Object.fromEntries([...response.headers]))

    // Leer la respuesta como TEXTO primero para ver qué contiene
    const responseText = await response.text()
    console.log('🔍 Response text (primeros 200 caracteres):', responseText.substring(0, 200))

    // Verificar si es HTML (error)
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('❌ El backend devolvió HTML en lugar de JSON')
      throw new Error('Error del servidor: respuesta en formato incorrecto')
    }

    // Si no es HTML, intentar parsear como JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError)
      throw new Error('Respuesta del servidor en formato inválido')
    }

    if (!response.ok) {
      throw new Error(data.mensaje || data.error || `Error ${response.status}`)
    }

    // Si llegamos aquí, la respuesta es válida
    books.value = data.libros
    pagination.currentPage = data.currentPage
    pagination.totalPages = data.totalPages
    pagination.totalLibros = data.totalLibros

    calculateStats(data.libros)

  } catch (err) {
    error.value = err.message
    console.error('❌ Error fetching books:', err)

    // Verificar si es error de autenticación
    if (err.message.includes('token') || err.message.includes('401') || err.message.includes('403')) {
      authStore.logout()
    }
  } finally {
    loading.value = false
  }
}

const openBookDetails = (book) => {
  selectedBookId.value = book.id
}

const abrirEdicion = (libro) => {
  libroAEditar.value = libro
}

// Métodos para mostrar diferentes tipos de éxito
const mostrarExitoCreacion = () => {
  modalExitoConfig.value = {
    titulo: 'Libro agregado',
    mensaje: 'El libro se ha agregado exitosamente a tu biblioteca.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEdicion = () => {
  modalExitoConfig.value = {
    titulo: 'Libro actualizado',
    mensaje: 'El libro se ha editado exitosamente.'
  }
  showModalExitoView.value = true
}

const mostrarExitoEliminacion = () => {
  modalExitoConfig.value = {
    titulo: 'Libro eliminado',
    mensaje: 'El libro se ha eliminado correctamente.'
  }
  showModalExitoView.value = true
}

const handleLibroEditado = () => {
  fetchBooks(currentPage.value)
  libroAEditar.value = null
  mostrarExitoEdicion()
}

// En handleLibroEliminado:
const handleLibroEliminado = (libroId) => {
  fetchBooks(currentPage.value)
  selectedBookId.value = null
  mostrarExitoEliminacion() // ← Agregado
}

const calculateStats = (libros) => {
  // Total de libros leídos
  stats.totalRead = libros.length

  // Libros leídos este mes
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  stats.thisMonth = libros.filter(book => {
    const bookDate = new Date(book.fecha)
    return bookDate.getMonth() === currentMonth && bookDate.getFullYear() === currentYear
  }).length

  // Promedio de rating (solo libros con valoración)
  const librosConRating = libros.filter(book => book.valuacion !== null && book.valuacion !== undefined)
  if (librosConRating.length > 0) {
    const totalRating = librosConRating.reduce((sum, book) => sum + book.valuacion, 0)
    stats.averageRating = (totalRating / librosConRating.length).toFixed(1)
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

const getBookGradient = (book) => {
  // Asignar gradientes basados en el título o autor para consistencia
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-red-500 to-pink-600',
    'from-purple-500 to-indigo-600',
    'from-orange-500 to-red-600',
    'from-teal-500 to-cyan-600'
  ]

  // Crear un hash simple basado en el título para asignar colores consistentes
  let hash = 0
  for (let i = 0; i < book.titulo.length; i++) {
    hash = book.titulo.charCodeAt(i) + ((hash << 5) - hash)
  }

  return gradients[Math.abs(hash) % gradients.length]
}

const closeModal = () => {
  showAddBookModal.value = false
  resetForm()
}

const resetForm = () => {
  newBook.titulo = ''
  newBook.autor = ''
  newBook.genero = ''
  newBook.fecha = ''
  newBook.valuacion = null
  newBook.descripcion = ''
  formError.value = null
}

const submitBookForm = async () => {
  try {
    loadingSubmit.value = true
    formError.value = null

    // Validaciones básicas
    if (!newBook.titulo.trim()) {
      throw new Error('El título es requerido')
    }

    if (!newBook.autor.trim()) {
      throw new Error('El autor es requerido')
    }

    if (!newBook.fecha) {
      throw new Error('La fecha es requerida')
    }

    // Validar que la fecha no sea futura
    const selectedDate = new Date(newBook.fecha)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Resetear horas para comparar solo fechas

    if (selectedDate > today) {
      throw new Error('La fecha no puede ser futura')
    }

    const token = authStore.token

    const response = await fetch('/api/admin/user/carga-libros', {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: newBook.titulo.trim(),
        autor: newBook.autor.trim(),
        genero: newBook.genero.trim(),
        fecha: newBook.fecha,
        valuacion: newBook.valuacion,
        descripcion: newBook.descripcion.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.mensaje || data.error || 'Error al guardar el libro')
    }

    showAddBookModal.value = false
    resetForm()

    showModalExitoView.value = true
    showModalExitoView.value = true

    mostrarExitoCreacion()

    // Recargar la lista de libros
    fetchBooks(currentPage.value)

  } catch (err) {
    formError.value = err.message
    console.error('Error al guardar libro:', err)
  } finally {
    loadingSubmit.value = false
  }
}

const openBookMenu = (book) => {
  console.log('Abrir menú para:', book.titulo)
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
      fetchBooks(newPage)
    }
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  isSearching.value = false
  fetchBooks(1)
}

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isAuthenticated) {
    fetchBooks(1)
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
        // Si la búsqueda está vacía, cargar libros normales
        fetchBooks(1)
      } else {
        // Si hay texto, realizar búsqueda
        performSearch(newQuery.trim(), 1)
      }
    }
  }, 500)
})

</script>

<style scoped></style>
