const CACHE_NAME = 'novaflix-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch (Browser ko lagta hai app offline bhi chal sakti hai, isliye install prompt deta hai)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
