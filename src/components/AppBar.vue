<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div></div>

        <!-- Navegación -->
        <nav class="flex items-center gap-4">
          <button class="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
            Nosotros
          </button>

          <!-- Botón dinámico según estado de autenticación -->
          <button
            v-if="!auth.isAuthenticated"
            @click="redirectToLogin"
            class="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Iniciar Sesión
          </button>

          <div v-else class="flex items-center gap-4">
            <!-- Mostrar nombre si está disponible, sino saludo genérico -->
            <span class="text-sm text-gray-700" v-if="auth.userData?.name">
              Hola, {{ auth.userData.name }}
            </span>
            <span class="text-sm text-gray-700" v-else>
              Hola, Usuario
            </span>

            <!-- Botón de cerrar sesión con icono -->
            <button
              @click="handleLogout"
              class="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
const auth = useAuthStore()

// Verificar autenticación al montar el componente
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
  router.push('/')
}

const redirectToLogin = () => {
  router.push('/login')
}
</script>
