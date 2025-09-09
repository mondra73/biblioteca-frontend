<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <section class="px-6 py-12 max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4 text-balance">Estadísticas y Rankings</h2>
        <p class="text-lg text-muted-foreground text-pretty">
          Descubre quién lidera en cada categoría y revisa tu progreso personal
        </p>
      </div>
    </section>

    <!-- Top Users Rankings -->
    <section class="px-6 pb-12">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center gap-2">
          <svg class="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Usuarios Líderes
        </h3>

        <!-- Loading State -->
        <div v-if="loadingRankings" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p class="mt-2 text-muted-foreground">Cargando rankings...</p>
        </div>

        <!-- Error State para Rankings -->
        <div v-else-if="errorRankings" class="text-center py-8 text-red-600">
          <p>Error al cargar rankings: {{ errorRankings }}</p>
        </div>

        <!-- Rankings Grid -->
        <div v-else class="grid md:grid-cols-3 gap-6">
          <!-- Top Libros -->
          <div class="bg-card p-8 rounded-lg border-0 shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-center mb-6">Más Libros Leídos</h4>
            <div class="space-y-4">
              <div v-for="(user, index) in topLibros" :key="user.id"
                class="flex items-center justify-between p-3 bg-background rounded-md">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {{ index + 1 }}
                  </div>
                  <span class="font-medium">{{ user.nombre }}</span>
                </div>
                <span class="text-primary font-bold">{{ user.cantidad }}</span>
              </div>
            </div>
          </div>

          <!-- Top Películas -->
          <div class="bg-card p-8 rounded-lg border-0 shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m7 3 0 18" />
                <path d="m17 3 0 18" />
                <path d="M14 7h1" />
                <path d="M9 7h1" />
                <path d="M9 17h1" />
                <path d="M14 17h1" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-center mb-6">Más Películas Vistas</h4>
            <div class="space-y-4">
              <div v-for="(user, index) in topPeliculas" :key="user.id"
                class="flex items-center justify-between p-3 bg-background rounded-md">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {{ index + 1 }}
                  </div>
                  <span class="font-medium">{{ user.nombre }}</span>
                </div>
                <span class="text-primary font-bold">{{ user.cantidad }}</span>
              </div>
            </div>
          </div>

          <!-- Top Series -->
          <div class="bg-card p-8 rounded-lg border-0 shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-center mb-6">Más Series Vistas</h4>
            <div class="space-y-4">
              <div v-for="(user, index) in topSeries" :key="user.id"
                class="flex items-center justify-between p-3 bg-background rounded-md">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {{ index + 1 }}
                  </div>
                  <span class="font-medium">{{ user.nombre }}</span>
                </div>
                <span class="text-primary font-bold">{{ user.cantidad }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Statistics -->
    <section class="relative px-6 py-16">
      <!-- Fondo degradado -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-60 blur-3xl">
      </div>

      <div class="relative max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-center text-card-foreground mb-8 flex items-center justify-center gap-2">
          <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Mis Estadísticas Personales
        </h3>

        <!-- Loading State -->
        <div v-if="loadingPersonal" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p class="mt-2 text-muted-foreground">Cargando tus estadísticas...</p>
        </div>

        <!-- Error State para Estadísticas Personales -->
        <div v-else-if="errorPersonal" class="text-center py-8 text-red-600">
          <p>Error al cargar estadísticas personales: {{ errorPersonal }}</p>
        </div>

        <!-- Personal Stats Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center bg-background p-8 rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-primary mb-2">{{ estadisticasPersonales.libros }}</div>
            <div class="text-lg font-medium text-foreground mb-1">Libros Leídos</div>
            <div class="text-sm text-muted-foreground">Total acumulado</div>
          </div>

          <div class="text-center bg-background p-8 rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m7 3 0 18" />
                <path d="m17 3 0 18" />
                <path d="M14 7h1" />
                <path d="M9 7h1" />
                <path d="M9 17h1" />
                <path d="M14 17h1" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-primary mb-2">{{ estadisticasPersonales.peliculas }}</div>
            <div class="text-lg font-medium text-foreground mb-1">Películas Vistas</div>
            <div class="text-sm text-muted-foreground">Total acumulado</div>
          </div>

          <div class="text-center bg-background p-8 rounded-lg shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-primary mb-2">{{ estadisticasPersonales.series }}</div>
            <div class="text-lg font-medium text-foreground mb-1">Series Vistas</div>
            <div class="text-sm text-muted-foreground">Total acumulado</div>
          </div>
        </div>

        <!-- Additional Personal Info -->
        <div class="mt-12 bg-background p-6 rounded-lg">
          <h4 class="text-lg font-semibold text-foreground mb-8 text-center">Resumen de Actividad</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-primary">{{ totalContenido }}</div>
              <div class="text-sm ntext-muted-foreground">Total Consumido</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">{{ promedioMensual }}</div>
              <div class="text-sm text-muted-foreground">Promedio Mensual</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">{{ categoriaFavorita }}</div>
              <div class="text-sm text-muted-foreground">Categoría Favorita</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-primary">{{ totalUsuarios }}</div>
              <div class="text-sm text-muted-foreground">Usuarios Totales</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <section class="relative px-6 py-16">
      <!-- Fondo degradado -->
      <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent opacity-60 blur-3xl">
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <h3 class="text-2xl font-bold text-foreground mb-8 text-balance">¿Quieres mejorar tu posición?</h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="mostrarModalAgregar = true"
            class="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Agregar Contenido
          </button>
          <button @click="goToDashboard"
            class="border border-border bg-transparent text-foreground px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Volver al Dashboard
          </button>
        </div>
      </div>
    </section>

    <!-- Modal para Agregar Nuevo -->
    <div v-if="mostrarModalAgregar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="text-center">
          <!-- Ícono -->
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
          </div>

          <!-- Título -->
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            ¿Qué deseas agregar?
          </h3>

          <!-- Mensaje secundario -->
          <p class="text-sm text-gray-500 mb-4">
            Selecciona el tipo de contenido que quieres agregar
          </p>

          <!-- Select con opciones -->
          <div class="mb-4">
            <select v-model="tipoSeleccionado"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="" disabled selected>Selecciona una opción</option>
              <option value="libros">Libro</option>
              <option value="peliculas">Película</option>
              <option value="series">Serie</option>
            </select>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 mt-6">
            <button @click="mostrarModalAgregar = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button @click="abrirFormularioAgregar" :disabled="!tipoSeleccionado"
              class="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Agregar Libro -->
    <ModalAgregarLibro v-if="mostrarModalLibro" @close="mostrarModalLibro = false" @success="handleAgregarExitoso" />

    <!-- Modal para Agregar Película -->
    <ModalAgregarPelicula v-if="mostrarModalPelicula" @close="mostrarModalPelicula = false"
      @success="handleAgregarExitoso" />

    <!-- Modal para Agregar Serie -->
    <ModalAgregarSerie v-if="mostrarModalSerie" @close="mostrarModalSerie = false" @success="handleAgregarExitoso" />

    <!-- Modal de Éxito -->
    <ModalExitoView v-if="showModalExito" :titulo="modalExitoConfig.titulo" :mensaje="modalExitoConfig.mensaje"
      @close="showModalExito = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const loadingRankings = ref(true)
const loadingPersonal = ref(true)
const errorRankings = ref(null)
const errorPersonal = ref(null)

// Estado para el modal de agregar
const mostrarModalAgregar = ref(false)
const mostrarModalLibro = ref(false)
const mostrarModalPelicula = ref(false)
const mostrarModalSerie = ref(false)
const showModalExito = ref(false)
const tipoSeleccionado = ref('')
const modalExitoConfig = ref({
  titulo: '',
  mensaje: ''
})

const topLibros = ref([])
const topPeliculas = ref([])
const topSeries = ref([])
const totalUsuarios = ref(0)

const estadisticasPersonales = ref({
  libros: 0,
  peliculas: 0,
  series: 0,
  pendientes: 0
})

const totalContenido = computed(() => {
  return estadisticasPersonales.value.libros +
    estadisticasPersonales.value.peliculas +
    estadisticasPersonales.value.series
})

const promedioMensual = computed(() => {
  return Math.round(totalContenido.value / 12)
})

const categoriaFavorita = computed(() => {
  const stats = estadisticasPersonales.value
  if (stats.libros >= stats.peliculas && stats.libros >= stats.series) return 'Libros'
  if (stats.peliculas >= stats.series) return 'Películas'
  return 'Series'
})

// Métodos para fetch datos
const fetchRankings = async () => {
  try {
    loadingRankings.value = true
    errorRankings.value = null
    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/estadisticas`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cargar rankings')
    }

    const data = await response.json()

    // Actualizar con datos reales
    topLibros.value = data.topLibros || []
    topPeliculas.value = data.topPeliculas || []
    topSeries.value = data.topSeries || []
    totalUsuarios.value = data.totalUsuarios || 0

  } catch (err) {
    console.error('Error fetching rankings:', err)
    errorRankings.value = err.message
  } finally {
    loadingRankings.value = false
  }
}

const fetchEstadisticasPersonales = async () => {
  try {
    loadingPersonal.value = true
    errorPersonal.value = null
    const token = authStore.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/estadisticas-user`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cargar estadísticas personales')
    }

    const data = await response.json()

    // Actualizar con datos reales
    estadisticasPersonales.value = {
      libros: data.libros || 0,
      peliculas: data.peliculas || 0,
      series: data.series || 0,
      pendientes: data.pendientes || 0
    }

  } catch (err) {
    console.error('Error fetching estadísticas personales:', err)
    errorPersonal.value = err.message
  } finally {
    loadingPersonal.value = false
  }
}

