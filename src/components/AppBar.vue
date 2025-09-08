<template>
  <header
    class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
    <div class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">

        <!-- Logo con efecto hover mejorado -->
        <router-link to="/" class="flex items-center group">
          <div class="relative">
            <img src="../../public/portada1.png" alt="Logo"
              class="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
        </router-link>

        <!-- Navegación Desktop - Usuario NO autenticado -->
        <nav v-if="!auth.isAuthenticated" class="hidden md:flex items-center gap-6">
          <router-link to="/contacto"
            class="relative text-gray-700 hover:text-primary transition-all duration-300 font-medium group">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacto
            </span>
            <div
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300">
            </div>
          </router-link>

          <button @click="redirectToLogin"
            class="relative bg-gradient-to-r from-primary to-blue-500 text-white px-6 py-2.5 rounded-full font-medium hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:-translate-y-0.5 cursor-pointer">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Iniciar Sesión
            </span>
          </button>

          <button v-if="showInstallButton" @click="instalarApp"
            class="ml-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
            Instalar App
          </button>

        </nav>

        <!-- Navegación Desktop - Usuario autenticado -->
        <nav v-else class="hidden md:flex items-center gap-6">
          <!-- Saludo personalizado -->
          <div
            class="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-full border border-gray-200">
            <div
              class="w-8 h-8 bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700" v-if="auth.userData?.name">
              Hola, {{ auth.userData.name }}
            </span>
            <span class="text-sm font-medium text-gray-700" v-else>
              Hola, Usuario
            </span>
          </div>

          <!-- Enlaces de navegación con iconos -->
          <router-link to="/dashboard"
            class="relative text-gray-700 hover:text-primary transition-all duration-300 font-medium group">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Dashboard
            </span>
            <div
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300">
            </div>
          </router-link>

          <router-link to="/mi-lista"
            class="relative text-gray-700 hover:text-primary transition-all duration-300 font-medium group">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Mi Lista
            </span>
            <div
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300">
            </div>
          </router-link>

          <router-link to="/estadisticas"
            class="relative text-gray-700 hover:text-primary transition-all duration-300 font-medium group">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Estadísticas
            </span>
            <div
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300">
            </div>
          </router-link>

          <router-link to="/contacto"
            class="relative text-gray-700 hover:text-primary transition-all duration-300 font-medium group">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacto
            </span>
            <div
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 group-hover:w-full transition-all duration-300">
            </div>
          </router-link>

          <!-- Botón de logout mejorado -->
          <button @click="handleLogout"
            class="relative bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2.5 rounded-full font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group cursor-pointer">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </span>
          </button>
        </nav>

        <!-- Menú Hamburguesa Mobile - Usuario Autenticado -->
        <div v-if="auth.isAuthenticated" class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Menú desplegable mobile -->
          <div v-if="isMenuOpen"
            class="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl">
            <div class="container mx-auto px-6 py-6">
              <!-- Usuario autenticado -->
              <div class="flex flex-col space-y-4">
                <div
                  class="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border border-gray-200">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span class="font-medium text-gray-700" v-if="auth.userData?.name">
                    Hola, {{ auth.userData.name }}
                  </span>
                  <span class="font-medium text-gray-700" v-else>
                    Hola, Usuario
                  </span>
                </div>

                <router-link to="/dashboard" @click="isMenuOpen = false"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-300 group">
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="font-medium">Dashboard</span>
                </router-link>

                <router-link to="/mi-lista" @click="isMenuOpen = false"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-300 group">
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span class="font-medium">Mi Lista</span>
                </router-link>

                <router-link to="/estadisticas" @click="isMenuOpen = false"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-300 group">
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span class="font-medium">Estadísticas</span>
                </router-link>

                <router-link to="/contacto" @click="isMenuOpen = false"
                  class="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-300 group">
                  <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="font-medium">Contacto</span>
                </router-link>

                <button @click="handleLogout"
                  class="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg group cursor-pointer">
                  <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Menú Hamburguesa Mobile - Usuario NO Autenticado -->
        <div v-else class="md:hidden">

          <button v-if="showInstallButton" @click="instalarApp"
            class="ml-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
            Instalar App
          </button>

          <button @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Menú desplegable mobile para usuarios no autenticados -->
          <div v-if="isMenuOpen"
            class="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl">
            <div class="container mx-auto px-6 py-6 flex flex-col space-y-4">
              <router-link to="/contacto" @click="isMenuOpen = false"
                class="flex items-center gap-3 text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl transition-all duration-300 group">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Contacto</span>
              </router-link>

              <button @click="redirectToLoginMobile"
                class="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-3 rounded-xl font-medium hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:-translate-y-0.5 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Iniciar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { onMounted, onUnmounted, ref } from 'vue'

const router = useRouter()
const auth = useAuthStore()
const isMenuOpen = ref(false)
const showInstallButton = ref(false)
const deferredPrompt = ref(null)  // ✅ Cambiado a ref

const instalarApp = async () => {
  if (!deferredPrompt.value) {
    console.log('❌ No hay deferredPrompt disponible')
    return
  }

  try {
    // Mostrar el prompt de instalación
    const result = await deferredPrompt.value.prompt()
    console.log('📱 Usuario respondió:', result)

    if (result.outcome === 'accepted') {
      console.log('✅ App instalada exitosamente')
    } else {
      console.log('❌ Usuario canceló la instalación')
    }

  } catch (error) {
    console.error('💥 Error al instalar:', error)
  } finally {
    // Limpiar para futuras instalaciones
    deferredPrompt.value = null
    showInstallButton.value = false
  }
}

const handleBeforeInstallPrompt = (e) => {
  console.log('🎯 Evento beforeinstallprompt capturado', e)

  // Guardar el evento para usarlo después
  deferredPrompt.value = e

  // Prevenir que Chrome muestre su banner automático
  e.preventDefault()

  // Mostrar TU botón personalizado
  showInstallButton.value = true
  console.log('✅ Botón de instalación activado')
}

onMounted(() => {
  auth.checkAuth()
  window.addEventListener('storage', handleStorageChange)
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

  // ✅ VERIFICAR SI LA APP YA ESTÁ INSTALADA
  const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')

  if (isAppInstalled) {
    console.log('📱 App ya está instalada - ocultando botón')
    showInstallButton.value = false
    deferredPrompt.value = null
  }

  // ✅ AGREGAR ESTO - Forzar verificación después de 3 segundos
  setTimeout(() => {
    if (!deferredPrompt.value) {
      console.log('🔍 Buscando evento beforeinstallprompt manualmente...')

      // Disparar manualmente la verificación
      const event = new Event('beforeinstallprompt', {
        bubbles: true,
        cancelable: true
      })
      window.dispatchEvent(event)

      // Alternativa: verificar si ya está disponible
      if (window.deferredPrompt) {
        deferredPrompt.value = window.deferredPrompt
        showInstallButton.value = true
        console.log('✅ deferredPrompt encontrado en window')
      }
    }
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

const handleStorageChange = () => {
  auth.checkAuth()
}

const handleLogout = () => {
  auth.logout()
  isMenuOpen.value = false
  router.push('/')
}

const redirectToLogin = () => {
  router.push('/login')
}

const redirectToLoginMobile = () => {
  isMenuOpen.value = false
  router.push('/login')
}
</script>
