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
            <h1 class="text-2xl font-bold text-gray-900">Mi Lista</h1>
          </div>
          <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Agregar a Lista</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats y Filtros -->
      <div class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <!-- Total Pendientes -->
          <div class="bg-white rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 1 1 0-2h4Z"/>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input 
              v-model="searchTerm" 
              type="text" 
              placeholder="Buscar en mi lista..." 
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            >
          </div>
          <select 
            v-model="selectedType" 
            class="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          >
            <option value="">Todos los tipos</option>
            <option value="libro">Libros</option>
            <option value="serie">Series</option>
            <option value="pelicula">Películas</option>
          </select>
        </div>
      </div>

      <!-- Lista Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Items de la lista -->
        <div 
          v-for="item in filteredItems" 
          :key="item.id" 
          :data-tipo="item.tipo"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          :class="{ 'opacity-60': item.completado }"
        >
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
              <button 
                @click="marcarComoCompletado(item)"
                :class="[
                  'text-sm font-medium flex items-center space-x-1',
                  item.completado 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-green-600 hover:text-green-700'
                ]"
                :disabled="item.completado"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>{{ getCompletadoText(item.tipo, item.completado) }}</span>
              </button>
              <button 
                @click="eliminarItem(item)" 
                class="text-red-600 hover:text-red-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Datos reactivos
const searchTerm = ref('')
const selectedType = ref('')
const items = ref([
  {
    id: 1,
    titulo: '1984',
    tipo: 'libro',
    autorDirector: 'George Orwell',
    descripcion: 'Una novela distópica sobre un futuro totalitario donde el gobierno controla todos los aspectos de la vida.',
    completado: false
  },
  {
    id: 2,
    titulo: 'The Witcher',
    tipo: 'serie',
    autorDirector: 'Lauren Schmidt Hissrich',
    descripcion: 'Un cazador de monstruos lucha por encontrar su lugar en un mundo donde las personas a menudo resultan más malvadas que las bestias.',
    completado: false
  },
  {
    id: 3,
    titulo: 'Dune',
    tipo: 'pelicula',
    autorDirector: 'Denis Villeneuve',
    descripcion: 'Un joven noble debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.',
    completado: false
  },
  {
    id: 4,
    titulo: 'Sapiens',
    tipo: 'libro',
    autorDirector: 'Yuval Noah Harari',
    descripcion: 'Una breve historia de la humanidad que explora cómo el Homo sapiens llegó a dominar el mundo.',
    completado: false
  },
  {
    id: 5,
    titulo: 'Wednesday',
    tipo: 'serie',
    autorDirector: 'Alfred Gough',
    descripcion: 'Wednesday Addams navega por sus años como estudiante en la Academia Nevermore, intentando dominar su habilidad psíquica emergente.',
    completado: false
  },
  {
    id: 6,
    titulo: 'Top Gun: Maverick',
    tipo: 'pelicula',
    autorDirector: 'Joseph Kosinski',
    descripcion: 'Después de más de 30 años de servicio, Pete "Maverick" Mitchell sigue siendo un piloto de pruebas de élite.',
    completado: false
  }
])

// Estadísticas computadas
const stats = computed(() => {
  const total = items.value.length
  const libros = items.value.filter(item => item.tipo === 'libro').length
  const series = items.value.filter(item => item.tipo === 'serie').length
  const peliculas = items.value.filter(item => item.tipo === 'pelicula').length
  
  return { total, libros, series, peliculas }
})

// Items filtrados
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.titulo.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesType = selectedType.value === '' || item.tipo === selectedType.value
    return matchesSearch && matchesType
  })
})

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

// Funciones de acciones
const marcarComoCompletado = (item) => {
  item.completado = true
}

const eliminarItem = (item) => {
  items.value = items.value.filter(i => i.id !== item.id)
}

// Inicialización
onMounted(() => {
  // Aquí puedes cargar datos iniciales si es necesario
})
</script>

<style>

</style>