// Función para abrir el formulario correspondiente
const abrirFormularioAgregar = () => {
  mostrarModalAgregar.value = false

  switch (tipoSeleccionado.value) {
    case 'libros':
      mostrarModalLibro.value = true
      break
    case 'peliculas':
      mostrarModalPelicula.value = true
      break
    case 'series':
      mostrarModalSerie.value = true
      break
  }

  tipoSeleccionado.value = ''
}

// Función para manejar agregado exitoso
const handleAgregarExitoso = () => {
  // Configurar mensaje de éxito según el tipo
  switch (true) {
    case mostrarModalLibro.value:
      modalExitoConfig.value = {
        titulo: 'Libro agregado',
        mensaje: 'El libro se ha agregado exitosamente a tu biblioteca.'
      }
      mostrarModalLibro.value = false
      break
    case mostrarModalPelicula.value:
      modalExitoConfig.value = {
        titulo: 'Película agregada',
        mensaje: 'La película se ha agregado exitosamente.'
      }
      mostrarModalPelicula.value = false
      break
    case mostrarModalSerie.value:
      modalExitoConfig.value = {
        titulo: 'Serie agregada',
        mensaje: 'La serie se ha agregado exitosamente.'
      }
      mostrarModalSerie.value = false
      break
  }

  showModalExito.value = true
  fetchEstadisticasPersonales() // Actualizar estadísticas
  fetchRankings() // Actualizar rankings también
}

// Métodos de navegación
const goToDashboard = () => {
  router.push('/dashboard')
}

// Cargar datos al montar el componente
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await Promise.all([fetchRankings(), fetchEstadisticasPersonales()])
  }
})
</script>