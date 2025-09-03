<template>
  <div class="min-h-screen bg-background">

    <section class="px-6 py-12 max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4 text-balance">¿Qué quieres hacer hoy?</h2>
        <p class="text-lg text-muted-foreground text-pretty">
          Accede rápidamente a tus secciones favoritas y mantén tu entretenimiento organizado
        </p>
      </div>
    </section>

    <section class="px-6 pb-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            class="bg-card p-8 text-center rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="goToSection('libros')">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Libros</h3>
            <p class="text-muted-foreground text-pretty mb-4">
              Gestiona todos los libros que has leído y califica tus favoritos
            </p>
            <div class="text-sm text-primary font-medium">
              Ver mis libros →
            </div>
          </div>

          <div
            class="bg-card p-8 text-center rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="goToSection('peliculas')">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
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
            <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Películas</h3>
            <p class="text-muted-foreground text-pretty mb-4">
              Registra todas las películas que has visto y descubre nuevas
            </p>
            <div class="text-sm text-primary font-medium">
              Ver mis películas →
            </div>
          </div>

          <div
            class="bg-card p-8 text-center rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="goToSection('series')">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Series</h3>
            <p class="text-muted-foreground text-pretty mb-4">
              Lleva el control de todas las series que sigues y has completado
            </p>
            <div class="text-sm text-primary font-medium">
              Ver mis series →
            </div>
          </div>

          <div
            class="bg-card p-8 text-center rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            @click="goToSection('mi-lista')">
            <div
              class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">Mi Lista</h3>
            <p class="text-muted-foreground text-pretty mb-4">
              Todo lo que quieres leer, ver o disfrutar próximamente
            </p>
            <div class="text-sm text-primary font-medium">
              Ver mi lista →
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-16 bg-card">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-center text-card-foreground mb-8">Resumen Rápido</h2>

        <!-- Loading State -->
        <div v-if="loading" class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p class="mt-2 text-muted-foreground">Cargando estadísticas...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-600">
          <p>Error al cargar estadísticas</p>
        </div>

        <!-- Content -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">{{ estadisticas.libros }}</div>
            <div class="text-sm text-muted-foreground">Libros Leídos</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">{{ estadisticas.peliculas }}</div>
            <div class="text-sm text-muted-foreground">Películas Vistas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">{{ estadisticas.series }}</div>
            <div class="text-sm text-muted-foreground">Series Completadas</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">{{ estadisticas.pendientes }}</div>
            <div class="text-sm text-muted-foreground">En Mi Lista</div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-16">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-foreground mb-8 text-balance">Acciones Rápidas</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="mostrarModalAgregar = true"
            class="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Agregar Nuevo
          </button>
          <button @click="goToEstadisticas"
            class="border border-border bg-transparent text-foreground px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Ver Estadísticas
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { ref, onMounted, watch } from 'vue'

const router = useRouter()
const auth = useAuthStore()

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

// ✅ Agregar estado reactivo para las estadísticas
const estadisticas = ref({
  libros: 0,
  peliculas: 0,
  series: 0,
  pendientes: 0
})

const loading = ref(false)
const error = ref(null)

const goToSection = (section) => {
  router.push(`/${section}`)
}

const logout = () => {
  auth.logout()
  router.push('/')
}

const goToEstadisticas = () => {
  router.push('/estadisticas')
}

// ✅ Función para obtener estadísticas reales
const fetchEstadisticas = async () => {
  try {
    loading.value = true
    error.value = null
    const token = auth.token
    const API_BASE = import.meta.env.VITE_API_BASE || ''

    const response = await fetch(`${API_BASE}/api/admin/user/estadisticas-user`, {
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cargar estadísticas')
    }

    const data = await response.json()

    // ✅ Actualizar con datos reales
    estadisticas.value = {
      libros: data.libros || 0,
      peliculas: data.peliculas || 0,
      series: data.series || 0,
      pendientes: data.pendientes || 0
    }

  } catch (err) {
    console.error('Error fetching estadísticas:', err)
    error.value = err.message
  } finally {
    loading.value = false
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
  fetchEstadisticas() // Actualizar estadísticas
}

// ✅ Cargar estadísticas al montar el componente
onMounted(() => {
  if (auth.isAuthenticated) {
    fetchEstadisticas()
  }
})

watch(() => auth.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    fetchEstadisticas()
  }
})

</script>