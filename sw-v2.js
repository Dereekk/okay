var cacheName = 'v1';

var cacheFiles = [
	'./',
	'./index.html',
	'./sw-v2.js',
	'./js/app.js',
  './js/nasa.js',
  './js/side-Nav.js',
  './js/detabinator.js',
  './css/style.css',
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic',
	'https://api.nasa.gov/planetary/apod?api_key=Ba3wAm9ImsmVvF8WxEs34fWeQkxeWAImYWFW0fWn'
]


addEventListener('install', event => {
    console.log('[ServiceWorker] Installed');

    event.waitUntil(

	    caches.open(cacheName).then(function(cache) {

			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});

addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(async () => {
		if (self.registration.navigationPreload) {
			await self.registration.navigationPreload.enable();
		}

		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				if (thisCacheName !== cacheName) {

					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	});

});
self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] Fetch', event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if ( response ) {
				console.log("[ServiceWorker] Found in Cache", event.request.url, response);
				return response;
			}
			var requestClone = event.request.clone();
			fetch(requestClone).then(function(response) {
				if ( !response ) {
					console.log("[ServiceWorker] No response from fetch ")
					return response;
				}
				var responseClone = response.clone();
				caches.open(cacheName).then(function(cache) {
					cache.put(event.request, responseClone);
					console.log('[ServiceWorker] New Data Cached', event.request.url);
					return response;
				});
			}).catch(function(err) {
				console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
				});
		})
	);
});//ssss
self.addEventListener('message', function(event) {
	if (event.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
});