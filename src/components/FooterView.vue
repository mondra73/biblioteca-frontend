<template>
  <footer class="bg-black text-white py-12 px-4 mt-auto">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-cyan-400">Acerca de</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            Lleva un registro completo de todas las películas, series y libros que has disfrutado.
          </p>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-cyan-400">Enlaces</h3>
          <div class="space-y-2">
            <a href="/contacto" class="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
              Contacto
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-cyan-400">Comunidad</h3>
          <div class="space-y-2 text-sm text-gray-300">
            <p>Miles de usuarios y títulos registrados.</p>
          </div>
        </div>
      </div>

      <div class="my-8 h-px bg-gray-800"></div>

      <!-- Copyright -->
      <div class="text-center text-gray-400 text-sm">
        <p>&copy; 2025 Biblioteca Multimedia. Todos los derechos reservados.</p>
        <p>Desarrollado por Javier Espinosa</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
