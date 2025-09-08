const CACHE_NAME = 'biblioteca-cache-v3' // ✅ Incrementé la versión

// Estrategia de cache dinámico
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker instalado - saltando espera')
  self.skipWaiting() // ✅ Fuerza la activación inmediata
})

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activado')
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log('🗑️ Limpiando caches viejos:', cacheNames)
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('🔴 Eliminando cache viejo:', name)
              return caches.delete(name)
            }),
        )
      })
      .then(() => {
        console.log('✅ Caches limpiados - tomando control de clientes')
        return self.clients.claim() // ✅ Toma control inmediato de todas las pestañas
      }),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // ✅ Solo cachear requests GET
  if (request.method !== 'GET') return

  event.respondWith(
    caches
      .match(request)
      .then((cachedResponse) => {
        // ✅ Devuelve cacheado si existe
        if (cachedResponse) {
          console.log('📦 Sirviendo desde cache:', request.url)
          return cachedResponse
        }

        // ✅ Sino, fetch y cachea
        return fetch(request).then((networkResponse) => {
          // Solo cachear responses válidas
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse
          }

          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            console.log('💾 Cacheando nuevo recurso:', request.url)
            cache.put(request, responseToCache)
          })

          return networkResponse
        })
      })
      .catch(() => {
        // ✅ Fallback para errores de red
        console.log('❌ Error de red, sirviendo fallback')
        return caches.match('/') || new Response('Offline - Biblioteca Multimedia')
      }),
  )
})

// ✅ ESCUCHAR MENSAJES PARA ACTUALIZACIONES
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    console.log('🎯 Recibido mensaje skipWaiting')
    self.skipWaiting()
  }
})

// ✅ ESCUCHAR SYNC PARA BACKGROUND SYNC
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

// ✅ Función ejemplo para background sync
function doBackgroundSync() {
  return new Promise((resolve) => {
    console.log('🔄 Sincronizando en background...')
    setTimeout(resolve, 1000)
  })
}
