<template>
    <div
        class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background text-foreground antialiased">
        <!-- Elementos decorativos de fondo -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <!-- Contenido principal -->
        <div class="relative z-10 w-full max-w-2xl">
            <!-- Card principal -->
            <div class="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center">
                <!-- Número 404 grande -->
                <div class="mb-8">
                    <h1 class="text-8xl md:text-9xl font-bold text-primary/20 leading-none select-none">
                        404
                    </h1>
                </div>

                <!-- Imagen de not found -->
                <div class="mb-8 flex justify-center">
                    <img src="../../public/not-found.png" alt="Página no encontrada"
                        class="max-w-full max-h-96 object-contain" 
                    />
                </div>

                <!-- Título y descripción -->
                <div class="mb-8">
                    <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        ¡Oops! Página no encontrada
                    </h2>
                    <p class="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                        La página que estás buscando no existe o ha sido movida. No te preocupes, te ayudamos a
                        encontrar lo que necesitas.
                    </p>
                </div>

                <!-- Botones de acción -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <!-- Botón principal - Volver al inicio -->
                    <button @click="goHome"
                        class="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Volver al inicio
                    </button>
                </div>

            </div>

            <!-- Información adicional -->
            <div class="mt-8 text-center">
                <p class="text-sm text-muted-foreground">
                    Si crees que esto es un error, por favor
                    <a href="/contacto"
                        class="text-primary hover:text-primary/80 transition-colors duration-200 underline">
                        contáctanos
                    </a>
                </p>
            </div>
        </div>

        <!-- Modal de búsqueda -->
        <div v-show="isSearchOpen"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            @click.self="closeSearch">
            <div class="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-foreground">Buscar contenido</h3>
                    <button @click="closeSearch" class="text-muted-foreground hover:text-foreground transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="relative mb-4">
                    <input v-model="searchTerm" type="text" placeholder="¿Qué estás buscando?"
                        class="w-full px-4 py-3 pl-12 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" />
                    <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <button @click="performSearch"
                    class="w-full px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200">
                    Buscar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSearchOpen = ref(false);
const searchTerm = ref('');

function goHome() {
    console.log('Navegando al inicio...');
    router.push('/')
}

function openSearch() {
    isSearchOpen.value = true;
    nextTick(() => {
        document.querySelector('input').focus();
    });
}

function closeSearch() {
    isSearchOpen.value = false;
}

function performSearch() {
    if (searchTerm.value.trim()) {
        console.log('Buscando:', searchTerm.value);
        closeSearch();
    }
}

// Cerrar modal con Escape
function handleKeydown(e) {
    if (e.key === 'Escape') closeSearch();
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>
