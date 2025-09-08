const CACHE_NAME = 'biblioteca-cache-v2'

// Estrategia de cache dinámico
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
        ),
      ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Solo cachear GET http/https, ignorar API, POST y WebSocket/Vite HMR
  // if (
  //   request.method !== 'GET' ||
  //   request.url.includes('/api/') ||
  //   !request.url.startsWith('http') ||
  //   request.url.includes('localhost:5173') // <- ignora dev server
  // ) {
  //   return // dejamos que pase
  // }

  if (request.method !== 'GET') return

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse
      return fetch(request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, networkResponse.clone())
          return networkResponse
        })
      })
    }),
  )
})
