<template>
  <div class="dashboard-container">
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
            <h1 class="text-2xl font-bold text-gray-900">Mis Series</h1>
          </div>
          <button 
            class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            @click="addSeries"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Agregar Serie</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats y Search -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Series</p>
                <p class="text-2xl font-bold text-gray-900">{{ series.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Este Mes</p>
                <p class="text-2xl font-bold text-gray-900">{{ thisMonthCount }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Favoritas</p>
                <p class="text-2xl font-bold text-gray-900">{{ favoritesCount }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Horas Vistas</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalHours }}</p>
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
            type="text" 
            placeholder="Buscar series por título..." 
            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            v-model="searchTerm"
          >
        </div>
      </div>

      <!-- Series Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Serie Card -->
        <div 
          v-for="serie in filteredSeries" 
          :key="serie.id" 
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="h-32" :class="serie.gradient"></div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ serie.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">Director: {{ serie.director }}</p>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ serie.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">Visto: {{ formatDate(serie.watchedDate) }}</span>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ serie.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Datos de las series
const series = ref([
  {
    id: 1,
    title: 'Breaking Bad',
    director: 'Vince Gilligan',
    description: 'Un profesor de química de secundaria se convierte en fabricante de metanfetaminas tras ser diagnosticado con cáncer.',
    watchedDate: '2024-03-15',
    rating: 9.5,
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600'
  },
  {
    id: 2,
    title: 'Stranger Things',
    director: 'The Duffer Brothers',
    description: 'Un grupo de niños en los años 80 se enfrenta a fuerzas sobrenaturales en su pequeño pueblo.',
    watchedDate: '2024-03-10',
    rating: 8.7,
    gradient: 'bg-gradient-to-r from-green-500 to-teal-600'
  },
  {
    id: 3,
    title: 'The Crown',
    director: 'Peter Morgan',
    description: 'La historia de la reina Isabel II y la familia real británica a lo largo de las décadas.',
    watchedDate: '2024-03-05',
    rating: 8.9,
    gradient: 'bg-gradient-to-r from-red-500 to-pink-600'
  },
  {
    id: 4,
    title: 'Dark',
    director: 'Baran bo Odar',
    description: 'Una serie alemana de ciencia ficción que explora los viajes en el tiempo y las conexiones familiares.',
    watchedDate: '2024-02-28',
    rating: 9.2,
    gradient: 'bg-gradient-to-r from-indigo-500 to-blue-600'
  },
  {
    id: 5,
    title: 'The Office',
    director: 'Greg Daniels',
    description: 'Una comedia que sigue la vida diaria de los empleados de una oficina de papel en Scranton.',
    watchedDate: '2024-02-20',
    rating: 8.5,
    gradient: 'bg-gradient-to-r from-yellow-500 to-orange-600'
  },
  {
    id: 6,
    title: 'House of Cards',
    director: 'Beau Willimon',
    description: 'Un político ambicioso y su esposa manipulan su camino hacia el poder en Washington D.C.',
    watchedDate: '2024-02-15',
    rating: 8.3,
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-600'
  }
])

// Término de búsqueda
const searchTerm = ref('')

// Funcionalidad de búsqueda
const filteredSeries = computed(() => {
  if (!searchTerm.value) return series.value
  return series.value.filter(serie => 
    serie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Estadísticas calculadas
const thisMonthCount = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return series.value.filter(serie => {
    const date = new Date(serie.watchedDate)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  }).length
})

const favoritesCount = computed(() => {
  return series.value.filter(serie => serie.rating >= 9).length
})

const totalHours = computed(() => {
  // Asumiendo un promedio de 10 horas por serie
  return series.value.length * 10
})

// Función para formatear fechas
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', options)
}

// Función para agregar serie
const addSeries = () => {
  // Aquí iría la lógica para agregar una nueva serie
  console.log('Agregar nueva serie')
}

// Inicialización (si es necesaria)
onMounted(() => {
  console.log('Componente montado')
})
</script>

<style scoped>

.dashboard-container {
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>