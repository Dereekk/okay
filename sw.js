var staticCacheName = 'okay-static-v1';
var urlsToPrefetch = 'https://api.nasa.gov/planetary/apod?api_key=Ba3wAm9ImsmVvF8WxEs34fWeQkxeWAImYWFW0fWn'

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
    console.log(event);
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
      console.log('NavigatorPreload Registered');
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
        'sw.js'
      ]),
      cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
      })).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    })
    console.log(event);
  }());
});

addEventListener('fetch', event => {
  event.respondWith(async function(){
    caches.match(event.preloadResponse)
      .then(function(response) {

        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {

            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(staticCacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  }());
});



addEventListener('message', event => {
  if (event.data.action == 'skipWaiting') {
    self.skipWaiting();
  }
});
