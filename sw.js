var staticCacheName = 'okay-static-v1';

addEventListener('install', event =>  {
  event.waitUntil( async function (){
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
  );
  }
});

addEventListener('fetch', event =>  {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return
    }
  }

  event.respondWith( async function () {
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  )};
});

addEventListener('activate', event => {
  event.waitUntil(async function () {
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
  )};
});

addEventListener('message', event => {
  if (event.data.action == 'skipWaiting') {
    self.skipWaiting();
  }
});
