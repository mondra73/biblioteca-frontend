<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="relative px-6 py-20 overflow-hidden">
      <div class="absolute inset-0 bg-primary/5"></div>
      <div class="relative max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold text-foreground mb-6 text-balance">
          Tu biblioteca personal de entretenimiento
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Registra, organiza y descubre. La forma más elegante de llevar control de todo lo que ves y lees.
        </p>
        <button @click="redirectToDashboard"
          class="bg-primary text-primary-foreground px-8 py-3 text-lg rounded-md font-medium hover:bg-primary/90 transition-colors">
          Comenzar Ahora
        </button>
      </div>
    </section>

    <!-- Images Section -->
    <section class="px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-80">
          <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
            <img src="/2.png" alt="Libro genérico" class="w-full h-full object-cover" />
          </div>
          <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
            <img src="/1.png" alt="Película genérica" class="w-full h-full object-cover" />
          </div>
          <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
            <img src="/3.png" alt="Libro genérico" class="w-full h-full object-cover" />
          </div>
          <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
            <img src="/4.png" alt="Serie genérica" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative px-6 py-16 overflow-hidden">
      <div class="absolute inset-0 bg-primary/5"></div>
      <div class="relative max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-card-foreground mb-12">¿Qué puedes hacer?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-card p-8 text-center rounded-lg border-0 shadow-sm">
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
            <h3 class="text-xl font-semibold mb-4">Películas y Series</h3>
            <p class="text-muted-foreground text-pretty">
              Registra todo lo que has visto y mantén una lista de lo que quieres ver próximamente.
            </p>
          </div>

          <div class="bg-card p-8 text-center rounded-lg border-0 shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Libros</h3>
            <p class="text-muted-foreground text-pretty">
              Lleva un control de tus lecturas completadas y organiza tu lista de libros pendientes.
            </p>
          </div>

          <div class="bg-card p-8 text-center rounded-lg border-0 shadow-sm">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Rankings</h3>
            <p class="text-muted-foreground text-pretty">
              Compite con otros usuarios y ve quién lidera en cada categoría de entretenimiento.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-6 py-16">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-foreground mb-6 text-balance">
          Comienza a organizar tu entretenimiento hoy
        </h2>
        <p class="text-lg text-muted-foreground mb-8 text-pretty">
          Únete a nuestra comunidad y nunca más olvides qué has visto o leído.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <!-- Mostrar botón "Agregar Nuevo" si el usuario está autenticado -->
          <button v-if="auth.isAuthenticated" @click="mostrarModalAgregar = true"
            class="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            + Agregar Nuevo
          </button>

          <!-- Mostrar botones de registro/inicio de sesión si el usuario NO está autenticado -->
          <template v-else>
            <button @click="goToRegister"
              class="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Crear Cuenta
            </button>
            <button @click="redirectToDashboard"
              class="border border-border bg-transparent text-foreground px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Iniciar Sesión
            </button>
          </template>
        </div>
      </div>
    </section>

    <!-- Modal para Agregar Nuevo (copiado del Dashboard) -->
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

// Estados para la autenticación y modales
const isAuthenticated = ref(false)
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

// Función para decodificar el token JWT
const decodeJWT = (token) => {
  try {
    // El token JWT tiene 3 partes separadas por puntos: header.payload.signature
    const base64Url = token.split('.')[1]
    // Reemplazar caracteres específicos de base64url
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    // Decodificar la cadena base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decodificando el token:', error)
    return null
  }
}

// Función para verificar si el usuario está autenticado
const checkAuthentication = () => {
  const token = localStorage.getItem('auth-token')

  if (token) {
    const decodedToken = decodeJWT(token)

    if (decodedToken) {
      // Verificar si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        isAuthenticated.value = true
        return
      } else {
        // Token expirado, limpiar del localStorage
        localStorage.removeItem('auth-token')
      }
    }
  }

  isAuthenticated.value = false
}

const redirectToDashboard = () => {
  router.push('/dashboard')
}

const goToRegister = () => {
  router.push('/register')
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
}

// Verificar autenticación al montar el componente
onMounted(() => {
  checkAuthentication()
})
</script>

<style>
/* Estilos personalizados para mantener la apariencia */
.bg-background {
  background-color: #fff;
}

.text-foreground {
  color: #1f2937;
}

.text-muted-foreground {
  color: #6b7280;
}

.bg-card {
  background-color: #f9fafb;
}

.text-card-foreground {
  color: #1f2937;
}

.border-border {
  border-color: #e5e7eb;
}

.bg-primary {
  background-color: #3b82f6;
}

.text-primary {
  color: #3b82f6;
}

.text-primary-foreground {
  color: #fff;
}

.hover\:bg-primary\/90:hover {
  background-color: #2563eb;
}
</style>
