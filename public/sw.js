const CACHE_NAME = 'biblioteca-cache-v3' // ✅ Incrementé la versión

// Estrategia de cache dinámico
self.addEventListener('install', () => {
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
  const url = new URL(request.url)

  // ✅ NO CACHEAR ICONOS - siempre servirlos frescos
  if (
    url.pathname.includes('portada1.png') ||
    url.pathname.includes('icon') ||
    url.pathname.includes('favicon')
  ) {
    console.log('🔄 Sirviendo icono fresco (no cachear):', request.url)
    return fetch(request) // ← Servir siempre fresco, sin cache
  }

  // ✅ IGNORAR extensiones de Chrome y otros esquemas
  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http') ||
    request.url.includes('chrome-extension') ||
    request.url.includes('localhost')
  ) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // ✅ ESTRATEGIA: Network First para todo
      return fetch(request)
        .then((networkResponse) => {
          // Cachear solo si es successful y NO es un icono
          if (networkResponse.status === 200 && !request.url.includes('portada1.png')) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return networkResponse
        })
        .catch((error) => {
          // Fallback al cache solo si no es un icono
          if (cachedResponse && !request.url.includes('portada1.png')) {
            return cachedResponse
          }
          throw error
        })
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
