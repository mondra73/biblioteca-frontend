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
            <h1 class="text-2xl font-bold text-gray-900">Mis Libros</h1>
          </div>
          <button 
            @click="showAddBookModal = true"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Agregar Libro</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar libros por nombre..." 
            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
          >
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
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
      <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="book in filteredBooks" 
          :key="book.id" 
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div :class="`w-16 h-20 bg-gradient-to-br ${book.gradient} rounded-lg flex items-center justify-center`">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="flex text-yellow-400">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm text-gray-600 ml-1">{{ book.rating }}</span>
              </div>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ book.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
            <p class="text-xs text-gray-500 mb-4">Leído el {{ book.readDate }}</p>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completado
              </span>
              <button 
                @click="openBookMenu(book)"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay libros</h3>
        <p class="mt-1 text-sm text-gray-500">Comienza agregando tu primer libro leído.</p>
        <div class="mt-6">
          <button 
            @click="showAddBookModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Agregar Libro
          </button>
        </div>
      </div>
    </main>

    <!-- Add Book Modal (simplified) -->
    <div v-if="showAddBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Agregar Nuevo Libro</h2>
        <!-- Formulario para agregar libro -->
        <div class="mt-4 flex justify-end space-x-3">
          <button 
            @click="showAddBookModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button 
            @click="addNewBook"
            class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Estado reactivo
const searchQuery = ref('')
const showAddBookModal = ref(false)

// Datos de libros
const books = ref([
  {
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    rating: 4.5,
    readDate: '15 Dic 2024',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    rating: 4.0,
    readDate: '28 Nov 2024',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 3,
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    rating: 3.8,
    readDate: '10 Nov 2024',
    gradient: 'from-red-500 to-pink-600'
  },
  {
    id: 4,
    title: 'Don Quijote',
    author: 'Miguel de Cervantes',
    rating: 4.7,
    readDate: '5 Oct 2024',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 5,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    rating: 4.3,
    readDate: '22 Sep 2024',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 6,
    title: 'La Casa de los Espíritus',
    author: 'Isabel Allende',
    rating: 4.1,
    readDate: '8 Ago 2024',
    gradient: 'from-teal-500 to-cyan-600'
  }
])

// Estadísticas
const stats = reactive({
  totalRead: 24,
  thisMonth: 3,
  averageRating: 4.2
})

// Computed: Filtrar libros según búsqueda
const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return books.value.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query)
  )
})

// Métodos
const openBookMenu = (book) => {
  console.log('Abrir menú para:', book.title)
  // Aquí podrías mostrar un menú contextual con opciones
}

const addNewBook = () => {
  // Lógica para agregar un nuevo libro
  console.log('Agregar nuevo libro')
  showAddBookModal.value = false
}
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>