<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <a href="/dashboard" class="text-gray-600 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </a>
            <h1 class="text-2xl font-bold text-gray-900">Mis Películas</h1>
          </div>
          <button 
            @click="openAddMovieModal"
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Agregar Película</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats y Search -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <!-- Tarjeta de Total Películas -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Películas</p>
                <p class="text-2xl font-bold text-gray-900">{{ movies.length }}</p>
              </div>
            </div>
          </div>
          
          <!-- Tarjeta de Este Mes -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Este Mes</p>
                <p class="text-2xl font-bold text-gray-900">{{ moviesThisMonth }}</p>
              </div>
            </div>
          </div>
          
          <!-- Tarjeta de Favoritas -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Favoritas</p>
                <p class="text-2xl font-bold text-gray-900">{{ favoriteMovies }}</p>
              </div>
            </div>
          </div>
          
          <!-- Tarjeta de Horas Vistas -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Horas Vistas</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalHoursWatched }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input 
            v-model="searchTerm"
            type="text" 
            placeholder="Buscar películas por título..." 
            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
          >
        </div>
      </div>

      <!-- Películas Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Película Card -->
        <div 
          v-for="movie in filteredMovies" 
          :key="movie.id" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div :class="`h-32 bg-gradient-to-r ${movie.gradient}`"></div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ movie.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">Director: {{ movie.director }}</p>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ movie.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">Visto: {{ movie.watchedDate }}</span>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ movie.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal para agregar película (puedes implementarlo después) -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Datos de las películas
const movies = ref([
  {
    id: 1,
    title: 'Inception',
    director: 'Christopher Nolan',
    description: 'Un ladrón que roba secretos corporativos a través de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea.',
    watchedDate: '18 Mar 2024',
    rating: '9.3',
    gradient: 'from-red-500 to-orange-600'
  },
  {
    id: 2,
    title: 'Interstellar',
    director: 'Christopher Nolan',
    description: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para asegurar la supervivencia de la humanidad.',
    watchedDate: '12 Mar 2024',
    rating: '8.9',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    title: 'The Matrix',
    director: 'The Wachowskis',
    description: 'Un programador descubre que la realidad tal como la conoce no existe y se une a una rebelión contra las máquinas.',
    watchedDate: '8 Mar 2024',
    rating: '8.7',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    description: 'Las vidas de dos sicarios, un boxeador y la esposa de un gángster se entrelazan en cuatro historias de violencia y redención.',
    watchedDate: '3 Mar 2024',
    rating: '9.0',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 5,
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    description: 'Batman se enfrenta al Joker, un criminal psicópata que quiere sumir Gotham City en la anarquía.',
    watchedDate: '25 Feb 2024',
    rating: '9.4',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 6,
    title: 'Parasite',
    director: 'Bong Joon-ho',
    description: 'Una familia pobre se infiltra en la vida de una familia rica con consecuencias inesperadas.',
    watchedDate: '20 Feb 2024',
    rating: '8.8',
    gradient: 'from-yellow-500 to-red-600'
  }
])

// Término de búsqueda
const searchTerm = ref('')

// Computed para películas filtradas
const filteredMovies = computed(() => {
  if (!searchTerm.value) return movies.value
  return movies.value.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Computed para estadísticas
const moviesThisMonth = computed(() => {
  // Lógica para calcular películas vistas este mes
  return 5
})

const favoriteMovies = computed(() => {
  // Lógica para calcular películas favoritas (rating > 9)
  return movies.value.filter(movie => parseFloat(movie.rating) > 9).length
})

const totalHoursWatched = computed(() => {
  // Lógica para calcular horas vistas (asumiendo 2 horas por película)
  return movies.value.length * 2
})

// Función para abrir modal de agregar película
const openAddMovieModal = () => {
  // Implementar lógica para abrir modal
  console.log('Abrir modal de agregar película')
}

// Cargar datos si es necesario
onMounted(() => {
  // Aquí podrías cargar datos desde una API
})
</script>

<style scoped>

</style>