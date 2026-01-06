const CACHE_NAME = 'biblioteca-cache-v3' 

// Estrategia de cache dinámico
self.addEventListener('install', () => {
  console.log('🔄 Service Worker instalado - saltando espera')
  self.skipWaiting() 
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
        return self.clients.claim() 
      }),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)


  if (
    url.pathname.includes('portada1.png') ||
    url.pathname.includes('icon') ||
    url.pathname.includes('favicon')
  ) {
    console.log('🔄 Sirviendo icono fresco (no cachear):', request.url)
    return fetch(request) 
  }

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

      return fetch(request)
        .then((networkResponse) => {

          if (networkResponse.status === 200 && !request.url.includes('portada1.png')) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return networkResponse
        })
        .catch((error) => {

          if (cachedResponse && !request.url.includes('portada1.png')) {
            return cachedResponse
          }
          throw error
        })
    }),
  )
})


self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    console.log('🎯 Recibido mensaje skipWaiting')
    self.skipWaiting()
  }
})


self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  return new Promise((resolve) => {
    console.log('🔄 Sincronizando en background...')
    setTimeout(resolve, 1000)
  })
}
