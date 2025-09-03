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
        <button @click="redirectToLogin"
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
    <section class="px-6 py-16 bg-card">
      <div class="max-w-6xl mx-auto">
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
          <button @click="goToRegister"
            class="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Crear Cuenta
          </button>
          <button @click="redirectToLogin"
            class="border border-border bg-transparent text-foreground px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
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
