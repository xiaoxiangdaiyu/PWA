const CURCACHE = 'CURCACHE_test_1'
const RUNTIME = 'runtime';
const CURCACHE_URLS = [
    './',
    '/asset/sw.jpg',
    'index.js'
]
self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CURCACHE).then(cache=>{
            cache.addAll(CURCACHE_URLS)
        }).then(
            self.skipWaiting()
        )
    )
})
self.addEventListener('activate', e => {
  e.waitUntil(
      caches.keys().then(cacheNames=>{
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CURCACHE) {
              return caches.delete(cacheName);
            }
          })
    )}).then(() => self.clients.claim())
 )
})
  
  
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response != null) {
          return response
        }
        return fetch(e.request.url)
      })
    )
  });