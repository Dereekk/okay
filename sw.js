'use strict';

var staticCacheName = 'okay-static-v1';

addEventListener('activate', event => {
  event.waitUntil( async function() {
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('okay-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  }());
});

addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});

addEventListener('install', event =>  {
  event.waitUntil(async function() {
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        'index.html',
        'css/style.css',
        'js/app.js',
        'js/detabinator.js',
        'js/side-Nav.js',
        'js/nasa.js',
        'manifest.json',
        'sw.js',
        'https://api.nasa.gov/planetary/apod?api_key=Ba3wAm9ImsmVvF8WxEs34fWeQkxeWAImYWFW0fWn'
      ]);
    })
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    // Else, use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;

    // Else try the network.
    return fetch(event.request);
  }());
});



addEventListener('message', event => {
  if (event.data.action == 'skipWaiting') {
    self.skipWaiting();
  }
});
