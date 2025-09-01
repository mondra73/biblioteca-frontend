<!-- ModalExitoView.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="text-center">
        <!-- Ícono de éxito -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
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

        <!-- Botón -->
        <div class="mt-6">
          <button @click="$emit('close')"
            class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Aceptar
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
    default: 'Operación exitosa'
  },
  mensaje: {
    type: String,
    default: 'La operación se completó correctamente.'
  }
})

defineEmits(['close'])
</script>
