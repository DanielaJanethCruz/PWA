const CACHE_NAME = "pwa-cache-v1";
const URLS_TO_CACHE = [
    "/",
    "/index.html",
    "/page1.html",
    "/page2.html",
    "/page3.html",
    "/styles.css",
    "/app.js"
];

// Instalación
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

// Activación
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => 
            Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            )
        )
    );
});

// Interceptar solicitudes
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => 
            response || fetch(event.request)
        )
    );
});
