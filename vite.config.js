import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isProduction = mode === 'production'
  const apiTarget =
    env.VITE_API_BASE ||
    (isProduction ? 'https://backbibloteca.onrender.com' : 'http://localhost:3000')

  console.log(`🚀 Configurando API target: ${apiTarget} (${mode})`)

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: isProduction,
        },
      },
    },
    define: {
      'import.meta.env.VITE_API_BASE': JSON.stringify(apiTarget),
    },
  }
})
