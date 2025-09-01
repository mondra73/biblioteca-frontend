<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="text-center">
        <!-- Ícono de advertencia -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
          <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
            </path>
          </svg>
        </div>

        <!-- Mensaje principal -->
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          {{ titulo }}
        </h3>

        <!-- Mensaje secundario -->
        <p class="mt-2 text-sm text-gray-500">
          {{ mensaje }}
        </p>

        <!-- Botones -->
        <div class="mt-6 flex justify-center space-x-3">
          <button @click="$emit('cancelar')"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button @click="$emit('confirmar')"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
    default: 'Confirmar acción'
  },
  mensaje: {
    type: String,
    required: true,
    default: '¿Estás seguro de que quieres realizar esta acción?'
  }
})

defineEmits(['confirmar', 'cancelar'])
</script>
