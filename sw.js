self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v3')
            .then(cache => cache.addAll([
            './',
            './index.html',
            './css/style.css',
            './js/app.js',
            './manifest.json'
        ]))
    );
});

self.addEventListener('activate', function(event) {
    
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    if (url.origin == location.origin && url.pathname == '/') {
        event.respondWith(caches.match('/index.html'));
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
})

self.addEventListener('activate', function (e) {
    "use strict";
    console.log("[[ServiceWorker]] Activated with registraion");
    
    e.waitUntil(
        self.registration.navigationPreload.enable()
    );
});