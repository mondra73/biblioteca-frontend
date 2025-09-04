<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/65 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">

        <!-- Imagen como botón de Home -->
        <router-link to="/" class="flex items-center">
          <img src="../../public/portada1.png" alt="Logo"
            class="h-16 w-auto cursor-pointer hover:opacity-80 transition" />
        </router-link>

        <!-- Navegación para Desktop -->
        <nav class="hidden md:flex items-center gap-4">
          <button v-if="!auth.isAuthenticated" @click="redirectToLogin"
            class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors cursor-pointer">
            Iniciar Sesión
          </button>

          <div v-else class="flex items-center gap-4">
            <span class="text-sm text-gray-700" v-if="auth.userData?.name">
              Hola, {{ auth.userData.name }}
            </span>

            <router-link to="/dashboard" class="text-sm text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </router-link>

            <router-link to="/mi-lista" class="text-sm text-gray-700 hover:text-primary transition-colors">
              Mi Lista
            </router-link>

            <router-link to="/estadisticas" class="text-sm text-gray-700 hover:text-primary transition-colors">
              Estadísticas
            </router-link>

            <router-link to="/contacto" class="text-sm text-gray-700 hover:text-primary transition-colors">
              Contacto
            </router-link>

            <button @click="handleLogout"
              class="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </nav>

        <!-- Menú Hamburguesa para Mobile - Usuario Autenticado -->
        <div v-if="auth.isAuthenticated" class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Menú desplegable -->
          <div v-if="isMenuOpen" class="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div class="container mx-auto px-6 py-4 flex flex-col space-y-3">
              <span class="text-sm text-gray-700 font-medium py-2 text-center w-full" v-if="auth.userData?.name">
                Hola, {{ auth.userData.name }}
              </span>
              <span class="text-sm text-gray-700 font-medium py-2 text-center w-full" v-else>
                Hola, Usuario
              </span>

              <router-link to="/dashboard" @click="isMenuOpen = false"
                class="text-sm text-gray-700 hover:text-primary transition-colors py-2 text-center w-full">
                Dashboard
              </router-link>

              <router-link to="/mi-lista" @click="isMenuOpen = false"
                class="text-sm text-gray-700 hover:text-primary transition-colors py-2 text-center w-full">
                Mi Lista
              </router-link>

              <router-link to="/estadisticas" @click="isMenuOpen = false"
                class="text-sm text-gray-700 hover:text-primary transition-colors py-2 text-center w-full">
                Estadísticas
              </router-link>

              <router-link to="/contacto" @click="isMenuOpen = false"
                class="text-sm text-gray-700 hover:text-primary transition-colors py-2 text-center w-full">
                Contacto
              </router-link>

              <button @click="handleLogout"
                class="flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors cursor-pointer mt-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <!-- Menú Hamburguesa para Mobile - Usuario NO Autenticado -->
        <div v-else class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Menú desplegable para usuarios no autenticados -->
          <div v-if="isMenuOpen" class="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div class="container mx-auto px-6 py-4 flex flex-col space-y-3">
              <router-link to="/contacto" @click="isMenuOpen = false"
                class="text-sm text-gray-700 hover:text-primary transition-colors py-2 text-center w-full">
                Contacto
              </router-link>

              <button @click="redirectToLoginMobile"
                class="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors cursor-pointer w-full">
                Iniciar Sesión
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

const logout = () => {
  auth.logout()
  // Opcional: redirigir al home
  router.push('/')
}

onMounted(() => {
  auth.checkAuth()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
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
